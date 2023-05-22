<script setup lang="ts">
import { UploadProps, UploadUserFile } from "element-plus";
import { IFile } from "~/types/admin-api";

const { fetchRemoveImage } = useApi();
const { accessToken } = useAdmin();

const props = defineProps<{
  list: UploadProps["fileList"];
  single?: boolean;
}>();

const emit = defineEmits<{
  (e: "uploadFile", files: UploadUserFile[]): void;
}>();

const fileList = ref<UploadUserFile[]>(props.list ?? []);

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  previewImageUrl.value = uploadFile.url!;
  isPreviewImageVisible.value = true;
};

const handleUpload: UploadProps["onSuccess"] = (file) => {
  if (props.single) fileList.value = [file];
};

const handleRemove: UploadProps["onRemove"] = async (file) => {
  return Boolean(await fetchRemoveImage((file.response as IFile).id));
};

const isPreviewImageVisible = ref<boolean>(false);
const previewImageUrl = ref<string>();

watchEffect(() => {
  emit("uploadFile", fileList.value);
});

function onClickDelete(e: Event) {
  const btn = e.target as HTMLButtonElement;
  btn.dispatchEvent(
    new KeyboardEvent("keydown", { key: "backspace", bubbles: true })
  );
}
</script>

<template>
  <div style="width: 100%">
    <ElUpload
      v-model:file-list="fileList"
      action="https://stanislavbartnikas.com:8080/files"
      list-type="picture"
      drag
      :headers="{
        Authorization: `Bearer ${accessToken}`,
      }"
      accept="video/mp4"
      :on-remove="handleRemove"
      :on-preview="handlePictureCardPreview"
      :on-success="handleUpload"
    >
      <ElIcon class="el-icon--upload"><ElIconUploadFilled /></ElIcon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #file="{ file }">
        <video
          class="el-upload-list__item-thumbnail"
          :src="file.url"
          @click="handlePictureCardPreview(file)"
        ></video>
        <div class="file">
          <span class="filename">{{ file.name }}</span>
          <button type="button" @click="onClickDelete">Delete video</button>
        </div>
      </template>
      <template #tip>
        <div>mp4 files</div>
      </template>
    </ElUpload>

    <ElDialog v-model="isPreviewImageVisible">
      <video
        v-if="isPreviewImageVisible"
        class="video"
        :src="previewImageUrl"
        controls
      ></video>
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

.video {
  display: block;
  width: 100%;
}
</style>
