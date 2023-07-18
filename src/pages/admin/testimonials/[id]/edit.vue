<script lang="ts" setup>
import { ITestimonial } from "@/types/admin-api";
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

const { testimonials } = useAdmin();
const { formRules, navigateBack, titles, methods } = testimonials();

const model = await methods.handleGetModel(id);

useHeadSafe({
  title: titles.edit,
});

const form = reactive<ITestimonial>(model);

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
        file: file || null,
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
      <ElFormItem label="Url for video from Youtube" prop="url">
        <ElInput v-model="form.url" />
      </ElFormItem>
      <ElFormItem label="Additional Info" prop="additional_info">
        <ElInput v-model="form.additional_info" :rows="5" type="textarea" />
      </ElFormItem>
      <ElFormItem required label="Testimonial video" prop="file">
        <AdminUploadFile v-model="form.file" file-type="video" />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="handleUpdate"> Update </ElButton>
        <ElButton type="danger" @click="handleDelete"> Delete </ElButton>
      </ElFormItem>
    </AdminTemplateForm>
  </AdminTemplateCardWithForm>
</template>
