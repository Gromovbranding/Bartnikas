<script lang="ts" setup>
const {
  GreetingsData: { form },
} = useAdmin();
</script>

<template>
  <ElFormItem label="Text" prop="text">
    <ElInput v-model="form.text" type="textarea" />
  </ElFormItem>
  <ElFormItem label="Greetings is active" :label-width="150" prop="is_active">
    <ElSwitch v-model="form.is_active" />
  </ElFormItem>
  <ElFormItem required label="Video" prop="video">
    <AdminUploadFile v-model="form.video" file-type="video" />
  </ElFormItem>
</template>
