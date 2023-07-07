<script lang="ts" setup>
const {
  TestimonialsData: { form },
} = useAdmin();
</script>

<template>
  <ElFormItem label="Title" prop="title">
    <ElInput v-model="form.title" />
  </ElFormItem>
  <ElFormItem
    label="Additional information"
    label-width="auto"
    prop="additional_info"
  >
    <ElInput v-model="form.additional_info" :rows="5" type="textarea" />
  </ElFormItem>
  <ElFormItem required label="Video" prop="file">
    <AdminUploadFile v-model="form.file" file-type="video" />
  </ElFormItem>
</template>
