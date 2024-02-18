<script lang="ts" setup>
import type {
  IProject,
  IProjectTranslate,
  IVideoCollection,
  IVideoCollectionTranslate
} from '@/types/admin-api'
import { AdminTemplateForm } from '#components'

definePageMeta({
  layout: 'admin',
  validate (route) {
    return /^\d+$/.test(route.params.id as string)
  }
})

const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null)
const route = useRoute()
const id = Number(route.params.id)

const { videos, initTranslateLocale, currentIndexLocale } = useAdmin()
const { formRules, navigateBack, titles, methods } = videos()

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

const model = await methods.handleGetModel(id)

useHeadSafe({
  title: titles.edit
})

const form = reactive<IVideoCollection>({
  ...model,
  translate: initTranslateLocale<IVideoCollectionTranslate>(model.translate),
  project: model.project ?? projects.value?.[0]
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
      <ElFormItem label="Title" :prop="`translate.${currentIndexLocale}.title`">
        <ElInput v-model="form.translate[currentIndexLocale].title" />
      </ElFormItem>

      <ElFormItem required label="Project" prop="project">
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
        <AdminUploadFile v-model="form.video" file-type="video" />
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