<script setup lang="ts">
import type { FormInstance, FormProps } from "element-plus";

defineProps<{
  rules: FormProps["rules"];
  model: FormProps["model"];
}>();

const form = ref<FormInstance | null>(null);

defineExpose({
  async validate() {
    if (!form.value) {
      return false;
    }

    return await form.value?.validate();
  },

  resetForm() {
    if (!form.value) {
      return false;
    }

    return form.value?.resetFields();
  },
});
</script>

<template>
  <ElForm
    ref="form"
    status-icon
    scroll-to-error
    label-width="160px"
    :model="model"
    :rules="rules"
  >
    <slot></slot>
  </ElForm>
</template>
