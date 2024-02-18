<script lang="ts" setup>
import type {
  ITermsStatic,
  PartialAdminApiDto,
  ITermsStaticTranslate
} from '@/types/admin-api'
import { AdminTemplateForm } from '#components'

definePageMeta({
  layout: 'admin'
})

const { termsStatic, initTranslateLocale, currentIndexLocale } = useAdmin()
const { titles, formRules, navigateBack, methods } = termsStatic()

useHeadSafe({
  title: titles.create
})

const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null)

const form = reactive<PartialAdminApiDto<ITermsStatic>>({
  translate: initTranslateLocale<ITermsStaticTranslate>({
    title: '',
    description: ''
  })
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
      <ElFormItem label="Title" :prop="`translate.${currentIndexLocale}.title`">
        <ElInput v-model="form.translate[currentIndexLocale].title" />
      </ElFormItem>
      <ElFormItem
        label="Description"
        :prop="`translate.${currentIndexLocale}.description`"
      >
        <AdminEditorInput
          v-model="form.translate[currentIndexLocale].description"
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
