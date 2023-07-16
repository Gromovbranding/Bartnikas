<script lang="ts" setup>
import {
  IProject,
  IVideoCollection,
  PartialAdminApiDto,
  PartialFileAdminApiDto,
} from "@/types/admin-api";
import { AdminTemplateForm, AdminUploadFile } from "#components";

definePageMeta({
  layout: "admin",
});

const { videos } = useAdmin();
const { titles, formRules, navigateBack, methods } = videos();

useHeadSafe({
  title: titles.create,
});

const uploadRef = ref<InstanceType<typeof AdminUploadFile> | null>(null);
const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null);

const { fetchGet } = useApi();

const { data: projects } = await useAsyncData<IProject[]>(
  "projects",
  async () => await fetchGet("/projects")
);

const form = reactive<PartialAdminApiDto<IVideoCollection>>({
  title: "",
  video: null,
  project: projects.value?.[0] ?? ({} as IProject),
});

const handleResetForm = () => {
  formRef.value?.resetForm();
};

const handleCreate = async () => {
  if (await formRef.value?.validate()) {
    try {
      const file = await uploadRef.value!.uploadToServer();

      await methods.handleCreate({
        ...toValue(form),
        video: file as PartialFileAdminApiDto,
      });

      await refreshNuxtData();

      await navigateTo(navigateBack.value);
    } catch (exc) {
      console.error(exc);
    }
  }
};
</script>

<template>
  <AdminTemplateCardWithForm
    :title="titles.create"
    :navigate-back="navigateBack"
  >
    <AdminTemplateForm ref="formRef" :model="form" :rules="formRules">
      <ElFormItem label="Title" prop="title">
        <ElInput v-model="form.title" />
      </ElFormItem>

      <ElFormItem label="Project" prop="project">
        <ElSelect v-model="form.project">
          <ElOption
            v-for="item in projects"
            :key="item.id"
            :label="item.title"
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
        <ElButton type="primary" @click="handleCreate"> Create </ElButton>
        <ElButton @click="handleResetForm"> Clear </ElButton>
      </ElFormItem>
    </AdminTemplateForm>
  </AdminTemplateCardWithForm>
</template>
