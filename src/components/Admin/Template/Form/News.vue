<script lang="ts" setup>
const {
  NewsData: { form },
} = useAdmin();
</script>

<template>
  <ElFormItem label="Title" prop="title">
    <ElInput v-model="form.title" />
  </ElFormItem>
  <ElFormItem label="Article is hot" prop="is_hot">
    <ElSwitch v-model="form.is_hot" />
  </ElFormItem>
  <ElFormItem label="Description" prop="description">
    <ElInput v-model="form.description" :rows="5" type="textarea" />
  </ElFormItem>
  <ElFormItem label="Text" prop="text">
    <ElInput v-model="form.text" :rows="5" type="textarea" />
  </ElFormItem>
  <ElFormItem label="Article Images" prop="image">
    <AdminUploadFile v-model="form.image" />
  </ElFormItem>
</template>
