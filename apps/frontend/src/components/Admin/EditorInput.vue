<script lang="ts" setup>
import Editor from '@tinymce/tinymce-vue'
defineProps<{
  modelValue: string;
}>()

defineEmits<{
  (e: 'update:modelValue', data: string): void;
}>()
</script>

<template>
  <Editor
    :model-value="modelValue"
    style="width: 100%"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
