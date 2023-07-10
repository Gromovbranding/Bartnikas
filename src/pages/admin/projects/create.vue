<script lang="ts" setup>
import { IProject, PartialAdminApiDto } from "@/types/admin-api";
import { AdminTemplateForm } from "#components";

definePageMeta({
  layout: "admin",
});

const { projects } = useAdmin();
const { titles, formRules, navigateBack, methods } = projects();

useHeadSafe({
  title: titles.create,
});

const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null);

const form = reactive<PartialAdminApiDto<IProject>>({
  title: "",
  description: "",
  collab: {
    collab_with: "",
    description: "",
    press_release: [],
    title: "",
    video: [],
  },
  details: [],
  group: null,
});

const isCollab = ref(false);

const handleResetForm = () => {
  formRef.value?.resetForm();
};

watchEffect(() => {
  if (!isCollab.value) {
    form.collab = null;
  } else {
    form.collab = {};
  }
});

const handleCreate = async () => {
  if (await formRef.value?.validate()) {
    try {
      await methods.handleCreate(toValue(form), {
        fieldFileName: "file",
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
        <ElInput v-model="form.description" />
      </ElFormItem>

      <ElFormItem label="Group" prop="group">
        <ElInput v-model="form.group" />
      </ElFormItem>

      <ElFormItem label="Group" prop="group">
        <ElInput v-model="form.group" />
      </ElFormItem>

      <ElFormItem label="Is Collab ?">
        <ElCheckbox v-model="isCollab" size="large" />
      </ElFormItem>

      <template v-if="isCollab">
        <ElFormItem label="Collab with" prop="collab.collab_with">
          <ElInput v-model="form.collab.collab_with" />
        </ElFormItem>

        <ElFormItem label="Collab Titile" prop="collab.title">
          <ElInput v-model="form.collab.title" />
        </ElFormItem>

        <ElFormItem label="Collab Description" prop="collab.description">
          <ElInput v-model="form.collab.description" />
        </ElFormItem>
      </template>

      <ElFormItem>
        <ElButton type="primary" @click="handleCreate"> Create </ElButton>
        <ElButton @click="handleResetForm"> Clear </ElButton>
      </ElFormItem>
    </AdminTemplateForm>
  </AdminTemplateCardWithForm>
</template>
