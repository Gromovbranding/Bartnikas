<script lang="ts" setup>
import type { FormRules, UploadUserFile } from "element-plus";
import { IArticle, IFile } from "~/types/admin-api";

definePageMeta({
  layout: "admin",
  validate(route) {
    return /^\d+$/.test(route.params.id as string);
  },
});

const { fetchGet, fetchPatch, fetchDelete } = useApi();
const route = useRoute();

const { data: entity, refresh } = await useAsyncData<IArticle>(
  "newsedit",
  async () => await fetchGet(`/news/${route.params.id}`)
);

useHeadSafe({
  title: `Edit article ${entity.value?.title}`,
});

const rules = reactive<FormRules>({
  title: [
    {
      required: true,
      message: "Please input Title",
      trigger: "change",
    },
  ],
  description: [
    {
      required: true,
      message: "Please input Desc",
      trigger: "change",
    },
  ],
  text: [
    {
      required: true,
      message: "Please input Text",
      trigger: "change",
    },
  ],
});

const fileList = ref<IFile[] | UploadUserFile[]>(entity.value?.images ?? []);

const form = reactive({
  title: entity.value?.title ?? "",
  description: entity.value?.description ?? "",
  text: entity.value?.text ?? "",
  is_hot: entity.value?.is_hot,
});

const handleUpload = (files: UploadUserFile[]) => {
  fileList.value = files;
};

const handlePatch = async () => {
  await fetchPatch<IArticle>(`/news/${route.params.id}`, {
    ...form,
    images: fileList.value.map((item) => {
      return {
        name: item.name,
        url: item.url,
      };
    }),
  });

  await refresh();
};

const handleDelete = async () => {
  try {
    await fetchDelete(`/news/${entity.value?.id}`);
    await navigateTo("/admin/news");
  } catch (exc) {
    console.error(exc);
  }
};
</script>

<template>
  <ElCard>
    <template #header>
      <div class="card-header">
        <span> Article: "{{ form.title }}" </span>
        <ElButton type="default" plain @click="navigateTo('/admin/news')">
          Back
        </ElButton>
      </div>
    </template>

    <ClientOnly>
      <ElForm :model="form" :rules="rules" label-width="120px">
        <ElFormItem label="Title" prop="title">
          <ElInput v-model="form.title" />
        </ElFormItem>

        <ElFormItem label="Description" prop="description">
          <ElInput v-model="form.description" :rows="5" type="textarea" />
        </ElFormItem>

        <ElFormItem label="Is Hot" prop="is_hot">
          <ElCheckbox v-model="form.is_hot" size="large" />
        </ElFormItem>

        <ElFormItem label="Text" prop="text">
          <ElInput v-model="form.text" :rows="5" type="textarea" />
        </ElFormItem>

        <ElFormItem required label="Images">
          <AdminUploadImage
            :list="fileList"
            single
            @uploadFile="handleUpload"
          />
        </ElFormItem>

        <ElFormItem>
          <ElButton type="primary" @click="handlePatch"> Save </ElButton>
          <ElButton @click="handleDelete">Delete</ElButton>
        </ElFormItem>
      </ElForm>
    </ClientOnly>
  </ElCard>
</template>
