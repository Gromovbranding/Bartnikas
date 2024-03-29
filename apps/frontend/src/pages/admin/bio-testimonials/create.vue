<script lang="ts" setup>
import type {
  IBioTestimonials,
  IBioTestimonialsTranslate,
  PartialAdminApiDto,
  PartialFileAdminApiDto
} from '@/types/admin-api'
import { AdminTemplateForm, AdminUploadFile } from '#components'

definePageMeta({
  layout: 'admin'
})

const { bioTestimonials, initTranslateLocale, currentIndexLocale } = useAdmin()
const { titles, formRules, navigateBack, methods } = bioTestimonials()

const uploadRef = ref<InstanceType<typeof AdminUploadFile> | null>(null)
const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null)

useHeadSafe({
  title: titles.create
})

const form = reactive<PartialAdminApiDto<IBioTestimonials>>({
  translate: initTranslateLocale<IBioTestimonialsTranslate>({
    name: '',
    job: '',
    testimonial: ''
  }),
  photo: null
})

const handleResetForm = () => {
  formRef.value?.resetForm()
}

const handleCreate = async () => {
  if (await formRef.value?.validate()) {
    try {
      form.photo = await uploadRef.value!.uploadToServer()as PartialFileAdminApiDto

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
      <ElFormItem label="Name" :prop="`translate.${currentIndexLocale}.name`">
        <ElInput v-model="form.translate[currentIndexLocale].name" />
      </ElFormItem>
      <ElFormItem label="Job" :prop="`translate.${currentIndexLocale}.job`">
        <ElInput v-model="form.translate[currentIndexLocale].job" />
      </ElFormItem>
      <ElFormItem
        label="Testimonial"
        :prop="`translate.${currentIndexLocale}.testimonial`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].testimonial"
          :rows="5"
          type="textarea"
        />
      </ElFormItem>
      <ElFormItem required label="Photo" prop="photo">
        <AdminUploadFile ref="uploadRef" v-model="form.photo" />
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
