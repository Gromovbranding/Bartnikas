<script lang="ts" setup>
import {
  IArticle,
  PartialAdminApiDto,
  PartialFileAdminApiDto,
} from "@/types/admin-api";
import { AdminTemplateForm, AdminUploadFile } from "#components";

definePageMeta({
  layout: "admin",
});

const { news } = useAdmin();
const { titles, formRules, navigateBack, methods } = news();

useHeadSafe({
  title: titles.create,
});

const uploadRef = ref<InstanceType<typeof AdminUploadFile> | null>(null);
const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null);

const form = reactive<PartialAdminApiDto<IArticle>>({
  title: "",
  is_hot: false,
  description: "",
  text: "",
  image: null,
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
  <AdminTemplateCardWithForm
    :title="titles.create"
    :navigate-back="navigateBack"
  >
    <AdminTemplateForm ref="formRef" :model="form" :rules="formRules">
      <ElFormItem label="Title" prop="title">
        <ElInput v-model="form.title" />
      </ElFormItem>
      <ElFormItem label="Article is hot" prop="is_hot">
        <ElSwitch v-model="form.is_hot" />
      </ElFormItem>
      <ElFormItem label="Description" prop="description">
        <ElInput v-model="form.description" :rows="5" type="textarea" />
      </ElFormItem>
      <ElFormItem label="Text" prop="text">
        <ElInput v-model="form.text" :rows="5" type="textarea" />
      </ElFormItem>
      <ElFormItem required label="Article Image" prop="image">
        <AdminUploadFile ref="uploadRef" v-model="form.image" />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="handleCreate"> Create </ElButton>
        <ElButton @click="handleResetForm"> Clear </ElButton>
      </ElFormItem>
    </AdminTemplateForm>
  </AdminTemplateCardWithForm>
</template>
