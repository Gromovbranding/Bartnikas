<script lang="ts" setup>
import { IBioTestimonials, PartialFileAdminApiDto } from "@/types/admin-api";
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

const { bioTestimonials } = useAdmin();
const { formRules, navigateBack, titles, methods } = bioTestimonials();

const model = await methods.handleGetModel(id);

useHeadSafe({
  title: titles.edit,
});

const form = reactive<IBioTestimonials>(model);

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
        photo: file as PartialFileAdminApiDto,
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
      <ElFormItem label="Name" prop="name">
        <ElInput v-model="form.name" />
      </ElFormItem>
      <ElFormItem label="Job" prop="job">
        <ElInput v-model="form.job" />
      </ElFormItem>
      <ElFormItem label="Testimonial" prop="testimonial">
        <ElInput v-model="form.testimonial" :rows="5" type="textarea" />
      </ElFormItem>
      <ElFormItem required label="Photo" prop="photo">
        <AdminUploadFile ref="uploadRef" v-model="form.photo" />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="handleUpdate"> Update </ElButton>
        <ElButton type="danger" @click="handleDelete"> Delete </ElButton>
      </ElFormItem>
    </AdminTemplateForm>
  </AdminTemplateCardWithForm>
</template>
