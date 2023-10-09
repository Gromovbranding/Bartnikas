<script lang="ts" setup>
import { ITermsStatic, PartialAdminApiDto } from "@/types/admin-api";
import { AdminTemplateForm } from "#components";

definePageMeta({
  layout: "admin",
});

const { termsStatic } = useAdmin();
const { titles, formRules, navigateBack, methods } = termsStatic();

useHeadSafe({
  title: titles.create,
});

const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null);

const form = reactive<PartialAdminApiDto<ITermsStatic>>({
  title: "",
  description: "",
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
      <ElFormItem label="Title" prop="title">
        <ElInput v-model="form.title" />
      </ElFormItem>
      <ElFormItem label="Description" prop="description">
        <AdminEditorInput v-model="form.description" />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="handleCreate"> Create </ElButton>
        <ElButton @click="handleResetForm"> Clear </ElButton>
      </ElFormItem>
    </AdminTemplateForm>
  </AdminTemplateCardWithForm>
</template>
