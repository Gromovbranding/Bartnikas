<script setup lang="ts">
import { UploadUserFile } from "element-plus";

const { fetchPost } = useApi();

const props = defineProps<{
  refresh: Function;
}>();

const lists = reactive({
  files: [] as any[],
  images: [] as any[],
});
const isDisabled = computed(
  () => !(!!lists.files.length && !!lists.images.length)
);

const handleCreate = async () => {
  await fetchPost("/media/kit", {
    pdf: lists.files[0].response,
    image: lists.images[0].response,
  });
  props.refresh();
};

const handleUpload = (files: UploadUserFile[], field: string) => {
  lists[field] = files;
};
</script>

<template>
  <ElForm ref="formRef" status-icon label-width="120px">
    <h1>Media Kit</h1>
    <ElFormItem required label="File">
      <AdminUploadFile
        filetype="pdf"
        :list="lists.files"
        @uploadFile="handleUpload($event, 'files')"
      />
    </ElFormItem>
    <ElFormItem required label="Image">
      <AdminUploadImage
        :list="lists.images"
        @uploadFile="handleUpload($event, 'images')"
      />
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" :disabled="isDisabled" @click="handleCreate">
        Create
      </ElButton>
    </ElFormItem>
  </ElForm>
</template>
