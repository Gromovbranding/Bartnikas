<script lang="ts" setup>
import {
  IAwards,
  PartialAdminApiDto,
  PartialFileAdminApiDto,
} from "@/types/admin-api";
import { AdminTemplateForm, AdminUploadFile } from "#components";

definePageMeta({
  layout: "admin",
});

const { awards } = useAdmin();
const { titles, formRules, navigateBack, methods } = awards();

useHeadSafe({
  title: titles.create,
});

const uploadAvatarRef = ref<InstanceType<typeof AdminUploadFile> | null>(null);
const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null);

const form = reactive<PartialAdminApiDto<IAwards>>({
  title: "",
  awards_avatar: null,
  description: "",
  degress: [],
});

const handleResetForm = () => {
  formRef.value?.resetForm();
};

const handleCreate = async () => {
  if (await formRef.value?.validate()) {
    try {
      const file = await uploadAvatarRef.value!.uploadToServer();

      await methods.handleCreate({
        ...toValue(form),
        awards_avatar: file as PartialFileAdminApiDto,
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
      <ElFormItem label="Description" prop="description">
        <ElInput v-model="form.description" :rows="5" type="textarea" />
      </ElFormItem>
      <ElFormItem required label="Award logo" prop="awards_avatar">
        <AdminUploadFile
          ref="uploadAvatarRef"
          v-model="form.awards_avatar"
          file-type="image"
        />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="handleCreate"> Create </ElButton>
        <ElButton @click="handleResetForm"> Clear </ElButton>
      </ElFormItem>
    </AdminTemplateForm>
  </AdminTemplateCardWithForm>
</template>
