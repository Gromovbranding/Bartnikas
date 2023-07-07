<script lang="ts" setup>
const {
  BlogsData: { form },
} = useAdmin();
</script>

<template>
  <ElFormItem label="Title" prop="title">
    <ElInput v-model="form.title" />
  </ElFormItem>
  <ElFormItem label="Description" prop="description">
    <ElInput v-model="form.description" :rows="5" type="textarea" />
  </ElFormItem>
  <ElFormItem label="Text" prop="text">
    <ElInput v-model="form.text" :rows="5" type="textarea" />
  </ElFormItem>
</template>
