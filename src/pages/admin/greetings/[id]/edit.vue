<script lang="ts" setup>
import type {
  IGreetingIndex,
  IGreetingIndexTranslate,
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
const uploadPosterRef = ref<InstanceType<typeof AdminUploadFile> | null>(null);
const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null);
const route = useRoute();
const id = Number(route.params.id);

const { greetings, initTranslateLocale, currentIndexLocale } = useAdmin();
const { formRules, navigateBack, titles, methods } = greetings();

const model = await methods.handleGetModel(id);

useHeadSafe({
  title: titles.edit,
});

const form = reactive<IGreetingIndex>({
  ...model,
  translate: initTranslateLocale<IGreetingIndexTranslate>(model.translate),
});

const handleDelete = async () => {
  await methods.handleDelete(id);
  await navigateTo(navigateBack.value);
};

const handleUpdate = async () => {
  if (await formRef.value?.validate()) {
    try {
      const file = await uploadRef.value!.uploadToServer();
      const poster = await uploadPosterRef.value!.uploadToServer();

      await methods.handlePatch(id, {
        ...toValue(form),
        video: file as PartialFileAdminApiDto,
        poster: poster as PartialFileAdminApiDto,
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
      <ElFormItem label="Text" :prop="`translate.${currentIndexLocale}.text`">
        <AdminEditorInput v-model="form.translate[currentIndexLocale].text" />
      </ElFormItem>

      <ElFormItem label="Is active" prop="is_active">
        <ElSwitch v-model="form.is_active" />
      </ElFormItem>

      <ElFormItem required label="Poster" prop="poster">
        <AdminUploadFile
          ref="uploadPosterRef"
          v-model="form.poster"
          file-type="image"
        />
      </ElFormItem>

      <ElFormItem required label="Video" prop="video">
        <AdminUploadFile
          ref="uploadRef"
          v-model="form.video"
          file-type="video"
        />
      </ElFormItem>

      <ElFormItem>
        <ElButton type="primary" @click="handleUpdate"> Update </ElButton>
        <ElButton type="danger" @click="handleDelete"> Delete </ElButton>
      </ElFormItem>
    </AdminTemplateForm>
  </AdminTemplateCardWithForm>
</template>
