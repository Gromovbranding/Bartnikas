<script lang="ts" setup>
const {
  ProjectsData: { form },
} = useAdmin();
</script>

<template>
  <ElFormItem label="Title" prop="title">
    <ElInput v-model="form.title" />
  </ElFormItem>
  <ElFormItem label="Group" prop="group">
    <ElInput v-model="form.group" />
  </ElFormItem>
  <ElFormItem label="Description" prop="description">
    <ElInput v-model="form.description" />
  </ElFormItem>
</template>
