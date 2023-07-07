<script lang="ts" setup>
const {
  AwardsData: { form },
} = useAdmin();
</script>

<template>
  <ElFormItem label="Title" prop="title">
    <ElInput v-model="form.title" />
  </ElFormItem>
  <ElFormItem label="Description" prop="description">
    <ElInput v-model="form.description" :rows="5" type="textarea" />
  </ElFormItem>
</template>
