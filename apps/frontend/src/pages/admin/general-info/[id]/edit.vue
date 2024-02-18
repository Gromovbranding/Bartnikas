<script lang="ts" setup>
import type { IGeneralInfo } from '@/types/admin-api'
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

const { generalInfo } = useAdmin()
const { formRules, navigateBack, titles, methods } = generalInfo()

const model = await methods.handleGetModel(id)

useHeadSafe({
  title: titles.edit
})

const form = reactive<IGeneralInfo>(model)

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
      <ElFormItem label="Press email" prop="email_press">
        <ElInput v-model="form.email_press" />
      </ElFormItem>

      <ElFormItem label="Gallery Email" prop="email_gallery">
        <ElInput v-model="form.email_gallery" />
      </ElFormItem>

      <ElFormItem label="Is active" prop="is_active">
        <ElSwitch v-model="form.is_active" />
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
