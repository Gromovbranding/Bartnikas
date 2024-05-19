<script lang="ts" setup>
import type { UploadUserFile } from 'element-plus'
import type { IPlaceOfPower, IPlaceOfPowerTranslate } from '@/types/admin-api'
import { AdminTemplateForm, AdminUploadFile } from '#components'

definePageMeta({
  layout: 'admin'
  // validate (route) {
  //   return /^\d+$/.test(route.params.id as string)
  // }
})

const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null)
const uploadTransformationImagesRef = ref<InstanceType<typeof AdminUploadFile> | null>(
  null
)

// const route = useRoute()
// const id = Number(route.params.id)
const id = 1
const imageFiles = ref<UploadUserFile[]>([])

const model = {
  id,
  name: 'Mock Service',
  description: 'This is a mock service description',
  translate: {
    title: '',

    subtitle: '',

    quoteText: '',

    quoteAuthor: '',

    transformationTitle: '',

    transformationListText: '',

    transformationListItems: '',

    artefactTitle: '',

    artefactText: '',

    exclusiveTitle: '',

    exclusiveHeadText: '',

    exclusiveSubtitle: '',

    exclusiveRates: [],

    exclusiveFooterInfo: '',

    exclusiveFooterBtn: '',

    popupTitle: '',

    popupSubtitle: '',

    popupNote: '',

    popupBtn: '',

    popupAgreement: ''
  },
  transformationSlides: []
}

const { placeOfPower, currentIndexLocale, initTranslateLocale } = useAdmin()
const { formRules, navigateBack, titles/*, methods */ } = placeOfPower()

// const model = await methods.handleGetModel(id)

useHeadSafe({
  title: titles.edit
})

const form = reactive<IPlaceOfPower>({
  ...model,
  translate: initTranslateLocale<IPlaceOfPowerTranslate>(model.translate)
})

const handleDelete = async () => {
  console.log('Delete function called') // Заглушка
  await navigateTo(navigateBack.value)
}

const handleUpdate = async () => {
  if (await formRef.value?.validate()) {
    try {
      console.log('Update function called') // Заглушка
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
        :label="'Title'"
        :prop="`translate.${currentIndexLocale}.title`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].title"
        />
      </ElFormItem>
      <ElFormItem
        :label="'Subtitle'"
        :prop="`translate.${currentIndexLocale}.subtitle`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].subtitle"
        />
      </ElFormItem>
      <ElFormItem
        :label="'Quote text'"
        :prop="`translate.${currentIndexLocale}.quoteText`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].quoteText"
        />
      </ElFormItem>
      <ElFormItem
        :label="'Quote author'"
        :prop="`translate.${currentIndexLocale}.quoteAuthor`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].quoteAuthor"
        />
      </ElFormItem>
      <ElFormItem
        :label="'Transformation title'"
        :prop="`translate.${currentIndexLocale}.transformationTitle`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].transformationTitle"
        />
      </ElFormItem>
      <ElFormItem
        :label="'Transformation list text'"
        :prop="`translate.${currentIndexLocale}.transformationListText`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].transformationListText"
        />
      </ElFormItem>
      <ElFormItem label="Transformation slides" prop="details">
        <AdminUploadFile
          ref="uploadTransformationImagesRef"
          v-model="imageFiles"
          :is-show-files="true"
          multiple
          :single="false"
        />
      </ElFormItem>
      <ElFormItem
        :label="'Artefact title'"
        :prop="`translate.${currentIndexLocale}.artefactTitle`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].artefactTitle"
        />
      </ElFormItem>
      <ElFormItem
        :label="'Artefact text'"
        :prop="`translate.${currentIndexLocale}.artefactText`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].artefactText"
          type="textarea"
          resize="none"
        />
      </ElFormItem>
      <ElFormItem
        :label="'Exclusive title'"
        :prop="`translate.${currentIndexLocale}.exclusiveTitle`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].exclusiveTitle"
        />
      </ElFormItem>
      <ElFormItem
        :label="'Exclusive head text'"
        :prop="`translate.${currentIndexLocale}.exclusiveHeadText`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].exclusiveHeadText"
          type="textarea"
          resize="none"
        />
      </ElFormItem>

      <ElFormItem
        :label="'Exclusive subtitle'"
        :prop="`translate.${currentIndexLocale}.exclusiveSubtitle`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].exclusiveSubtitle"
        />
      </ElFormItem>

      <ElFormItem
        :label="'Footer info'"
        :prop="`translate.${currentIndexLocale}.exclusiveFooterInfo`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].exclusiveFooterInfo"
        />
      </ElFormItem>

      <ElFormItem
        :label="'Footer button'"
        :prop="`translate.${currentIndexLocale}.exclusiveFooterBtn`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].exclusiveFooterBtn"
        />
      </ElFormItem>

      <ElFormItem
        :label="'Popup title'"
        :prop="`translate.${currentIndexLocale}.popupTitle`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].popupTitle"
        />
      </ElFormItem>

      <ElFormItem
        :label="'Popup subtitle'"
        :prop="`translate.${currentIndexLocale}.popupSubtitle`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].popupSubtitle"
        />
      </ElFormItem>

      <ElFormItem
        :label="'Popup note'"
        :prop="`translate.${currentIndexLocale}.popupNote`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].popupNote"
        />
      </ElFormItem>

      <ElFormItem
        :label="'Popup button text'"
        :prop="`translate.${currentIndexLocale}.popupBtn`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].popupBtn"
        />
      </ElFormItem>

      <ElFormItem
        :label="'Popup agreement'"
        :prop="`translate.${currentIndexLocale}.popupAgreement`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].popupAgreement"
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
