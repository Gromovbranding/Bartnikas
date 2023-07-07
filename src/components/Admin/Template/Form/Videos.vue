<script lang="ts" setup>
const {
  VideosData: { form },
} = useAdmin();
</script>

<template>
  <ElFormItem label="Title" prop="title">
    <ElInput v-model="form.title" />
  </ElFormItem>
  <ElFormItem required label="Video" prop="video">
    <AdminUploadFile v-model="form.video" file-type="video" />
  </ElFormItem>
</template>
