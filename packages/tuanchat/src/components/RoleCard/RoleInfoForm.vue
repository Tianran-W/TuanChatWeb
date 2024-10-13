<script setup lang="ts">
import { propertyToChineseMap } from '@/enums'
import { tuanApis } from '@/services'
import { useRoleStore } from '@/stores'
import { computed, ref, watch } from 'vue'
import { ElButton, ElForm, ElFormItem, ElInput, ElInputNumber, ElTag, ElText } from 'element-plus'
import type { RoleAbilityTable } from '@/services'

const props = defineProps<{
  roleId: number
  defaultAvatar: string | undefined
}>()

watch(
  () => props.defaultAvatar,
  () => {
    isEditing.value = true
  }
)

const roleStore = useRoleStore()
const isEditing = ref(false)

const roleInfo = computed(() => ({
  userRole: roleStore.userRoleList.get(props.roleId)!,
  roleAbility: roleStore.roleAbility.get(props.roleId)!
}))

const abilityDict = computed(() =>
  Object.entries(roleInfo.value.roleAbility as Record<string, number>).filter(
    ([key]) => key !== 'roleId'
  )
)

const onSubmit = () => {
  roleInfo.value.userRole.avatar = props.defaultAvatar
  tuanApis
    .updateRole(roleInfo.value.userRole)
    .then(() => {
      roleStore.userRoleList.set(props.roleId, roleInfo.value.userRole)
      isEditing.value = false
    })
    .catch((err) => {
      console.error(err)
    })

  tuanApis
    .setRoleAbility(roleInfo.value.roleAbility!)
    .then(() => {
      roleStore.roleAbility.set(props.roleId, roleInfo.value.roleAbility)
      isEditing.value = false
    })
    .catch((err) => {
      console.error(err)
    })
}

const importModel = ref({
  importMsg: ''
})

const importAttrs = () => {
  tuanApis
    .parseExcel({ roleId: props.roleId, excelCode: importModel.value.importMsg })
    .then((res) => {
      roleStore.roleAbility.set(props.roleId, res.data.data!)
    })
}
</script>

<template>
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
          <div class="slider-item" v-for="[attr] in abilityDict" :key="attr">
            <ElText>{{ propertyToChineseMap.get(attr) }}</ElText>
            <ElInputNumber
              v-model:model-value="roleInfo.roleAbility[attr as keyof RoleAbilityTable]"
            />
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
</template>

<style scoped>
.slider-block {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.slider-item .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>
