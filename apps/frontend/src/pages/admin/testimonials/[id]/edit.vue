<script lang="ts" setup>
import type { ITestimonial, ITestimonialTranslate, PartialFileAdminApiDto } from '@/types/admin-api'
import { AdminTemplateForm, AdminUploadFile } from '#components'

definePageMeta({
  layout: 'admin',
  validate (route) {
    return /^\d+$/.test(route.params.id as string)
  }
})

const uploadRef = ref<InstanceType<typeof AdminUploadFile> | null>(null)
const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null)
const route = useRoute()
const id = Number(route.params.id)

const { testimonials, initTranslateLocale, currentIndexLocale } = useAdmin()
const { formRules, navigateBack, titles, methods } = testimonials()

const model = await methods.handleGetModel(id)
const isVideo = ref(true)

useHeadSafe({
  title: titles.edit
})

const form = reactive<ITestimonial>({
  ...model,
  translate: initTranslateLocale<ITestimonialTranslate>(model.translate)
})

const handleDelete = async () => {
  await methods.handleDelete(id)
  await navigateTo(navigateBack.value)
}

const handleUpdate = async () => {
  if (await formRef.value?.validate()) {
    try {
      form.file = await uploadRef.value!.uploadToServer() as PartialFileAdminApiDto

      await methods.handlePatch(id, toValue(form))

      await refreshNuxtData()

      await navigateTo(navigateBack.value)
    } catch (exc) {
      console.error(exc)
    }
  }
}
</script>

<template>
  <AdminTemplateCardWithForm :title="titles.edit" :navigate-back="navigateBack">
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
        <ElButton type="primary" @click="handleUpdate">
          Update
        </ElButton>
        <ElButton type="danger" @click="handleDelete">
          Delete
        </ElButton>
      </ElFormItem>
    </AdminTemplateForm>
  </AdminTemplateCardWithForm>
</template>
