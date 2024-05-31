<script lang="ts" setup>
import type { ITestimonial, ITestimonialTranslate, PartialAdminApiDto, PartialFileAdminApiDto } from '@/types/admin-api'
import { AdminTemplateForm, AdminUploadFile } from '#components'

definePageMeta({
  layout: 'admin'
})

const { testimonials, initTranslateLocale, currentIndexLocale } = useAdmin()
const { titles, formRules, navigateBack, methods } = testimonials()

useHeadSafe({
  title: titles.create
})

const uploadRef = ref<InstanceType<typeof AdminUploadFile> | null>(null)
const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null)

const form = reactive<PartialAdminApiDto<ITestimonial>>({
  translate: initTranslateLocale<ITestimonialTranslate>({
    title: '',
    additional_info: ''
  }),
  url: null,
  file: null
})

const isVideo = ref(true)

const handleResetForm = () => {
  formRef.value?.resetForm()
}

const handleCreate = async () => {
  if (await formRef.value?.validate()) {
    try {
      let url = null

      if (form.file) {
        form.file = await uploadRef.value!.uploadToServer() as PartialFileAdminApiDto
      } else {
        url = form.url
      }

      await methods.handleCreate({
        ...toValue(form),
        url
      })

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
      <ElFormItem label="Title" :prop="`translate.${currentIndexLocale}.title`">
        <ElInput v-model="form.translate[currentIndexLocale].title" />
      </ElFormItem>
      <ElFormItem label="Add Video/Image (Active = Video)">
        <ElSwitch v-model="isVideo" />
      </ElFormItem>
      <ElFormItem v-if="isVideo" label="URL Youtube" prop="url">
        <ElInput v-model="form.url" />
      </ElFormItem>
      <ElFormItem
        label="Additional Info"
        :prop="`translate.${currentIndexLocale}.additional_info`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].additional_info"
          :rows="5"
          type="textarea"
        />
      </ElFormItem>
      <ElFormItem v-if="isVideo" label="Testimonial video" prop="file">
        <AdminUploadFile
          ref="uploadRef"
          v-model="form.file"
          file-type="video"
        />
      </ElFormItem>
      <ElFormItem v-else label="Testimonial video" prop="file">
        <AdminUploadFile
          ref="uploadRef"
          v-model="form.file"
          file-type="image"
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
