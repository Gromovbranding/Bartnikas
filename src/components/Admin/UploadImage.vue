<script setup lang="ts">
import { UploadProps, UploadUserFile } from "element-plus";

const props = defineProps<{
  list: UploadProps["fileList"];
}>();

const emit = defineEmits<{
  (e: "uploadFile", files: UploadUserFile[]): void;
}>();

const fileList = ref<UploadUserFile[]>([]);

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  previewImageUrl.value = uploadFile.url!;
  isPreviewImageVisible.value = true;
};

onBeforeMount(() => {
  fileList.value = props.list;
});

const isPreviewImageVisible = ref<boolean>(false);
const previewImageUrl = ref<string>();

watchEffect(() => {
  emit("uploadFile", fileList.value);
});
</script>

<template>
  <div style="width: 100%">
    <ElUpload
      v-model:file-list="fileList"
      list-type="picture"
      drag
      accept="image/png, image/jpeg, image/jpg"
      :auto-upload="false"
      :on-preview="handlePictureCardPreview"
    >
      <ElIcon class="el-icon--upload"><ElIconUploadFilled /></ElIcon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div>jpg/jpeg/png files with a size less than 500kb</div>
      </template>
    </ElUpload>

    <ElDialog v-model="isPreviewImageVisible">
      <ElImage :src="previewImageUrl" alt="Preview Image" />
    </ElDialog>
  </div>
</template>
