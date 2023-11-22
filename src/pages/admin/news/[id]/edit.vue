<script lang="ts" setup>
import type { IArticle, PartialFileAdminApiDto } from "@/types/admin-api";
import { AdminTemplateForm, AdminUploadFile } from "#components";

definePageMeta({
  layout: "admin",
  validate(route) {
    return /^\d+$/.test(route.params.id as string);
  },
});

const uploadRef = ref<InstanceType<typeof AdminUploadFile> | null>(null);
const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null);

const route = useRoute();
const id = Number(route.params.id);

const { news } = useAdmin();
const { formRules, navigateBack, titles, methods } = news();

const model = await methods.handleGetModel(id);

useHeadSafe({
  title: titles.edit,
});

const form = reactive<IArticle>(model);

const handleDelete = async () => {
  await methods.handleDelete(id);
  await navigateTo(navigateBack.value);
};

const handleUpdate = async () => {
  if (await formRef.value?.validate()) {
    try {
      const file = await uploadRef.value!.uploadToServer();

      await methods.handlePatch(id, {
        ...toValue(form),
        image: file as PartialFileAdminApiDto,
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
  <AdminTemplateCardWithForm :title="titles.edit" :navigate-back="navigateBack">
    <AdminTemplateForm ref="formRef" :model="form" :rules="formRules">
      <ElFormItem label="Title" prop="title">
        <ElInput v-model="form.title" />
      </ElFormItem>
      <ElFormItem label="Article is hot" prop="is_hot">
        <ElSwitch v-model="form.is_hot" />
      </ElFormItem>
      <ElFormItem label="Description" prop="description">
        <AdminEditorInput v-model="form.description" />
      </ElFormItem>
      <ElFormItem label="Text" prop="text">
        <AdminEditorInput v-model="form.text" />
      </ElFormItem>
      <ElFormItem required label="Article Image" prop="image">
        <AdminUploadFile ref="uploadRef" v-model="form.image" />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="handleUpdate"> Update </ElButton>
        <ElButton type="danger" @click="handleDelete"> Delete </ElButton>
      </ElFormItem>
    </AdminTemplateForm>
  </AdminTemplateCardWithForm>
</template>
