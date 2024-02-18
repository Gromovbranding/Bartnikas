<script lang="ts" setup>
import type {
  IMediaExhibition,
  IMediaExhibitionTranslate,
  PartialAdminApiDto,
  PartialFileAdminApiDto
} from '@/types/admin-api'
import { AdminTemplateForm, AdminUploadFile } from '#components'

definePageMeta({
  layout: 'admin'
})

const { media, initTranslateLocale, currentIndexLocale } = useAdmin()
const { titles, formRules, navigateBack, methods } = media().exhibition()

const uploadImageRef = ref<InstanceType<typeof AdminUploadFile> | null>(null)
const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null)

useHeadSafe({
  title: titles.create
})

const form = reactive<PartialAdminApiDto<IMediaExhibition>>({
  image: null,
  translate: initTranslateLocale<IMediaExhibitionTranslate>({
    title: '',
    awards: ''
  })
})

const handleResetForm = () => {
  formRef.value?.resetForm()
}

const handleCreate = async () => {
  if (await formRef.value?.validate()) {
    try {
      const fileImage = await uploadImageRef.value!.uploadToServer()

      await methods.handleCreate({
        ...toValue(form),
        image: fileImage as PartialFileAdminApiDto
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

      <ElFormItem
        label="Awards"
        :prop="`translate.${currentIndexLocale}.awards`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].awards" />
      </ElFormItem>

      <ElFormItem required label="Image" prop="image">
        <AdminUploadFile ref="uploadImageRef" v-model="form.image" />
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
