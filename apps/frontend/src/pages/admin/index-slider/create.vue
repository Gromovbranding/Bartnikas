<script lang="ts" setup>
import type {
  IIndexSlider,
  PartialAdminApiDto,
  PartialFileAdminApiDto
} from '@/types/admin-api'
import { AdminTemplateForm, AdminUploadFile } from '#components'

definePageMeta({
  layout: 'admin'
})

const { indexSlider } = useAdmin()
const { titles, formRules, navigateBack, methods } = indexSlider()

useHeadSafe({
  title: titles.create
})

const uploadRef = ref<InstanceType<typeof AdminUploadFile> | null>(null)
const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null)

const form = reactive<PartialAdminApiDto<IIndexSlider>>({
  image: null,
  active: true,
  name: ''
})

const handleResetForm = () => {
  formRef.value?.resetForm()
}

const handleCreate = async () => {
  if (await formRef.value?.validate()) {
    try {
      const file = await uploadRef.value!.uploadToServer()

      await methods.handleCreate({
        ...toValue(form),
        image: file as PartialFileAdminApiDto
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
      <ElFormItem label="Name" prop="name">
        <ElInput v-model="form.name" />
      </ElFormItem>
      <ElFormItem label="Is active" prop="active">
        <ElSwitch v-model="form.active" />
      </ElFormItem>
      <ElFormItem required label="Slider Image" prop="image">
        <AdminUploadFile ref="uploadRef" v-model="form.image" />
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
