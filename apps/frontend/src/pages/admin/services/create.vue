<script lang="ts" setup>
import type {
  IServices,
  IServicesTranslate,
  PartialAdminApiDto
} from '@/types/admin-api'
import { AdminTemplateForm } from '#components'

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
  translate: initTranslateLocale<IServicesTranslate>({
    placeOfPowerTitle: '',

    placeOfPowerUltraExclusiveAnchor: '',

    placeOfPowerSubtitle: '',

    placeOfPowerQuoteText: '',

    placeOfPowerQuoteAuthor: '',

    placeOfPowerTransformationTitle: '',

    placeOfPowerListTitle: '',

    placeOfPowerListItems: '',

    photoportalIntroTitle: '',

    photoportalIntroSubtitle: '',

    photoportalIntroAction: '',

    photoportalPeculiaritiesTitle: '',

    photoportalPeculiaritiesList: '',

    photoportalInfluenceTitle: '',

    photoportalInfluenceQuoteText: '',

    photoportalInfluenceQuoteAccent_text: '',

    photoportalInfluenceQuoteAuthor: '',

    photoportalForWhatTitle: '',

    photoportalForWhatList: '',

    photoportalPopupSubtitle: '',

    photoportalPopupSubtitle_accent: '',

    photoportalSubtitle: '',

    photoportalPopupBtn: '',

    photoportalAgreement: ''
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
