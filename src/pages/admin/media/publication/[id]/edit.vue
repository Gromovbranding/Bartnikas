<script lang="ts" setup>
import type {
  IMediaPublication,
  PartialFileAdminApiDto,
} from "@/types/admin-api";
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

const { media } = useAdmin();
const { formRules, navigateBack, titles, methods } = media().publication();

const model = await methods.handleGetModel(id);

useHeadSafe({
  title: titles.edit,
});

const form = reactive<IMediaPublication>(model);

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
        <AdminUploadFile ref="uploadRef" v-model="form.image" />
      </ElFormItem>

      <ElFormItem>
        <ElButton type="primary" @click="handleUpdate"> Update </ElButton>
        <ElButton type="danger" @click="handleDelete"> Delete </ElButton>
      </ElFormItem>
    </AdminTemplateForm>
  </AdminTemplateCardWithForm>
</template>
