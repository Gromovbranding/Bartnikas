<script lang="ts" setup>
import { IProject, IProjectPressRelease } from "@/types/admin-api";
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

const { projects } = useAdmin();
const { formRules, navigateBack, titles, methods } = projects();

const model = await methods.handleGetModel(id);

useHeadSafe({
  title: titles.edit,
});

const form = reactive<IProject>(model);

const formReleases = ref<IProjectPressRelease[]>(
  form.collab?.press_release ?? []
);

const isCollab = ref(false);

const addPressRelease = () => {
  formReleases.value.push({
    title: "",
    text: "",
    file: null,
    id: Date.now(),
  });
};

const removePressRelease = (pressRelease: IProjectPressRelease) => {
  formReleases.value = formReleases.value.filter(
    (item) => item.id !== pressRelease.id
  );
};

const handleDelete = async () => {
  await methods.handleDelete(id);
  await navigateTo(navigateBack.value);
};

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
  <AdminTemplateCardWithForm :title="titles.edit" :navigate-back="navigateBack">
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

      <ElFormItem label="Is Collab ?">
        <ElCheckbox v-model="isCollab" size="large" />
      </ElFormItem>

      <template v-if="isCollab">
        <ElFormItem>
          <h2>Collab</h2>
        </ElFormItem>

        <ElFormItem label="Collab with" prop="collab.collab_with">
          <ElInput v-model="form.collab.collab_with" />
        </ElFormItem>

        <ElFormItem label="Collab Titile" prop="collab.title">
          <ElInput v-model="form.collab.title" />
        </ElFormItem>

        <ElFormItem label="Collab Description" prop="collab.description">
          <ElInput v-model="form.collab.description" />
        </ElFormItem>

        <ElFormItem required label="Video" prop="video">
          <AdminUploadFile v-model="form.collab.video" file-type="video" />
        </ElFormItem>

        <ElFormItem>
          <h2>Press Releases</h2>
        </ElFormItem>
        <template
          v-for="(press_release, idx) in formReleases"
          :key="press_release.id"
        >
          <ElFormItem>
            <h2>Press release {{ idx }}</h2>
            <ElButton type="danger" @click="removePressRelease(press_release)">
              <ElIcon>
                <ElIconDelete />
              </ElIcon>
            </ElButton>
          </ElFormItem>

          <ElFormItem
            label="Title"
            :prop="`collab.press_realease.${idx}.title`"
            :rules="{
              required: true,
              message: 'Title is required',
              trigger: 'blur',
            }"
          >
            <ElInput v-model="press_release.title" />
          </ElFormItem>

          <ElFormItem
            label="Text"
            :prop="`collab.press_realease.${idx}.text`"
            :rules="{
              required: true,
              message: 'Text  is required',
              trigger: 'blur',
            }"
          >
            <ElInput v-model="press_release.text" />
          </ElFormItem>

          <ElFormItem
            :rules="{
              required: true,
              message: 'File is required',
              trigger: 'change',
            }"
            label="File"
            :prop="`collab.press_realease.${idx}.file`"
          >
            <AdminUploadFile v-model="press_release.file" file-type="files" />
          </ElFormItem>
        </template>

        <ElFormItem>
          <ElButton type="default" @click="addPressRelease">
            Add press release
          </ElButton>
        </ElFormItem>
      </template>

      <ElFormItem>
        <ElButton type="primary" @click="handleUpdate"> Update </ElButton>
        <ElButton type="danger" @click="handleDelete"> Delete </ElButton>
      </ElFormItem>
    </AdminTemplateForm>
  </AdminTemplateCardWithForm>
</template>
