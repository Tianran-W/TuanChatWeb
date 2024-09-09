<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElButton, ElForm, ElFormItem, ElInput } from 'element-plus'
import { useUserStore } from '../stores/user'
import type { FormInstance } from 'element-plus'

import router from '../router'
import apis from '@/services/apis'

const userStore = useUserStore()
const formRef = ref<FormInstance>()

const formMember = reactive({
  uid: ''
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      apis.login({ userId: Number(formMember.uid), password: '123456' }).then((res) => {
        if (res !== undefined) {
          userStore.login(Number(formMember.uid), res)
          router.push('/')
        }
      })
    }
  })
}
</script>

<template>
  <div class="login-page">
    <ElForm ref="formRef" :model="formMember" label-width="auto">
      <ElFormItem
        label="UID"
        prop="uid"
        :rules="[
          { required: true, message: 'uid is required' },
          { type: 'number', message: 'uid must be a number' }
        ]"
      >
        <ElInput v-model.number="formMember.uid" type="text" autocomplete="off" />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="submitForm(formRef)"> Login </ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
