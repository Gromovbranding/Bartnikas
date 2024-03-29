<script lang="ts" setup>
import type { IndexCardFooter } from '@/types/admin-api'
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

const { footerIndexCard } = useAdmin()
const { formRules, navigateBack, titles, methods } = footerIndexCard()

const model = await methods.handleGetModel(id)

useHeadSafe({
  title: titles.edit
})

const form = reactive<IndexCardFooter>(model)

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
      <ElFormItem label="Title" prop="title">
        <ElInput v-model="form.title" />
      </ElFormItem>

      <ElFormItem label="Text" prop="text">
        <ElInput v-model="form.text" />
      </ElFormItem>

      <ElFormItem label="Is active" prop="active">
        <ElSwitch v-model="form.active" />
      </ElFormItem>

      <ElFormItem label="Button text" prop="button.text">
        <ElInput v-model="form.button.text" />
      </ElFormItem>

      <ElFormItem label="Button url" prop="button.url">
        <ElInput v-model="form.button.url" />
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
