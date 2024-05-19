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

    quote_text: '',

    quote_author: '',

    transformation_title: '',

    transformation_list_text: '',

    transformation_list_items: '',

    artefact_title: '',

    artefact_text: '',

    exclusive_title: '',

    exclusive_head_text: '',

    exclusive_subtitle: '',

    exclusive_rates: [],

    exclusive_footer_info: '',

    exclusive_footer_btn: '',

    popup_title: '',

    popup_subtitle: '',

    popup_note: '',

    popup_btn: '',

    agreement: ''
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
        :prop="`translate.${currentIndexLocale}.quote_text`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].quote_text"
        />
      </ElFormItem>
      <ElFormItem
        :label="'Quote author'"
        :prop="`translate.${currentIndexLocale}.quote_author`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].quote_author"
        />
      </ElFormItem>
      <ElFormItem
        :label="'Transformation title'"
        :prop="`translate.${currentIndexLocale}.transformation_title`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].transformation_title"
        />
      </ElFormItem>
      <ElFormItem
        :label="'Transformation list text'"
        :prop="`translate.${currentIndexLocale}.transformation_list_text`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].transformation_list_text"
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
        :prop="`translate.${currentIndexLocale}.artefact_title`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].artefact_title"
        />
      </ElFormItem>
      <ElFormItem
        :label="'Artefact text'"
        :prop="`translate.${currentIndexLocale}.artefact_text`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].artefact_text"
          type="textarea"
          resize="none"
        />
      </ElFormItem>
      <ElFormItem
        :label="'Exclusive title'"
        :prop="`translate.${currentIndexLocale}.exclusive_title`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].exclusive_title"
        />
      </ElFormItem>
      <ElFormItem
        :label="'Exclusive head text'"
        :prop="`translate.${currentIndexLocale}.exclusive_head_text`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].exclusive_head_text"
          type="textarea"
          resize="none"
        />
      </ElFormItem>

      <ElFormItem
        :label="'Exclusive subtitle'"
        :prop="`translate.${currentIndexLocale}.exclusive_subtitle`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].exclusive_subtitle"
        />
      </ElFormItem>

      <ElFormItem
        :label="'Footer info'"
        :prop="`translate.${currentIndexLocale}.exclusive_footer_info`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].exclusive_footer_info"
        />
      </ElFormItem>

      <ElFormItem
        :label="'Footer button'"
        :prop="`translate.${currentIndexLocale}.exclusive_footer_btn`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].exclusive_footer_btn"
        />
      </ElFormItem>

      <ElFormItem
        :label="'Popup title'"
        :prop="`translate.${currentIndexLocale}.popup_title`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].popup_title"
        />
      </ElFormItem>

      <ElFormItem
        :label="'Popup subtitle'"
        :prop="`translate.${currentIndexLocale}.popup_subtitle`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].popup_subtitle"
        />
      </ElFormItem>

      <ElFormItem
        :label="'Popup note'"
        :prop="`translate.${currentIndexLocale}.popup_note`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].popup_note"
        />
      </ElFormItem>

      <ElFormItem
        :label="'Popup button text'"
        :prop="`translate.${currentIndexLocale}.popup_btn`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].popup_btn"
        />
      </ElFormItem>

      <ElFormItem
        :label="'Popup agreement'"
        :prop="`translate.${currentIndexLocale}.agreement`"
      >
        <ElInput
          v-model="form.translate[currentIndexLocale].agreement"
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
