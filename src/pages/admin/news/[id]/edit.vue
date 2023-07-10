<script lang="ts" setup>
import { IArticle, PartialAdminApiDto } from "@/types/admin-api";
import { AdminTemplateForm } from "#components";

definePageMeta({
  layout: "admin",
  validate(route) {
    return /^\d+$/.test(route.params.id as string);
  },
});

const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null);

const route = useRoute();
const id = Number(route.params.id);

const { news } = useAdmin();
const { formRules, navigateBack, titles, methods } = news();

const model = await methods.handleGetModel(id);

useHeadSafe({
  title: titles.edit,
});

const form = reactive<PartialAdminApiDto<IArticle>>({
  title: model.title ?? "",
  is_hot: model.is_hot ?? false,
  description: model.description ?? "",
  text: model.text ?? "",
  image: model.image ? [model.image] : [],
});

const handleUpdate = async () => {
  if (await formRef.value?.validate()) {
    try {
      await methods.handlePatch(id, toValue(form));

      await refreshNuxtData();

      await navigateTo(navigateBack.value);
    } catch (exc) {
      console.error(exc);
    }
  }
};
</script>

<template>
  <AdminTemplateCardWithForm :title="title" :navigate-back="navigateBack">
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
        <AdminUploadFile v-model="form.image" />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="handleUpdate"> Update </ElButton>
        <ElButton type="danger" @click="handleDelete"> Delete </ElButton>
      </ElFormItem>
    </AdminTemplateForm>
  </AdminTemplateCardWithForm>
</template>
