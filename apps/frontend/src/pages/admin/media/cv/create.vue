<script lang="ts" setup>
import type {
  IMediaCV,
  PartialAdminApiDto,
  PartialFileAdminApiDto
} from '@/types/admin-api'
import { AdminTemplateForm, AdminUploadFile } from '#components'

definePageMeta({
  layout: 'admin'
})

const { media } = useAdmin()
const { titles, formRules, navigateBack, methods } = media().cv()

const uploadImageRef = ref<InstanceType<typeof AdminUploadFile> | null>(null)
const uploadPdfRef = ref<InstanceType<typeof AdminUploadFile> | null>(null)
const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null)

useHeadSafe({
  title: titles.create
})

const form = reactive<PartialAdminApiDto<IMediaCV>>({
  image: null,
  pdf: null
})

const handleResetForm = () => {
  formRef.value?.resetForm()
}

const handleCreate = async () => {
  if (await formRef.value?.validate()) {
    try {
      form.image = await uploadImageRef.value!.uploadToServer() as PartialFileAdminApiDto
      form.pdf = await uploadPdfRef.value!.uploadToServer() as PartialFileAdminApiDto

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
      <ElFormItem required label="Image" prop="image">
        <AdminUploadFile ref="uploadImageRef" v-model="form.image" />
      </ElFormItem>

      <ElFormItem required label="PDF" prop="pdf">
        <AdminUploadFile
          ref="uploadPdfRef"
          v-model="form.pdf"
          file-type="files"
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
