<script lang="ts" setup>
const {
  VideosData: { form },
} = useAdmin();
</script>

<template>
  <ElFormItem label="Title" prop="title">
    <ElInput v-model="form.title" />
  </ElFormItem>
</template>
