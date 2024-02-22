<script lang="ts" setup>
import type {
  IBio,
  IBioTranslate,
  PartialAdminApiDto,
  PartialFileAdminApiDto
} from '@/types/admin-api'
import { AdminTemplateForm, AdminUploadFile } from '#components'

definePageMeta({
  layout: 'admin'
})

const { bio, currentIndexLocale, initTranslateLocale } = useAdmin()
const { titles, formRules, navigateBack, methods } = bio()

const uploadRef = ref<InstanceType<typeof AdminUploadFile> | null>(null)
const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null)

useHeadSafe({
  title: titles.create
})

const form = reactive<PartialAdminApiDto<IBio>>({
  translate: initTranslateLocale<IBioTranslate>({
    description: '',
    sub_description: ''
  }),
  is_active: false,
  awatar: null
})

const handleResetForm = () => {
  formRef.value?.resetForm()
}

const handleCreate = async () => {
  if (await formRef.value?.validate()) {
    try {
      form.awatar = await uploadRef.value!.uploadToServer() as PartialFileAdminApiDto

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
        label="Sub description"
        :prop="`translate.${currentIndexLocale}.sub_description`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].sub_description" />
      </ElFormItem>
      <ElFormItem
        label="Description"
        :prop="`translate.${currentIndexLocale}.description`"
      >
        <AdminEditorInput
          v-model="form.translate[currentIndexLocale].description"
        />
      </ElFormItem>
      <ElFormItem label="Is active" prop="is_active">
        <ElSwitch v-model="form.is_active" />
      </ElFormItem>
      <ElFormItem required label="Awatar Image" prop="awatar">
        <AdminUploadFile ref="uploadRef" v-model="form.awatar" />
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
