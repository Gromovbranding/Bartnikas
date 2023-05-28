<script setup lang="ts">
import { UploadProps, UploadUserFile } from "element-plus";

const { fetchRemoveImage } = useApi();
const { accessToken } = useAdmin();

const props = defineProps<{
  list: UploadProps["fileList"];
  single?: boolean;
  filetype: string;
}>();

const emit = defineEmits<{
  (e: "uploadFile", files: UploadUserFile[]): void;
}>();

const fileList = ref<UploadUserFile[]>(props.list ?? []);

// const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
//   previewImageUrl.value = uploadFile.url!;
//   isPreviewImageVisible.value = true;
// };

const handleRemove: UploadProps["onRemove"] = async (file) => {
  if (file.id) await fetchRemoveImage(file.id);
};

const handleUpload: UploadProps["onSuccess"] = (file) => {
  if (props.single) fileList.value = [file];
};

const isPreviewImageVisible = ref<boolean>(false);
const previewImageUrl = ref<string>();

watchEffect(() => {
  emit("uploadFile", fileList.value);
});

// function onClickDelete(e: Event) {
//   const btn = e.target as HTMLButtonElement;
//   btn.dispatchEvent(
//     new KeyboardEvent("keydown", { key: "backspace", bubbles: true })
//   );
// }
</script>

<template>
  <div style="width: 100%">
    <ElUpload
      v-model:file-list="fileList"
      action="https://stanislavbartnikas.com:8080/files"
      list-type="text"
      drag
      :headers="{
        Authorization: `Bearer ${accessToken}`,
      }"
      :accept="'.' + filetype"
      :on-remove="handleRemove"
      :on-success="handleUpload"
    >
      <ElIcon class="el-icon--upload"><ElIconUploadFilled /></ElIcon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <!-- <template #file="{ file }">
        <div class="file">
          <span class="filename">{{ file.name }}</span>
          <button type="button" @click="onClickDelete">Delete file</button>
        </div>
      </template> -->

      <template #tip>
        <div>{{ filetype }} files</div>
      </template>
    </ElUpload>

    <ElDialog v-model="isPreviewImageVisible">
      <ElImage :src="previewImageUrl" alt="Preview Image" />
    </ElDialog>
  </div>
</template>

<style scoped lang="scss">
.file {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  margin-left: 1rem;
  button {
    padding-inline: 0.5rem;
  }
}
</style>
