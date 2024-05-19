<script lang="ts" setup>
import type {
  IService,
  IServiceTranslate,
  PartialAdminApiDto
} from '@/types/admin-api'
import { AdminTemplateForm, AdminUploadFile } from '#components'

definePageMeta({
  layout: 'admin'
})

const { services, initTranslateLocale, currentIndexLocale } = useAdmin()
const { titles, formRules, navigateBack, methods } = services()

useHeadSafe({
  title: titles.create
})

const uploadImage = ref<InstanceType<typeof AdminUploadFile> | null>(null)
const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null)

const form = reactive<PartialAdminApiDto<IService>>({
  translate: initTranslateLocale<IServiceTranslate>({
    title: '',
    text: '',
    btn: { text: '', url: '' }
  }),
  image: null
})

const handleResetForm = () => {
  formRef.value?.resetForm()
}

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
      <ElFormItem
        :label="'Title'"
        :prop="`translate.${currentIndexLocale}.title`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].title" />
      </ElFormItem>
      <ElFormItem
        :label="'Text'"
        :prop="`translate.${currentIndexLocale}.text`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].title" />
      </ElFormItem>
      <ElFormItem
        :label="'Button text'"
        :prop="`translate.${currentIndexLocale}.btn.text`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].btn.text" />
      </ElFormItem>
      <ElFormItem
        :label="'Button url'"
        :prop="`translate.${currentIndexLocale}.btn.url`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].btn.url" />
      </ElFormItem>
      <ElFormItem required label="Image" prop="image">
        <AdminUploadFile ref="uploadImage" v-model="form.image" />
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
