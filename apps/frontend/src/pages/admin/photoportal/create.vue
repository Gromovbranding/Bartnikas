<script lang="ts" setup>
import { AdminTemplateForm } from '#components'
import type { IPhotoportalTranslate } from '~/types/admin-api'

definePageMeta({
  layout: 'admin'
})

const { servicesPhotoportal, initTranslateLocale, currentIndexLocale } = useAdmin()
const { titles, formRules, navigateBack, methods } = servicesPhotoportal()

useHeadSafe({
  title: titles.create
})

const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null)

const form = reactive({
  is_active: false,
  translate: initTranslateLocale<IPhotoportalTranslate>({
    intro_title: '',

    intro_subtitle: '',

    intro_action: '',

    peculiarities_title: '',

    for_what_list: '',

    peculiarities_list: '',

    influence_title: '',

    influence_quote_text: '',

    influence_quote_accent_text: '',

    influence_quote_author: '',

    for_what_title: '',

    popup_title: '',

    popup_subtitle_accent: '',

    popup_subtitle: '',

    popup_btn: '',

    agreement: '',

    special_action: '',

    special_description: '',

    special_footer_text: '',

    special_title: ''
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
        :prop="`translate.${currentIndexLocale}.intro_title`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].intro_title" />
      </ElFormItem>
      <ElFormItem
        :label="'Intro action'"
        :prop="`translate.${currentIndexLocale}.intro_action`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].intro_action" />
      </ElFormItem>
      <ElFormItem
        :label="'Subtitle'"
        :prop="`translate.${currentIndexLocale}.intro_subtitle`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].intro_subtitle" />
      </ElFormItem>
      <ElFormItem
        :label="'Peculiarities list'"
        :prop="`translate.${currentIndexLocale}.peculiarities_list`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].peculiarities_list" />
      </ElFormItem>
      <ElFormItem
        :label="'Peculiarities title'"
        :prop="`translate.${currentIndexLocale}.peculiarities_title`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].peculiarities_title" />
      </ElFormItem>
      <ElFormItem
        :label="'Influence title'"
        :prop="`translate.${currentIndexLocale}.influence_title`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].influence_title" />
      </ElFormItem>
      <ElFormItem
        :label="'Influence quot text'"
        :prop="`translate.${currentIndexLocale}.influence_quote_text`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].influence_quote_text" />
      </ElFormItem>
      <ElFormItem
        :label="'Influence quote accent text'"
        :prop="`translate.${currentIndexLocale}.influence_quote_accent_text`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].influence_quote_accent_text" />
      </ElFormItem>
      <ElFormItem
        :label="'Influence quote author'"
        :prop="`translate.${currentIndexLocale}.influence_quote_author`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].influence_quote_author" />
      </ElFormItem>
      <ElFormItem
        :label="'For what title'"
        :prop="`translate.${currentIndexLocale}.for_what_title`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].for_what_title" />
      </ElFormItem>
      <ElFormItem
        :label="'Popup title'"
        :prop="`translate.${currentIndexLocale}.popup_title`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].popup_title" />
      </ElFormItem>
      <ElFormItem
        :label="'Popup subtitle accent'"
        :prop="`translate.${currentIndexLocale}.popup_subtitle_accent`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].popup_subtitle_accent" />
      </ElFormItem>
      <ElFormItem
        :label="'For what list '"
        :prop="`translate.${currentIndexLocale}.for_what_list `"
      >
        <ElInput v-model="form.translate[currentIndexLocale].for_what_list " />
      </ElFormItem>
      <ElFormItem
        :label="'Popup subtitle'"
        :prop="`translate.${currentIndexLocale}.popup_subtitle `"
      >
        <ElInput v-model="form.translate[currentIndexLocale].popup_subtitle " />
      </ElFormItem>
      <ElFormItem
        :label="'Popup button text'"
        :prop="`translate.${currentIndexLocale}.popup_btn`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].popup_btn" />
      </ElFormItem>
      <ElFormItem
        :label="'Popup agreement'"
        :prop="`translate.${currentIndexLocale}.agreement`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].agreement" />
      </ElFormItem>
      <ElFormItem
        :label="'Special title'"
        :prop="`translate.${currentIndexLocale}.special_title`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].special_title" />
      </ElFormItem>
      <ElFormItem
        :label="'Special description'"
        :prop="`translate.${currentIndexLocale}.special_description`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].special_description" />
      </ElFormItem>
      <ElFormItem
        :label="'Special footer text'"
        :prop="`translate.${currentIndexLocale}.special_footer_text`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].special_footer_text" />
      </ElFormItem>
      <ElFormItem
        :label="'Special action'"
        :prop="`translate.${currentIndexLocale}.special_action`"
      >
        <ElInput v-model="form.translate[currentIndexLocale].special_action" />
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
