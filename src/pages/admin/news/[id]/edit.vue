<script lang="ts" setup>
import type { FormRules } from "element-plus";
import { IArticle } from "~/types/admin-api";

definePageMeta({
  validate(route) {
    return /^\d+$/.test(route.params.id as string);
  },
});

const { fetchGet, fetchPatch } = useApi();
const route = useRoute();

const { data: entity } = useAsyncData<IArticle>(
  "news",
  async () => await fetchGet(`/news/${route.params.id}`)
);

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

const fileList = ref<any[]>([]);

const handleUpload = (files: any) => {
  fileList.value = files;
};

const form = reactive({
  title: entity.value?.title ?? "",
  description: entity.value?.description ?? "",
  text: entity.value?.text ?? "",
  is_hot: entity.value?.is_hot,
});

getNews();

function getNews() {
  const { data: entity } = useAsyncData<IArticle>(
    "news",
    async () => await fetchGet(`/news/${route.params.id}`)
  );
  form.title = entity.value?.title || "";
  form.description = entity.value?.description || "";
  form.text = entity.value?.text || "";
  fileList.value = entity.value?.images || [];
}

function onSave() {
  const images = fileList.value.map((item) => ({
    name: item.name,
    url: item.url,
  }));
  const { description, title, text } = form;
  fetchPatch(`/news/${route.params.id}`, {
    text,
    title,
    description,
    is_hot: form.is_hot,
    images,
  });
}
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
          <ElButton type="primary" @click="onSave"> Save </ElButton>
          <ElButton>Delete</ElButton>
        </ElFormItem>
      </ElForm>
    </ClientOnly>
  </ElCard>
</template>
