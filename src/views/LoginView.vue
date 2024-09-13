<script setup lang="ts">
import router from '../router'

import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '../stores/user'
import { ElButton, ElForm, ElFormItem, ElInput } from 'element-plus'

import type { FormInstance } from 'element-plus'

const userStore = useUserStore()
const formRef = ref<FormInstance>()
const route = useRoute()

const formMember = reactive({
  uid: ''
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      userStore.login(Number(formMember.uid)).then(
        () => {
          if (route.query.redirect) {
            router.push(route.query.redirect as string)
          } else {
            router.push('/')
          }
        },
        (failedMsg) => {
          console.log(failedMsg)
        }
      )
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
