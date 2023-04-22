<script setup lang="ts">
import { UploadProps, UploadUserFile } from "element-plus";

defineProps<{
  modelValue: UploadProps["fileList"];
}>();

defineEmits<{
  "update:modeValue": () => UploadUserFile;
}>();

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  previewImageUrl.value = uploadFile.url!;
  isPreviewImageVisible.value = true;
};

const isPreviewImageVisible = ref<boolean>(false);
const previewImageUrl = ref<string | null>(null);
</script>

<template>
  <div style="width: 100%">
    <ElUpload
      :file-list="modelValue"
      list-type="picture"
      drag
      accept="image/png, image/jpeg, image/jpg"
      :auto-upload="false"
      :on-preview="handlePictureCardPreview"
      @change="$emit('update:modeValue', $event)"
    >
      <ElIcon class="el-icon--upload"><ElIconUploadFilled /></ElIcon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div>jpg/png files with a size less than 500kb</div>
      </template>
    </ElUpload>

    <ElDialog v-model="isPreviewImageVisible">
      <ElImage :src="previewImageUrl" alt="Preview Image" />
    </ElDialog>
  </div>
</template>
