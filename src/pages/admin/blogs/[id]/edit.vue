<script lang="ts" setup>
import { IBlog } from "~/types/admin-api";

definePageMeta({
  validate(route) {
    return /^\d+$/.test(route.params.id as string);
  },
});

const { fetchGet, fetchGetImages } = useApi();
const route = useRoute();

const { data: entity } = useAsyncData<IBlog>(
  "entity",
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
  desc: [
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

const fileList = ref(await fetchGetImages(entity.value?.images ?? []));

const form = reactive({
  title: entity.value?.title ?? "",
  description: entity.value?.description ?? "",
  text: entity.value?.text ?? "",
});
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

        <ElFormItem required label="Description" prop="desc">
          <ElInput v-model="form.description" :rows="5" type="textarea" />
        </ElFormItem>

        <ElFormItem required label="Text" prop="text">
          <ElInput v-model="form.text" :rows="5" type="textarea" />
        </ElFormItem>

        <ElFormItem required label="Images">
          <AdminUploadImage :list="fileList" />
        </ElFormItem>

        <ElFormItem>
          <ElButton type="primary"> Save </ElButton>
          <ElButton>Delete</ElButton>
        </ElFormItem>
      </ElForm>
    </ClientOnly>
  </ElCard>
</template>
