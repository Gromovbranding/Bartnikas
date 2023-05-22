<script lang="ts" setup>
import { UploadUserFile } from "element-plus";
import { IBlog, IFile } from "~/types/admin-api";

definePageMeta({
  validate(route) {
    return /^\d+$/.test(route.params.id as string);
  },
});

const { fetchGet, fetchPatch } = useApi();
const route = useRoute();

const { data: entity } = await useAsyncData<IBlog>(
  "blog",
  async () => await fetchGet(`/blogs/${route.params.id}`)
);

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

const fileList = ref<(IFile | UploadUserFile)[]>(entity.value?.images ?? []);

const form = reactive({
  title: entity.value?.title ?? "",
  description: entity.value?.description ?? "",
  text: entity.value?.text ?? "",
});

const handleUpload = (files: UploadUserFile[]) => {
  fileList.value = files;
};

const handlePatch = async () => {
  const images = fileList.value.map((item) => ({
    name: item.response?.name ?? item.name,
  }));

  await fetchPatch(`/blogs/${route.params.id}`, {
    ...form,
    images,
  });
};
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
          <ElButton type="primary" @click="handlePatch"> Save </ElButton>
          <ElButton>Delete</ElButton>
        </ElFormItem>
      </ElForm>
    </ClientOnly>
  </ElCard>
</template>
