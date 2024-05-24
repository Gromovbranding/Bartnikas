<script lang="ts" setup>
import { AdminTemplateForm } from '#components'
import type { IPhotoportal, IPhotoportalTranslate } from '~/types/admin-api'

definePageMeta({
  layout: 'admin',
  validate (route) {
    return /^\d+$/.test(route.params.id as string)
  }
})

const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null)

const route = useRoute()
const id = Number(route.params.id)

const { servicesPhotoportal, currentIndexLocale, initTranslateLocale } = useAdmin()
const { formRules, navigateBack, titles, methods } = servicesPhotoportal()

const model = await methods.handleGetModel(id)

useHeadSafe({
  title: titles.edit
})

const form = reactive<IPhotoportal>({
  ...model,
  translate: initTranslateLocale<IPhotoportalTranslate>(model.translate)
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
        :prop="`translate.${currentIndexLocale}.intro_title`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].intro_title" />
      </ElFormItem>
      <ElFormItem
        :label="'Intro action'"
        :prop="`translate.${currentIndexLocale}.intro_action`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].intro_action" />
      </ElFormItem>
      <ElFormItem
        :label="'Subtitle'"
        :prop="`translate.${currentIndexLocale}.intro_subtitle`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].intro_subtitle" />
      </ElFormItem>
      <ElFormItem
        :label="'Peculiarities list'"
        :prop="`translate.${currentIndexLocale}.peculiarities_list`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].peculiarities_list" />
      </ElFormItem>
      <ElFormItem
        :label="'Peculiarities title'"
        :prop="`translate.${currentIndexLocale}.peculiarities_title`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].peculiarities_title" />
      </ElFormItem>
      <ElFormItem
        :label="'Influence title'"
        :prop="`translate.${currentIndexLocale}.influence_title`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].influence_title" />
      </ElFormItem>
      <ElFormItem
        :label="'Influence quot text'"
        :prop="`translate.${currentIndexLocale}.influence_quote_text`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].influence_quote_text" />
      </ElFormItem>
      <ElFormItem
        :label="'Influence quote accent text'"
        :prop="`translate.${currentIndexLocale}.influence_quote_accent_text`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].influence_quote_accent_text" />
      </ElFormItem>
      <ElFormItem
        :label="'Influence quote author'"
        :prop="`translate.${currentIndexLocale}.influence_quote_author`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].influence_quote_author" />
      </ElFormItem>
      <ElFormItem
        :label="'For what title'"
        :prop="`translate.${currentIndexLocale}.for_what_title`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].for_what_title" />
      </ElFormItem>
      <ElFormItem
        :label="'Popup title'"
        :prop="`translate.${currentIndexLocale}.popup_title`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].popup_title" />
      </ElFormItem>
      <ElFormItem
        :label="'Popup subtitle accent'"
        :prop="`translate.${currentIndexLocale}.popup_subtitle_accent`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].popup_subtitle_accent" />
      </ElFormItem>
      <ElFormItem
        :label="'For what list '"
        :prop="`translate.${currentIndexLocale}.for_what_list `"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].for_what_list " />
      </ElFormItem>
      <ElFormItem
        :label="'Popup subtitle'"
        :prop="`translate.${currentIndexLocale}.popup_subtitle `"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].popup_subtitle " />
      </ElFormItem>
      <ElFormItem
        :label="'Popup button text'"
        :prop="`translate.${currentIndexLocale}.popup_btn`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].popup_btn" />
      </ElFormItem>
      <ElFormItem
        :label="'Popup agreement'"
        :prop="`translate.${currentIndexLocale}.agreement`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].agreement" />
      </ElFormItem>
      <ElFormItem
        :label="'Special title'"
        :prop="`translate.${currentIndexLocale}.special_title`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].special_title" />
      </ElFormItem>
      <ElFormItem
        :label="'Special description'"
        :prop="`translate.${currentIndexLocale}.special_description`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].special_description" />
      </ElFormItem>
      <ElFormItem
        :label="'Special footer text'"
        :prop="`translate.${currentIndexLocale}.special_footer_text`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].special_footer_text" />
      </ElFormItem>
      <ElFormItem
        :label="'Special action'"
        :prop="`translate.${currentIndexLocale}.special_action`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].special_action" />
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
