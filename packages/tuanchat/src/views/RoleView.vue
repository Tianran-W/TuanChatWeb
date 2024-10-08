<script setup lang="ts">
import axios from 'axios'
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRoleStore } from '@/stores'
import { tuanApis } from '@/services'
import { Plus, ZoomIn, Delete, Crop } from '@element-plus/icons-vue'
import { ElButton, ElDialog, ElIcon, ElInput, ElScrollbar, ElUpload } from 'element-plus'
import type { UploadFile, UploadUserFile, UploadRawFile } from 'element-plus'
import { RoleInfoForm, MessageItem } from '@/components'
import type { Message } from '@/services'

const route = useRoute()
const roleStore = useRoleStore()
const roleId = ref(Number(route.params.id))

let role = roleStore.userRoleList.get(roleId.value)

const fileList = ref<UploadUserFile[]>([])
const cropUrl = ref('')
const isCutting = ref(false)
const isPreview = ref(false)
const cropperRef = ref<VueCropper>()

const spriteName = ref('')
const uploadUrl = ref('') // 立绘上传url
const downloadUrl = ref('') // 立绘下载url
const uploadAvatarId = ref(0)

const prevMsg = ref<Message>({
  roleId: 0,
  avatarId: 0,
  messageType: 0
})

const handleRemove = (uploadFile: UploadFile) => {
  if (uploadFile.status === 'uploading') {
    return
  } else if (uploadFile.status === 'fail' || uploadFile.status === 'ready') {
    fileList.value = fileList.value.filter((file) => file.name !== uploadFile.name)
  } else {
    tuanApis.deleteRoleAvatar({
      avatarId: Number(uploadFile.name.split('_')[2].split('.')[0])
    })
  }
}

const handlePictureCardPreview = (uploadFile: UploadFile) => {
  prevMsg.value = {
    roleId: roleId.value,
    avatarId: Number(uploadFile.name.split('_')[2].split('.')[0]),
    messageType: 1,
    body: {
      content: '这是你聊天的效果'
    }
  } as Message
  console.log(prevMsg.value)
  isPreview.value = true
}

const onBeforeUpload = async (rawFile: UploadRawFile) => {
  const resId = (
    await tuanApis.setRoleAvatar({
      roleId: role?.roleId
    })
  ).data.data
  if (resId === undefined) {
    throw new Error('Set role avatar failed')
  }
  uploadAvatarId.value = resId

  const data = (
    await tuanApis.getUploadUrl({
      fileName: `sprites_${role?.roleId}_${uploadAvatarId.value}.png`,
      scene: 1
    })
  ).data.data
  if (data === undefined) {
    throw new Error('Get upload url failed')
  }
  uploadUrl.value = data.uploadUrl!
  downloadUrl.value = data.downloadUrl!

  await axios(uploadUrl.value, {
    method: 'PUT',
    data: rawFile
  })

  // 更新数据库立绘
  await tuanApis.updateRoleAvatar({
    roleId: role?.roleId,
    avatarId: uploadAvatarId.value,
    spriteUrl: downloadUrl.value
  })

  await roleStore.fetchRoleAvatars(role?.roleId!).then(() => {
    fileList.value = []
    roleStore.roleToImages.get(role?.roleId!)?.forEach((avatarId: number) => {
      fileList.value.push({
        name: `sprites_${role?.roleId}_${avatarId}.png`,
        url: roleStore.imageUrls.get(avatarId)?.avatarUrl,
        status: 'success'
      })
    })
  })
}

const handleCrop = (uploadFile: UploadFile) => {
  cropUrl.value = uploadFile.url!
  isCutting.value = true
}

const handleCropAvatar = async () => {
  const avatar_data = (
    await tuanApis.getUploadUrl({
      fileName: `avatar_${role?.roleId}_${uploadAvatarId.value}.png`,
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

  // 更新数据库头像
  tuanApis.updateRoleAvatar({
    avatarId: uploadAvatarId.value,
    avatarTitle: spriteName.value,
    avatarUrl: avatar_data.downloadUrl
  })

  isCutting.value = false
}

watch(
  () => route.params.id,
  (newId) => {
    roleId.value = Number(newId)
    role = roleStore.userRoleList.get(roleId.value)

    fileList.value = []
    //TODO: 这里应该做一个缓存
    roleStore.fetchRoleAvatars(role?.roleId!).then(() => {
      roleStore.roleToImages.get(role?.roleId!)?.forEach((avatarId: number) => {
        fileList.value.push({
          name: `sprites_${role?.roleId}_${avatarId}.png`,
          url: roleStore.imageUrls.get(avatarId)?.avatarUrl
        })
      })
    })
  }
)

onMounted(() => {
  roleStore.fetchRoleAvatars(role?.roleId!).then(() => {
    roleStore.roleToImages.get(role?.roleId!)?.forEach((avatarId: number) => {
      fileList.value.push({
        name: `sprites_${role?.roleId}_${avatarId}.png`,
        url: roleStore.imageUrls.get(avatarId)?.avatarUrl
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
        :before-upload="onBeforeUpload"
        :action="''"
        :method="'PUT'"
        :auto-upload="true"
      >
        <ElIcon><Plus /></ElIcon>
        <template #file="{ file }">
          <div>
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <ElIcon><ZoomIn /></ElIcon>
              </span>
              <span class="el-upload-list__item-crop" @click="handleCrop(file)">
                <ElIcon><Crop /></ElIcon>
              </span>
              <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                <ElIcon><Delete /></ElIcon>
              </span>
            </span>
          </div>
        </template>
      </ElUpload>
    </ElScrollbar>

    <ElDialog v-model="isCutting">
      <VueCropper
        autoCrop
        :img="cropUrl"
        ref="cropperRef"
        :fixed="true"
        :fixedNumber="[1, 1]"
        centerBox
        class="pic-cut"
      />
      <ElInput v-model:model-value="spriteName" placeholder="立绘名称"></ElInput>
      <ElButton type="primary" @click="handleCropAvatar">Submit</ElButton>
    </ElDialog>

    <ElDialog v-model="isPreview">
      <MessageItem :msg="prevMsg" :readOnly="true" />
    </ElDialog>

    <RoleInfoForm :roleId="roleId" />
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
