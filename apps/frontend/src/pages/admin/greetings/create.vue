<script lang="ts" setup>
import type {
  IGreetingIndex,
  IGreetingIndexTranslate,
  PartialAdminApiDto,
  PartialFileAdminApiDto
} from '@/types/admin-api'
import { AdminTemplateForm, AdminUploadFile } from '#components'

definePageMeta({
  layout: 'admin'
})

const { greetings, initTranslateLocale, currentIndexLocale } = useAdmin()
const { titles, formRules, navigateBack, methods } = greetings()

useHeadSafe({
  title: titles.create
})

const uploadRef = ref<InstanceType<typeof AdminUploadFile> | null>(null)
const uploadPosterRef = ref<InstanceType<typeof AdminUploadFile> | null>(null)
const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null)

const form = reactive<PartialAdminApiDto<IGreetingIndex>>({
  video: null,
  poster: null,
  is_active: false,
  translate: initTranslateLocale<IGreetingIndexTranslate>({
    text: ''
  })
})

const handleResetForm = () => formRef.value?.resetForm()

const handleCreate = async () => {
  if (await formRef.value?.validate()) {
    try {
      form.video = await uploadRef.value!.uploadToServer() as PartialFileAdminApiDto
      form.poster = await uploadPosterRef.value!.uploadToServer() as PartialFileAdminApiDto

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
      <ElFormItem label="Text" :prop="`translate.${currentIndexLocale}.text`">
        <AdminEditorInput v-model="form.translate[currentIndexLocale].text" />
      </ElFormItem>

      <ElFormItem label="Is active" prop="is_active">
        <ElSwitch v-model="form.is_active" />
      </ElFormItem>

      <ElFormItem required label="Poster" prop="poster">
        <AdminUploadFile
          ref="uploadPosterRef"
          v-model="form.poster"
          file-type="image"
        />
      </ElFormItem>

      <ElFormItem required label="Video" prop="video">
        <AdminUploadFile
          ref="uploadRef"
          v-model="form.video"
          file-type="video"
        />
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
