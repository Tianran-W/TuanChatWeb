<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useRoleStore } from '@/stores'
import { tuanApis } from '@/services'
import { onMounted, ref } from 'vue'
import { ElButton, ElForm, ElFormItem, ElInput } from 'element-plus'
import type { RoleInfoType } from '@/stores/types'

const route = useRoute()
const roleStore = useRoleStore()

const importModel = ref({
  importMsg: ''
})
const role = roleStore.roleList.get(Number(route.params.id))
const roleInfo = ref<RoleInfoType>({
  userId: 0,
  roleId: 0,
  roleAvatar: '',
  roleName: '',
  roleDescription: '',
  roleAbility: {}
})

const onSubmit = () => {
  tuanApis.setRoleAbility(roleInfo.value.roleAbility)
}

const importAttrs = () => {
  tuanApis
    .parseExcel({ roleId: roleInfo.value.roleId, excelCode: importModel.value.importMsg })
    .then((res) => {
      roleInfo.value.roleAbility = res.data.data!
    })
}

onMounted(() => {
  tuanApis.getRoleAbility({ roleId: role?.roleId! }).then((res) => {
    roleInfo.value = {
      userId: role?.userId!,
      roleId: role?.roleId!,
      roleAvatar: role?.avatar!,
      roleName: role?.roleName!,
      roleDescription: '',
      roleAbility: res.data.data!
    }
  })
})
</script>

<template>
  <div class="role-info">
    <ElForm :model="roleInfo" label-width="10%">
      <ElFormItem label="Role name">
        <ElInput v-model="roleInfo!.roleName" />
      </ElFormItem>
      <ElFormItem label="Description">
        <ElInput v-model="roleInfo.roleDescription" type="textarea" />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="onSubmit">Submit</ElButton>
        <ElButton>Cancel</ElButton>
      </ElFormItem>
    </ElForm>

    <ElForm :model="importModel" label-width="10%">
      <ElFormItem label="Import">
        <ElInput v-model="importModel.importMsg" type="textarea" />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="importAttrs">Submit</ElButton>
        <ElButton>Cancel</ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style scoped>
.role-info {
  padding: 20px;
}
</style>
