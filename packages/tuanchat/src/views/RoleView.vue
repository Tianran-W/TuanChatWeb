<script setup lang="ts">
import axios from 'axios'
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { propertyToChineseMap } from '@/enums'
import { useRoleStore } from '@/stores'
import { tuanApis } from '@/services'
import { Plus } from '@element-plus/icons-vue'
import {
  ElButton,
  ElDialog,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElInputNumber,
  ElScrollbar,
  ElTag,
  ElText,
  ElUpload
} from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'

const route = useRoute()
const roleStore = useRoleStore()

let role = roleStore.userRoleList.get(Number(route.params.id))
let roleAbility = roleStore.roleAbility.get(Number(route.params.id))
let abilityDict = Object.entries(roleAbility as Record<string, number>).filter(
  ([key]) => key !== 'roleId'
)

const isEditing = ref(false)
const fileList = ref<UploadUserFile[]>([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const cropperRef = ref<VueCropper>()
const uploadRef = ref<typeof ElUpload>()
const spriteName = ref('')

const imgBlob = ref<Blob>()

const importModel = ref({
  importMsg: ''
})

const roleInfo = {
  userRole: role!,
  roleAbility: roleAbility!
}

const onSubmit = () => {
  tuanApis
    .saveRole(roleInfo.userRole)
    .then((res) => {
      roleStore.userRoleList.set(Number(route.params.id), res.data.data!)
      isEditing.value = false
    })
    .catch((err) => {
      console.error(err)
    })

  tuanApis
    .setRoleAbility(roleInfo.roleAbility!)
    .then((res) => {
      roleStore.roleAbility.set(Number(route.params.id), res.data.data!)
      isEditing.value = false
    })
    .catch((err) => {
      console.error(err)
    })
}

const importAttrs = () => {
  tuanApis
    .parseExcel({ roleId: role?.roleId, excelCode: importModel.value.importMsg })
    .then((res) => {
      roleStore.roleAbility.set(Number(route.params.id), res.data.data!)
    })
}

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  imgBlob.value = uploadFile.raw!
  dialogVisible.value = true
}

const handleUploadImg = async () => {
  //先上传头像
  const avatar_data = (
    await tuanApis.getUploadUrl({
      fileName: `avatar_${role?.roleId}_${fileList.value.length}.png`,
      scene: 1
    })
  ).data.data
  if (avatar_data === undefined) {
    throw new Error('Get upload url failed')
  }
  await cropperRef.value.getCropBlob(async (img: Blob) => {
    await axios(avatar_data.uploadUrl!, {
      method: 'PUT',
      data: img
    })
  })

  //再上传立绘
  const sprites_data = (
    await tuanApis.getUploadUrl({
      fileName: `sprites_${role?.roleId}_${fileList.value.length}.png`,
      scene: 1
    })
  ).data.data
  if (sprites_data === undefined) {
    throw new Error('Get upload url failed')
  }
  await axios(sprites_data.uploadUrl!, {
    method: 'PUT',
    data: imgBlob.value
  })
  // 更新数据库立绘和头像
  tuanApis.setRoleAvatar({
    roleId: role?.roleId,
    avatarTitle: spriteName.value,
    avatarUrl: avatar_data.downloadUrl,
    spriteUrl: sprites_data.downloadUrl
  })

  dialogVisible.value = false
}

watch(
  () => route.params.id,
  (newId) => {
    isEditing.value = false
    role = roleStore.userRoleList.get(Number(newId))
    roleAbility = roleStore.roleAbility.get(Number(newId))
    abilityDict = Object.entries(roleAbility as Record<string, number>).filter(
      ([key]) => key !== 'roleId'
    )

    fileList.value = []
    roleStore.roleToImages.get(role?.roleId!)?.forEach((avatarId: number) => {
      fileList.value.push({
        name: `sprites_${role?.roleId}_${fileList.value.length}.png`,
        url: roleStore.imageUrls.get(avatarId)?.spriteUrl
      })
    })
  }
)

onMounted(() => {
  roleStore.fetchRoleAvatars(role?.roleId!).then(() => {
    roleStore.roleToImages.get(role?.roleId!)?.forEach((avatarId: number) => {
      fileList.value.push({
        name: `sprites_${role?.roleId}_${fileList.value.length}.png`,
        url: roleStore.imageUrls.get(avatarId)?.spriteUrl
      })
    })
  })
})
</script>

<template>
  <div class="role-info">
    <ElScrollbar>
      <ElUpload
        v-model:file-list="fileList"
        list-type="picture-card"
        ref="uploadRef"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :auto-upload="false"
      >
        <ElIcon><Plus /></ElIcon>
      </ElUpload>
    </ElScrollbar>

    <ElDialog v-model="dialogVisible">
      <VueCropper
        autoCrop
        :img="dialogImageUrl"
        ref="cropperRef"
        :fixed="true"
        :fixedNumber="[1, 1]"
        centerBox
        class="pic-cut"
      />
      <ElInput v-model:model-value="spriteName" placeholder="立绘名称"></ElInput>
      <ElButton type="primary" @click="handleUploadImg">Submit</ElButton>
    </ElDialog>

    <ElForm :model="roleInfo" label-width="10%">
      <ElFormItem label="Role name">
        <ElInput v-model="roleInfo.userRole.roleName" :disabled="!isEditing" />
      </ElFormItem>
      <ElFormItem label="Description">
        <ElInput v-model="roleInfo.userRole.description" type="textarea" :disabled="!isEditing" />
      </ElFormItem>
      <ElFormItem label="Role ability">
        <div class="role-ability">
          <div class="slider-block" v-if="isEditing">
            <div class="slider-item" v-for="[attr, value] in abilityDict" :key="attr">
              <ElText>{{ propertyToChineseMap.get(attr) }}</ElText>
              <ElInputNumber :model-value="value" />
            </div>
          </div>
          <ElTag v-else type="info" v-for="[attr, value] in abilityDict" :key="attr">{{
            `${propertyToChineseMap.get(attr)}: ${value}`
          }}</ElTag>
        </div>
      </ElFormItem>
      <ElFormItem v-if="isEditing">
        <ElButton type="primary" @click="onSubmit">Submit</ElButton>
        <ElButton @click="isEditing = false">Cancel</ElButton>
      </ElFormItem>
      <ElFormItem v-else>
        <ElButton type="primary" @click="isEditing = true">Edit</ElButton>
      </ElFormItem>
    </ElForm>

    <ElForm :model="importModel" label-width="10%">
      <ElFormItem label="Import">
        <ElInput v-model="importModel.importMsg" type="textarea" />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="importAttrs">Import</ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style scoped>
.role-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.pic-cut {
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  height: 50vh;
}

.slider-block {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
}

.slider-item .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>
