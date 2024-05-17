<script lang="ts" setup>
import type { IFaq, IServicesTranslate } from '@/types/admin-api'
import { AdminTemplateForm } from '#components'

definePageMeta({
  layout: 'admin',
  validate (route) {
    return /^\d+$/.test(route.params.id as string)
  }
})

const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null)

const route = useRoute()
const id = Number(route.params.id)

const { services, currentIndexLocale, initTranslateLocale } = useAdmin()
const { formRules, navigateBack, titles, methods } = services()

const model = await methods.handleGetModel(id)

useHeadSafe({
  title: titles.edit
})

const form = reactive<IFaq>({
  ...model,
  translate: initTranslateLocale<IServicesTranslate>(model.translate)
})

const handleDelete = async () => {
  await methods.handleDelete(id)
  await navigateTo(navigateBack.value)
}

const handleUpdate = async () => {
  if (await formRef.value?.validate()) {
    try {
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
      <ElFormItem
        v-for="(value, key) in form.translate[currentIndexLocale]"
        :key="key"
        :label="key"
        :prop="`translate.${currentIndexLocale}.${key}`"
      >
        <AdminEditorInput
          v-model="form.translate[currentIndexLocale][key]"
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
