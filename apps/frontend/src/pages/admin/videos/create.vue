<script lang="ts" setup>
import type {
  IProject,
  IProjectTranslate,
  IVideoCollection,
  IVideoCollectionTranslate,
  PartialAdminApiDto,
  PartialFileAdminApiDto
} from '@/types/admin-api'
import { AdminTemplateForm, AdminUploadFile } from '#components'

definePageMeta({
  layout: 'admin'
})

const { videos, initTranslateLocale, currentIndexLocale } = useAdmin()
const { titles, formRules, navigateBack, methods } = videos()

useHeadSafe({
  title: titles.create
})

const uploadRef = ref<InstanceType<typeof AdminUploadFile> | null>(null)
const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null)

const { fetchGet } = useApi()

const { data: projects } = await useAsyncData<IProject[]>(
  'projects',
  async () => await fetchGet('/projects')
)

const translated = computed(() => {
  return projects?.value?.map((item) => {
    return {
      ...item,
      translate: useTranslateLanguage<IProjectTranslate>(item.translate).value
    }
  })
})

const form = reactive<PartialAdminApiDto<IVideoCollection>>({
  translate: initTranslateLocale<IVideoCollectionTranslate>({
    title: ''
  }),
  video: null,
  project: projects.value?.[0] ?? ({} as IProject)
})

const handleResetForm = () => {
  formRef.value?.resetForm()
}

const handleCreate = async () => {
  if (await formRef.value?.validate()) {
    try {
      form.video = await uploadRef.value!.uploadToServer() as PartialFileAdminApiDto

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
      <ElFormItem label="Title" :prop="`translate.${currentIndexLocale}.title`">
        <ElInput v-model="form.translate[currentIndexLocale].title" />
      </ElFormItem>

      <ElFormItem label="Project" prop="project">
        <ElSelect v-model="form.project">
          <ElOption
            v-for="item in translated"
            :key="item.id"
            :label="item.translate?.title"
            :value="item"
          />
        </ElSelect>
      </ElFormItem>

      <ElFormItem required label="Video" prop="video">
        <AdminUploadFile
          ref="uploadRef"
          v-model="form.video"
          file-type="video"
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
