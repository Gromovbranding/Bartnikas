<script lang="ts" setup>
import type { IndexCardFooter, PartialAdminApiDto } from '@/types/admin-api'
import { AdminTemplateForm } from '#components'

definePageMeta({
  layout: 'admin'
})

const { footerIndexCard } = useAdmin()
const { titles, formRules, navigateBack, methods } = footerIndexCard()

useHeadSafe({
  title: titles.create
})

const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null)

const form = reactive<PartialAdminApiDto<IndexCardFooter>>({
  active: false,
  text: '',
  title: '',
  button: {
    text: '',
    url: ''
  }
})

const handleResetForm = () => formRef.value?.resetForm()

const handleCreate = async () => {
  if (await formRef.value?.validate()) {
    try {
      await methods.handleCreate(toValue(form))

      await refreshNuxtData()

      await navigateTo(navigateBack.value)
    } catch (exc) {
      console.error(exc)
    }
  }
}
</script>

<template>
  <AdminTemplateCardWithForm
    :title="titles.create"
    :navigate-back="navigateBack"
  >
    <AdminTemplateForm ref="formRef" :model="form" :rules="formRules">
      <ElFormItem label="Title" prop="title">
        <ElInput v-model="form.title" />
      </ElFormItem>

      <ElFormItem label="Text" prop="text">
        <ElInput v-model="form.text" />
      </ElFormItem>

      <ElFormItem label="Is active" prop="active">
        <ElSwitch v-model="form.active" />
      </ElFormItem>

      <ElFormItem
        label="Button text"
        prop="button.text"
        :rules="{
          required: true,
          message: 'field is required',
          trigger: 'blur',
        }"
      >
        <ElInput v-model="form.button.text" />
      </ElFormItem>

      <ElFormItem
        label="Button url"
        prop="button.url"
        :rules="{
          required: true,
          message: 'field is required',
          trigger: 'blur',
        }"
      >
        <ElInput v-model="form.button.url" />
      </ElFormItem>

      <ElFormItem>
        <ElButton type="primary" @click="handleCreate">
          Create
        </ElButton>
        <ElButton @click="handleResetForm">
          Clear
        </ElButton>
      </ElFormItem>
    </AdminTemplateForm>
  </AdminTemplateCardWithForm>
</template>
