<script setup lang="ts">
//TODO:重构这部分，赶进度写了依托
import { useRoute } from 'vue-router'
import { useRoleStore } from '@/stores'
import { tuanApis } from '@/services'
import { onMounted, ref } from 'vue'
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
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'
import axios from 'axios'

const propertyToChineseMap = new Map()
propertyToChineseMap.set('roleId', '角色ID')
propertyToChineseMap.set('strength', '力量')
propertyToChineseMap.set('dexterity', '敏捷')
propertyToChineseMap.set('willpower', '意志力')
propertyToChineseMap.set('constitution', '体质')
propertyToChineseMap.set('appearance', '外貌')
propertyToChineseMap.set('education', '教育程度')
propertyToChineseMap.set('size', '体型')
propertyToChineseMap.set('intelligence', '智力')
propertyToChineseMap.set('sanity', '理智')
propertyToChineseMap.set('luck', '运气')
propertyToChineseMap.set('magicPoints', '魔法点数')
propertyToChineseMap.set('healthPoints', '生命值')
propertyToChineseMap.set('accounting', '会计学')
propertyToChineseMap.set('anthropology', '人类学')
propertyToChineseMap.set('appraisal', '鉴定')
propertyToChineseMap.set('archaeology', '考古学')
propertyToChineseMap.set('acting', '表演')
propertyToChineseMap.set('charm', '魅力')
propertyToChineseMap.set('climb', '攀爬')
propertyToChineseMap.set('computerUse', '计算机使用')
propertyToChineseMap.set('creditRating', '信用评级')
propertyToChineseMap.set('cthulhuMythos', '克苏鲁神话')
propertyToChineseMap.set('disguise', '伪装')
propertyToChineseMap.set('dodge', '闪避')
propertyToChineseMap.set('drive', '驾驶')
propertyToChineseMap.set('electricRepair', '电器维修')
propertyToChineseMap.set('electronics', '电子学')
propertyToChineseMap.set('fastTalk', '花言巧语')
propertyToChineseMap.set('fistfight', '拳击')
propertyToChineseMap.set('firearms', '火器使用')
propertyToChineseMap.set('firstAid', '急救')
propertyToChineseMap.set('history', '历史')
propertyToChineseMap.set('intimidate', '恐吓')
propertyToChineseMap.set('jump', '跳跃')
propertyToChineseMap.set('english', '英语')
propertyToChineseMap.set('russian', '俄语')
propertyToChineseMap.set('law', '法律')
propertyToChineseMap.set('libraryUse', '图书馆使用')
propertyToChineseMap.set('listen', '聆听')
propertyToChineseMap.set('locksmith', '开锁')
propertyToChineseMap.set('machineRepair', '机械维修')
propertyToChineseMap.set('medicine', '医学')
propertyToChineseMap.set('naturalWorld', '自然界知识')
propertyToChineseMap.set('navigation', '导航')
propertyToChineseMap.set('occult', '神秘学')
propertyToChineseMap.set('persuade', '说服')
propertyToChineseMap.set('psychology', '心理学')
propertyToChineseMap.set('ride', '骑乘')
propertyToChineseMap.set('pharmacy', '药学')
propertyToChineseMap.set('sleightOfHand', '巧手')
propertyToChineseMap.set('investigation', '调查')
propertyToChineseMap.set('stealth', '潜行')
propertyToChineseMap.set('survival', '生存')
propertyToChineseMap.set('swim', '游泳')
propertyToChineseMap.set('throwAbility', '投掷能力')
propertyToChineseMap.set('track', '追踪')
propertyToChineseMap.set('animalTraining', '动物训练')
propertyToChineseMap.set('demolition', '爆破')
propertyToChineseMap.set('lipReading', '唇语解读')
propertyToChineseMap.set('hypnosis', '催眠')
propertyToChineseMap.set('artillery', '火炮使用')

const route = useRoute()

const isEditing = ref(false)
const roleStore = useRoleStore()
const role = roleStore.userRoleList.get(Number(route.params.id))
const roleAbility = roleStore.roleAbility.get(Number(route.params.id))
const roleAbilityAsRecord = roleAbility as Record<string, number>
const abilityDict = Object.entries(roleAbilityAsRecord).filter(([key]) => key !== 'roleId')

const fileList = ref<UploadUserFile[]>([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const cropperRef = ref<VueCropper>()
const uploadRef = ref<typeof ElUpload>()
const uploadUrl = ref('')
const downloadUrl = ref('')
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
  //TODO: Update role info
  tuanApis.setRoleAbility(roleInfo.roleAbility!).then((res) => {
    roleStore.roleAbility.set(Number(route.params.id), res.data.data!)
    isEditing.value = false
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
  await axios(uploadUrl.value!, {
    method: 'PUT',
    data: imgBlob.value
  })
  const sprites_data = (
    await tuanApis.getUploadUrl({
      fileName: `sprites_${role?.roleId}_${fileList.value.length}.png`,
      scene: 1
    })
  ).data.data
  if (sprites_data === undefined) {
    throw new Error('Get upload url failed')
  }
  // 更新数据库立绘和头像
  tuanApis.setRoleAvatar({
    roleId: role?.roleId,
    avatarTitle: 'avatar',
    avatarUrl: avatar_data.downloadUrl,
    spriteUrl: downloadUrl.value
  })

  uploadUrl.value = sprites_data.uploadUrl!
  downloadUrl.value = sprites_data.downloadUrl!
  dialogVisible.value = false
}

onMounted(() => {
  roleStore.fetchRoleAvatars(role?.roleId!).then(() => {
    roleStore.roleToImages.get(role?.roleId!)?.forEach((avatarId: number) => {
      fileList.value.push({
        name: `sprites_${role?.roleId}_${fileList.value.length}.png`,
        url: roleStore.imageUrls.get(avatarId)?.spriteUrl
      })
    })
    // 获取第一个立绘上传地址
    tuanApis
      .getUploadUrl({ fileName: `sprites_${role?.roleId}_${fileList.value.length}.png`, scene: 1 })
      .then((res) => {
        uploadUrl.value = res.data.data?.uploadUrl!
        downloadUrl.value = res.data.data?.downloadUrl!
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
        :action="uploadUrl"
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
        <ElInput v-model="roleInfo.userRole.roleName" />
      </ElFormItem>
      <ElFormItem label="Description">
        <ElInput v-model="roleInfo.userRole.description" type="textarea" />
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
  height: 400px;
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
