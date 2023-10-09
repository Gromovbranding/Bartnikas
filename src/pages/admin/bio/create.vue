<script lang="ts" setup>
import {
  IBio,
  PartialAdminApiDto,
  PartialFileAdminApiDto,
} from "@/types/admin-api";
import { AdminTemplateForm, AdminUploadFile } from "#components";

definePageMeta({
  layout: "admin",
});

const { bio } = useAdmin();
const { titles, formRules, navigateBack, methods } = bio();

const uploadRef = ref<InstanceType<typeof AdminUploadFile> | null>(null);
const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null);

useHeadSafe({
  title: titles.create,
});

const form = reactive<PartialAdminApiDto<IBio>>({
  description: "",
  sub_description: "",
  is_active: false,
  awatar: null,
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
        awatar: file as PartialFileAdminApiDto,
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
      <ElFormItem label="Sub description" prop="sub_description">
        <ElInput v-model="form.sub_description" />
      </ElFormItem>
      <ElFormItem label="Description" prop="description">
        <AdminEditorInput v-model="form.description" />
      </ElFormItem>
      <ElFormItem label="Is active" prop="is_active">
        <ElSwitch v-model="form.is_active" />
      </ElFormItem>
      <ElFormItem required label="Awatar Image" prop="awatar">
        <AdminUploadFile ref="uploadRef" v-model="form.awatar" />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="handleCreate"> Create </ElButton>
        <ElButton @click="handleResetForm"> Clear </ElButton>
      </ElFormItem>
    </AdminTemplateForm>
  </AdminTemplateCardWithForm>
</template>
