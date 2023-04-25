<script lang="ts" setup>
import type { FormRules, UploadUserFile } from "element-plus";

definePageMeta({
  validate(route) {
    return /^\d+$/.test(route.params.id as string);
  },
});

const { fetchGet } = useApi();
const route = useRoute();

const { data: entity } = useAsyncData(
  "entity",
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
  is_hot: [
    {
      trigger: "change",
    },
  ],
});

const fileList = ref<UploadUserFile[]>(entity.value?.images ?? []);

const form = reactive({
  title: entity.value?.title ?? "",
  desc: entity.value?.desc ?? "",
  text: entity.value?.text ?? "",
});
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

        <ElFormItem label="Description" prop="desc">
          <ElInput v-model="form.desc" :rows="5" type="textarea" />
        </ElFormItem>

        <ElFormItem label="Text" prop="text">
          <ElInput v-model="form.text" :rows="5" type="textarea" />
        </ElFormItem>

        <ElFormItem required label="Images">
          <AdminUploadImage v-model="fileList" />
        </ElFormItem>

        <ElFormItem>
          <ElButton type="primary"> Save </ElButton>
          <ElButton>Delete</ElButton>
        </ElFormItem>
      </ElForm>
    </ClientOnly>
  </ElCard>
</template>
