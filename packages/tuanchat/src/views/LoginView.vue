<script setup lang="ts">
import router from '../router'

import { reactive, ref } from 'vue'
import { useUserStore } from '../stores/user'
import { ElButton, ElForm, ElFormItem, ElInput } from 'element-plus'

import type { FormInstance } from 'element-plus'

const userStore = useUserStore()
const formRef = ref<FormInstance>()
const isLoading = ref<boolean>(false)

const formMember = reactive({
  uid: ''
})

const submitForm = () => {
  if (!formRef.value) return
  formRef.value.validate(async (valid) => {
    if (valid) {
      isLoading.value = true
      await userStore
        .login(formMember.uid)
        .then(() => {
          isLoading.value = false
        })
        .catch((err) => {
          console.error(err)
        })
      router.push('/')
    }
  })
}
</script>

<template>
  <div class="login-page">
    <ElForm
      ref="formRef"
      :model="formMember"
      label-width="auto"
      :disabled="isLoading"
      @keyup.enter="submitForm()"
      @submit.prevent
    >
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
        <ElButton type="primary" @click="submitForm()"> Login </ElButton>
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
