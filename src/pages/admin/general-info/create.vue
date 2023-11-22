<script lang="ts" setup>
import type { IGeneralInfo, PartialAdminApiDto } from "@/types/admin-api";
import { AdminTemplateForm } from "#components";

definePageMeta({
  layout: "admin",
});

const { generalInfo } = useAdmin();
const { titles, formRules, navigateBack, methods } = generalInfo();

useHeadSafe({
  title: titles.create,
});

const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null);

const form = reactive<PartialAdminApiDto<IGeneralInfo>>({
  email_press: "",
  email_gallery: "",
  is_active: true,
});

const handleResetForm = () => {
  formRef.value?.resetForm();
};

const handleCreate = async () => {
  if (await formRef.value?.validate()) {
    try {
      await methods.handleCreate(toValue(form));

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
      <ElFormItem label="Press email" prop="email_press">
        <ElInput v-model="form.email_press" />
      </ElFormItem>

      <ElFormItem label="Gallery Email" prop="email_gallery">
        <ElInput v-model="form.email_gallery" />
      </ElFormItem>

      <ElFormItem label="Is active" prop="is_active">
        <ElSwitch v-model="form.is_active" />
      </ElFormItem>

      <ElFormItem>
        <ElButton type="primary" @click="handleCreate"> Create </ElButton>
        <ElButton @click="handleResetForm"> Clear </ElButton>
      </ElFormItem>
    </AdminTemplateForm>
  </AdminTemplateCardWithForm>
</template>
