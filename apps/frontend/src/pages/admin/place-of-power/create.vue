<script lang="ts" setup>
import { AdminTemplateForm } from '#components'
import type { IPlaceOfPowerTranslate } from '~/types/admin-api'

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
  translate: initTranslateLocale<IPlaceOfPowerTranslate>({
    title: '',
    subtitle: '',
    quote_text: '',
    quote_author: '',
    transformation_title: '',
    list_title: '',
    list_items: '',
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
        <AdminEditorInput v-model="form.translate[currentIndexLocale].title" />
      </ElFormItem>
      <ElFormItem
        :label="'Subtitle'"
        :prop="`translate.${currentIndexLocale}.subtitle`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].subtitle" />
      </ElFormItem>
      <ElFormItem
        :label="'Quote text'"
        :prop="`translate.${currentIndexLocale}.quote_text`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].quote_text" />
      </ElFormItem>
      <ElFormItem
        :label="'Quote author'"
        :prop="`translate.${currentIndexLocale}.quote_author`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].quote_author" />
      </ElFormItem>
      <ElFormItem
        :label="'Transformation title'"
        :prop="`translate.${currentIndexLocale}.transformation_title`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].transformation_title" />
      </ElFormItem>
      <ElFormItem
        :label="'List title'"
        :prop="`translate.${currentIndexLocale}.list_title`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].list_title" />
      </ElFormItem>
      <ElFormItem
        :label="'List items'"
        :prop="`translate.${currentIndexLocale}.list_items`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].list_items" />
      </ElFormItem>
      <ElFormItem
        :label="'Artefact title'"
        :prop="`translate.${currentIndexLocale}.artefact_title`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].artefact_title" />
      </ElFormItem>
      <ElFormItem
        :label="'Artefact text'"
        :prop="`translate.${currentIndexLocale}.artefact_text`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].artefact_text" />
      </ElFormItem>
      <ElFormItem
        :label="'Exclusive title'"
        :prop="`translate.${currentIndexLocale}.exclusive_title`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].exclusive_title" />
      </ElFormItem>
      <ElFormItem
        :label="'Exclusive head text'"
        :prop="`translate.${currentIndexLocale}.exclusive_head_text`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].exclusive_head_text" />
      </ElFormItem>
      <ElFormItem
        :label="'Exclusive subtitle'"
        :prop="`translate.${currentIndexLocale}.exclusive_subtitle`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].exclusive_subtitle" />
      </ElFormItem>

      <ElFormItem>
        <h2 style="font-size: 24px">
          Exclusive rates
        </h2>
      </ElFormItem>
      <template v-for="(item, idx) in form.translate[currentIndexLocale].exclusive_rates" :key="`ml-${idx}`">
        <ElFormItem
          label="Rate title"
          :prop="`translate.${currentIndexLocale}.exclusive_rates.${idx}.title`"
          :rules="{
            required: true,
            message: 'field is required',
            trigger: 'blur',
          }"
        >
          <AdminEditorInput v-model="form.translate[currentIndexLocale].exclusive_rates[idx].title" />
        </ElFormItem>

        <ElFormItem
          label="Rate benefits"
          :prop="`translate.${currentIndexLocale}.exclusive_rates.${idx}.benefits`"
          :rules="{
            required: true,
            message: 'field is required',
            trigger: 'blur',
          }"
        >
          <AdminEditorInput v-model="form.translate[currentIndexLocale].exclusive_rates[idx].benefits" />
        </ElFormItem>

        <ElFormItem
          label="Rate footer description"
          :prop="`translate.${currentIndexLocale}.exclusive_rates.${idx}.footer.description`"
          :rules="{
            message: 'field is required',
            trigger: 'blur',
          }"
        >
          <AdminEditorInput v-model="form.translate[currentIndexLocale].exclusive_rates[idx].footer.description" />
        </ElFormItem>

        <ElFormItem
          label="Rate footer text"
          :prop="`translate.${currentIndexLocale}.exclusive_rates.${idx}.footer.text`"
          :rules="{
            message: 'field is required',
            trigger: 'blur',
          }"
        >
          <AdminEditorInput v-model="form.translate[currentIndexLocale].exclusive_rates[idx].footer.text" />
        </ElFormItem>

        <ElFormItem>
          <ElButton
            type="danger"
            @click="form.translate[currentIndexLocale].exclusive_rates = removeItemByIdx(form.translate[currentIndexLocale].exclusive_rates, idx)"
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
            form.translate[currentIndexLocale].exclusive_rates.push({
              title: '',
              benefits: '',
              footer: {
                description: '',
                text: ''
              }
            })
          "
        >
          Add exclusive rate
        </ElButton>
      </ElFormItem>

      <ElFormItem
        :label="'Exclusive footer info'"
        :prop="`translate.${currentIndexLocale}.exclusive_footer_info`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].exclusive_footer_info" />
      </ElFormItem>
      <ElFormItem
        :label="'Exclusive footer btn'"
        :prop="`translate.${currentIndexLocale}.exclusive_footer_btn`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].exclusive_footer_btn" />
      </ElFormItem>
      <ElFormItem
        :label="'Popup title'"
        :prop="`translate.${currentIndexLocale}.popup_title`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].popup_title" />
      </ElFormItem>
      <ElFormItem
        :label="'Popup subtitle'"
        :prop="`translate.${currentIndexLocale}.popup_subtitle`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].popup_subtitle" />
      </ElFormItem>
      <ElFormItem
        :label="'Popup note'"
        :prop="`translate.${currentIndexLocale}.popup_note`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].popup_note" />
      </ElFormItem>
      <ElFormItem
        :label="'Popup btn'"
        :prop="`translate.${currentIndexLocale}.popup_btn`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].popup_btn" />
      </ElFormItem>
      <ElFormItem
        :label="'Agreement'"
        :prop="`translate.${currentIndexLocale}.agreement`"
      >
        <AdminEditorInput v-model="form.translate[currentIndexLocale].agreement" />
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
