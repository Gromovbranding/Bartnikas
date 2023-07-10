<script lang="ts" setup>
import { FormInstance, FormRules } from "element-plus";
import { IArticle, PartialAdminApiDto } from "types/admin-api";

definePageMeta({
  layout: "admin",
});

const { createByData, validateForm, resetForm, createTitle } = useAdmin();
const title = ref(createTitle("create", "article"));

useHeadSafe({
  title: title.value,
});

type RecordModel = PartialAdminApiDto<IArticle>;

const formRef = ref<FormInstance>();

const form = reactive<RecordModel>({
  title: "",
  is_hot: false,
  description: "",
  text: "",
  image: [],
});

const formRules = ref<FormRules>({
  title: [{ required: true, message: "Field is required", trigger: "blur" }],
  description: [
    { required: true, message: "Field is required", trigger: "blur" },
  ],
  text: [{ required: true, message: "Field is required", trigger: "blur" }],
});

const handleCreate = async () => {
  if (await validateForm(formRef.value)) {
    try {
      await createByData<RecordModel, IArticle>(toValue(form), "news");

      await refreshNuxtData();

      await navigateTo("/admin/news");
    } catch (exc) {
      console.error(exc);
    }
  }
};
</script>

<template>
  <AdminTemplateCardWithForm :title="title" navigate-back="news">
    <ElForm
      ref="formRef"
      status-icon
      scroll-to-error
      label-width="120px"
      :model="form"
      :rules="formRules"
    >
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
        <ElButton type="primary" @click="handleCreate"> Create </ElButton>
        <ElButton @click="resetForm(formRef)"> Clear </ElButton>
      </ElFormItem>
    </ElForm>
  </AdminTemplateCardWithForm>
</template>
