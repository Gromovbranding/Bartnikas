<script lang="ts" setup>
import Editor from '@tinymce/tinymce-vue'
defineProps<{
  modelValue: string;
}>()

defineEmits<{
  (e: 'update:modelValue', data: string): void;
}>()

const tinymceInit = {
  plugins: 'paste',
  paste_as_text: true,
  relative_urls: false,
  remove_script_host: true,
  allow_script_urls: true
}
</script>

<template>
  <Editor
    api-key="dalm256umq1jx74e91oxwk9nbzue0o8ef5fmt4ny68o8lcm7"
    :model-value="modelValue"
    :init="tinymceInit"
    style="width: 100%"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
