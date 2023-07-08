<script setup lang="ts">
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
    pdf: lists.files[0],
    image: lists.images[0],
  });
  props.refresh();
};
</script>

<template>
  <ElForm ref="formRef" status-icon label-width="120px">
    <h1>Media Kit</h1>
    <ElFormItem required label="File">
      <AdminUploadFile v-model="lists.files" file-type="files" />
    </ElFormItem>
    <ElFormItem required label="Image">
      <AdminUploadFile v-model="lists.images" file-type="image" />
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" :disabled="isDisabled" @click="handleCreate">
        Create
      </ElButton>
    </ElFormItem>
  </ElForm>
</template>
