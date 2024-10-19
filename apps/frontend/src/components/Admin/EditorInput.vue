<script lang="ts" setup>
import Editor from '@tinymce/tinymce-vue'
defineProps<{
  modelValue: string;
}>()

defineEmits<{
  (e: 'update:modelValue', data: string): void;
}>()

const tinymceInit = {
  toolbar_mode: 'sliding',
  plugins: [
    // Core editing features
    'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
    // Your account includes a free trial of TinyMCE premium features
    // Try the most popular premium features until Nov 2, 2024:
    'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown'
  ],
  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat'
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
