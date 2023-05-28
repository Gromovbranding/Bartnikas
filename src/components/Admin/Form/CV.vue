<script setup lang="ts">
import { UploadUserFile } from "element-plus";

const { fetchPost } = useApi();

const props = defineProps<{
  refresh: Function;
}>();

const images = ref<any[]>([]);
const isDisabled = computed(() => !images.value.length);

const handleCreate = async () => {
  await fetchPost("/media/cv", {
    images: images.value.map((img) => img.response),
  });
  props.refresh();
  images.value = [];
};

const handleUpload = (files: UploadUserFile[]) => {
  images.value = files;
};
</script>

<template>
  <ElForm ref="formRef" status-icon label-width="120px">
    <h1>CV</h1>
    <ElFormItem required label="Images">
      <AdminUploadImage :list="images" @uploadFile="handleUpload" />
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" :disabled="isDisabled" @click="handleCreate">
        Create
      </ElButton>
    </ElFormItem>
  </ElForm>
</template>
