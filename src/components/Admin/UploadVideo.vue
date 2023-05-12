<script setup lang="ts">
import { UploadProps, UploadUserFile } from "element-plus";
import { IFile } from "~/types/admin-api";

const { fetchRemoveImage } = useApi();
const { accessToken } = useAdmin();

const props = defineProps<{
  list: UploadProps["fileList"];
}>();

const emit = defineEmits<{
  (e: "uploadFile", files: UploadUserFile[]): void;
}>();

const fileList = ref<UploadUserFile[]>(props.list ?? []);

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  previewImageUrl.value = uploadFile.url!;
  isPreviewImageVisible.value = true;
};

const handleRemove: UploadProps["onRemove"] = async (file) => {
  return Boolean(await fetchRemoveImage((file.response as IFile).id));
};

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
      action="http://localhost:8080/files"
      list-type="picture"
      drag
      :headers="{
        Authorization: `Bearer ${accessToken}`,
      }"
      accept="video/mp4"
      :on-remove="handleRemove"
      :on-preview="handlePictureCardPreview"
    >
      <ElIcon class="el-icon--upload"><ElIconUploadFilled /></ElIcon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #file="{ file }">
        <video class="el-upload-list__item-thumbnail" :src="file.url"></video>
        <span class="filename">{{ file.name }}</span>
      </template>
      <template #tip>
        <div>mp4 files</div>
      </template>
    </ElUpload>

    <ElDialog v-model="isPreviewImageVisible">
      <ElImage :src="previewImageUrl" alt="Preview Image" />
    </ElDialog>
  </div>
</template>

<style scoped lang="scss">
.filename {
  margin-left: 1rem;
}
</style>
