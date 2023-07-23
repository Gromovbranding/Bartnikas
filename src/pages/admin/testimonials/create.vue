<script lang="ts" setup>
import { ITestimonial, PartialAdminApiDto } from "@/types/admin-api";
import { AdminTemplateForm, AdminUploadFile } from "#components";

definePageMeta({
  layout: "admin",
});

const { testimonials } = useAdmin();
const { titles, formRules, navigateBack, methods } = testimonials();

useHeadSafe({
  title: titles.create,
});

const uploadRef = ref<InstanceType<typeof AdminUploadFile> | null>(null);
const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null);

const form = reactive<PartialAdminApiDto<ITestimonial>>({
  title: "",
  additional_info: "",
  url: null,
  file: null,
});

const handleResetForm = () => {
  formRef.value?.resetForm();
};

const handleCreate = async () => {
  if (await formRef.value?.validate()) {
    try {
      let file = null;
      let url = null;

      if (form.file) {
        file = await uploadRef.value!.uploadToServer();
      } else {
        url = form.url;
      }

      await methods.handleCreate({
        ...toValue(form),
        url,
        file,
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
      <ElFormItem label="URL Youtube" prop="url">
        <ElInput v-model="form.url" />
      </ElFormItem>
      <ElFormItem label="Additional Info" prop="additional_info">
        <ElInput v-model="form.additional_info" :rows="5" type="textarea" />
      </ElFormItem>
      <ElFormItem label="Testimonial video" prop="file">
        <AdminUploadFile
          ref="uploadRef"
          v-model="form.file"
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
