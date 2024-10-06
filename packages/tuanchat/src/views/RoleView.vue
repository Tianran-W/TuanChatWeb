<script setup lang="ts">
import axios from 'axios'
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRoleStore } from '@/stores'
import { tuanApis } from '@/services'
import { Plus } from '@element-plus/icons-vue'
import { ElButton, ElDialog, ElIcon, ElInput, ElScrollbar, ElUpload } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
import RoleInfoForm from '@/components/RoleCard/RoleInfoForm.vue'

const route = useRoute()
const roleStore = useRoleStore()

let role = roleStore.userRoleList.get(Number(route.params.id))

const fileList = ref<UploadUserFile[]>([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const cropperRef = ref<VueCropper>()
const uploadRef = ref<typeof ElUpload>()
const spriteName = ref('')

const imgBlob = ref<Blob>()

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  tuanApis.deleteRoleAvatar({
    avatarId: Number(uploadFile.name.split('_')[2].split('.')[0])
  })
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  imgBlob.value = uploadFile.raw!
  dialogVisible.value = true
}

const handleUploadImg = async () => {
  let avatarId = (
    await tuanApis.setRoleAvatar({
      roleId: role?.roleId
    })
  ).data.data
  if (avatarId === undefined) {
    throw new Error('Set role avatar failed')
  }

  //先上传头像
  const avatar_data = (
    await tuanApis.getUploadUrl({
      fileName: `avatar_${role?.roleId}_${avatarId}.png`,
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
      fileName: `sprites_${role?.roleId}_${avatarId}.png`,
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
  tuanApis.updateRoleAvatar({
    roleId: role?.roleId,
    avatarId: avatarId,
    avatarTitle: spriteName.value,
    avatarUrl: avatar_data.downloadUrl,
    spriteUrl: sprites_data.downloadUrl
  })

  dialogVisible.value = false
}

watch(
  () => route.params.id,
  (newId) => {
    role = roleStore.userRoleList.get(Number(newId))

    fileList.value = []
    roleStore.roleToImages.get(role?.roleId!)?.forEach((avatarId: number) => {
      fileList.value.push({
        name: `sprites_${role?.roleId}_${avatarId}.png`,
        url: roleStore.imageUrls.get(avatarId)?.spriteUrl,
        status: 'ready'
      })
    })
  }
)

onMounted(() => {
  roleStore.fetchRoleAvatars(role?.roleId!).then(() => {
    roleStore.roleToImages.get(role?.roleId!)?.forEach((avatarId: number) => {
      fileList.value.push({
        name: `sprites_${role?.roleId}_${avatarId}.png`,
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

    <RoleInfoForm :roleId="Number(route.params.id)" />
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
</style>
