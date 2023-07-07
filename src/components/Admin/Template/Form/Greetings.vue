<script lang="ts" setup>
const {
  GreetingsData: { form },
} = useAdmin();
</script>

<template>
  <ElFormItem label="Text" prop="text">
    <ElInput v-model="form.text" />
  </ElFormItem>
  <ElFormItem label="Greetings is active" :label-width="150" prop="is_active">
    <ElSwitch v-model="form.is_active" />
  </ElFormItem>
</template>
