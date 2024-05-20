<script lang="ts" setup>
import { AdminTemplateForm } from '#components'

definePageMeta({
  layout: 'admin'
})

const { servicesPlaceOfPower, initTranslateLocale, currentIndexLocale } = useAdmin()
const { titles, formRules, navigateBack, methods } = servicesPlaceOfPower()

useHeadSafe({
  title: titles.create
})

const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null)

const form = reactive({
  is_active: false,
  translate: initTranslateLocale({
    title: '',
    ultra_exclusive_anchor: '',
    subtitle: '',
    quote_text: '',
    quote_author: '',
    transformation_title: '',
    list_title: '',
    list_items: ''
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
      <ElFormItem label="Is active" prop="active">
        <ElSwitch v-model="form.is_active" />
      </ElFormItem>
      <ElFormItem
        :label="'Title'"
        :prop="`translate.${currentIndexLocale}.title`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].title" />
      </ElFormItem>
      <ElFormItem
        :label="'Ultra exclusive anchor'"
        :prop="`translate.${currentIndexLocale}.ultra_exclusive_anchor`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].ultra_exclusive_anchor" />
      </ElFormItem>
      <ElFormItem
        :label="'Subtitle'"
        :prop="`translate.${currentIndexLocale}.subtitle`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].subtitle" />
      </ElFormItem>
      <ElFormItem
        :label="'Quote text'"
        :prop="`translate.${currentIndexLocale}.quote_text`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].quote_text" />
      </ElFormItem>
      <ElFormItem
        :label="'Quote author'"
        :prop="`translate.${currentIndexLocale}.quote_author`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].quote_author" />
      </ElFormItem>
      <ElFormItem
        :label="'Transformation title'"
        :prop="`translate.${currentIndexLocale}.transformation_title`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].transformation_title" />
      </ElFormItem>
      <ElFormItem
        :label="'List title'"
        :prop="`translate.${currentIndexLocale}.list_title`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].list_title" />
      </ElFormItem>
      <ElFormItem
        :label="'List items'"
        :prop="`translate.${currentIndexLocale}.list_items`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].list_items" />
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
