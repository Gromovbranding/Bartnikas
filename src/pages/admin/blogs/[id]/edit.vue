<script lang="ts" setup>
import { UploadUserFile } from "element-plus";
import { IBlog } from "~/types/admin-api";

definePageMeta({
  validate(route) {
    return /^\d+$/.test(route.params.id as string);
  },
});

const { fetchGet, fetchPatch } = useApi();
const route = useRoute();

const rules = reactive({
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

const form = reactive({
  title: "",
  description: "",
  text: "",
});

getBlog();

const handleUpload = (files: UploadUserFile[]) => {
  fileList.value = files;
};

function getBlog() {
  const { data: entity } = useAsyncData<IBlog>(
    "blogs",
    async () => await fetchGet(`/blogs/${route.params.id}`)
  );
  form.title = entity.value?.title || "";
  form.description = entity.value?.description || "";
  form.text = entity.value?.text || "";
  fileList.value = entity.value?.images || [];
}

function onSave() {
  const images = fileList.value.map((item) => ({
    name: item.response?.name || item.name,
    url: item.response?.url || item.url,
  }));
  const { description, title, text } = form;
  fetchPatch(`/blogs/${route.params.id}`, {
    text,
    title,
    description,
    images,
  });
}
</script>

<template>
  <ElCard>
    <template #header>
      <div class="card-header">
        <span> Article {{ form.title }} </span>
        <ElButton type="default" plain @click="navigateTo('/admin/blogs')">
          Back
        </ElButton>
      </div>
    </template>

    <ClientOnly>
      <ElForm :model="form" :rules="rules" label-width="120px">
        <ElFormItem required label="Title" prop="title">
          <ElInput v-model="form.title" />
        </ElFormItem>

        <ElFormItem required label="Description" prop="description">
          <ElInput v-model="form.description" :rows="5" type="textarea" />
        </ElFormItem>

        <ElFormItem required label="Text" prop="text">
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
