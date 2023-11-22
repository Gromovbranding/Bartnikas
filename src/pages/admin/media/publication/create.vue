<script lang="ts" setup>
import type {
  IMediaPublication,
  PartialAdminApiDto,
  PartialFileAdminApiDto,
} from "@/types/admin-api";
import { AdminTemplateForm, AdminUploadFile } from "#components";

definePageMeta({
  layout: "admin",
});

const { media } = useAdmin();
const { titles, formRules, navigateBack, methods } = media().publication();

const uploadImageRef = ref<InstanceType<typeof AdminUploadFile> | null>(null);
const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null);

useHeadSafe({
  title: titles.create,
});

const form = reactive<PartialAdminApiDto<IMediaPublication>>({
  image: null,
  program: "",
  subtitle: "",
  url: "",
  date: new Date(),
});

const handleResetForm = () => {
  formRef.value?.resetForm();
};

const handleCreate = async () => {
  if (await formRef.value?.validate()) {
    try {
      const fileImage = await uploadImageRef.value!.uploadToServer();

      await methods.handleCreate({
        ...toValue(form),
        image: fileImage as PartialFileAdminApiDto,
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
      <ElFormItem label="Program" prop="program">
        <ElInput v-model="form.program" />
      </ElFormItem>
      <ElFormItem label="Subtitle" prop="subtitle">
        <AdminEditorInput v-model="form.subtitle" />
      </ElFormItem>
      <ElFormItem label="URL" prop="url">
        <ElInput v-model="form.url" />
      </ElFormItem>
      <ElFormItem label="Date" prop="date">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="Pick a day"
        />
      </ElFormItem>
      <ElFormItem required label="Image" prop="image">
        <AdminUploadFile ref="uploadImageRef" v-model="form.image" />
      </ElFormItem>

      <ElFormItem>
        <ElButton type="primary" @click="handleCreate"> Create </ElButton>
        <ElButton @click="handleResetForm"> Clear </ElButton>
      </ElFormItem>
    </AdminTemplateForm>
  </AdminTemplateCardWithForm>
</template>
