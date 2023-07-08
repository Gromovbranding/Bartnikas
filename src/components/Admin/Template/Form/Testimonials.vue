<script lang="ts" setup>
const {
  TestimonialsData: { form },
} = useAdmin();

const onUrlChange = (e) => {
  if (!e) form.value.url = null;
};
</script>

<template>
  <ElFormItem label="Title" prop="title" label-width="5rem">
    <ElInput v-model="form.title" />
  </ElFormItem>
  <ElFormItem
    label="Additional information"
    label-width="5rem"
    prop="additional_info"
  >
    <ElInput v-model="form.additional_info" :rows="5" type="textarea" />
  </ElFormItem>
  <ElFormItem label="Youtube url" prop="url" label-width="5rem">
    <ElInput v-model="form.url" @change="onUrlChange" />
  </ElFormItem>
  <ElFormItem label="Video" prop="file" label-width="5rem">
    <AdminUploadFile v-model="form.file" file-type="video" />
  </ElFormItem>
</template>
