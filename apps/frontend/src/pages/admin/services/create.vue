<script lang="ts" setup>
import { AdminTemplateForm } from '#components'
import type { IServices, IServicesTranslate, PartialAdminApiDto } from '~/types/admin-api'

definePageMeta({
  layout: 'admin'
})

const { services, initTranslateLocale, currentIndexLocale } = useAdmin()
const { titles, formRules, navigateBack, methods } = services()

useHeadSafe({
  title: titles.create
})

const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null)

const form = reactive<PartialAdminApiDto<IServices>>({
  is_active: false,
  translate: initTranslateLocale<IServicesTranslate>({
    title: '',
    services: []
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

      <ElFormItem>
        <h2 style="font-size: 24px">
          Services
        </h2>
      </ElFormItem>
      <template v-for="(item, idx) in form.translate[currentIndexLocale].services" :key="`ml-${idx}`">
        <ElFormItem
          label="Title"
          :prop="`translate.${currentIndexLocale}.services.${idx}.title`"
          :rules="{
            required: true,
            message: 'field is required',
            trigger: 'blur',
          }"
        >
          <ElInput v-model="form.translate[currentIndexLocale].services[idx].title" />
        </ElFormItem>

        <ElFormItem
          label="Text"
          :prop="`translate.${currentIndexLocale}.services.${idx}.text`"
          :rules="{
            required: true,
            message: 'field is required',
            trigger: 'blur',
          }"
        >
          <ElInput v-model="form.translate[currentIndexLocale].services[idx].text" />
        </ElFormItem>

        <ElFormItem
          label="Button text"
          :prop="`translate.${currentIndexLocale}.services.${idx}.btn.text`"
          :rules="{
            required: true,
            message: 'field is required',
            trigger: 'blur',
          }"
        >
          <ElInput v-model="form.translate[currentIndexLocale].services[idx].btn.text" />
        </ElFormItem>

        <ElFormItem
          label="Button url"
          :prop="`translate.${currentIndexLocale}.services.${idx}.btn.url`"
          :rules="{
            required: true,
            message: 'field is required',
            trigger: 'blur',
          }"
        >
          <ElInput v-model="form.translate[currentIndexLocale].services[idx].btn.url" />
        </ElFormItem>

        <ElFormItem>
          <ElButton
            type="danger"
            @click="form.translate[currentIndexLocale].services = removeItemByIdx(form.translate[currentIndexLocale].services, idx)"
          >
            <ElIcon>
              <ElIconDelete />
            </ElIcon>
          </ElButton>
        </ElFormItem>
      </template>

      <ElFormItem>
        <ElButton
          type="default"
          @click="
            form.translate[currentIndexLocale].services.push({
              title: '',
              text: '',
              btn: {
                text: '',
                url: ''
              }
            })
          "
        >
          Add service
        </ElButton>
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
