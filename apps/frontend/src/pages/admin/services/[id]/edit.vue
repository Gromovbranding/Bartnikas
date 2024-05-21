<script lang="ts" setup>
import { AdminTemplateForm } from '#components'
import type { IServices, IServicesTranslate } from '~/types/admin-api'

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

const form = reactive<IServices>({
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
