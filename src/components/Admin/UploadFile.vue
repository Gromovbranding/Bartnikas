<script setup lang="ts">
import { UploadInstance, UploadUserFile } from "element-plus";
import { PartialFileAdminApiDto } from "@/types/admin-api";

const { apiFilesUrl } = useRuntimeConfig().public;
const { fetchPost } = useApi();

const props = withDefaults(
  defineProps<{
    modelValue: UploadUserFile | UploadUserFile[] | null;
    fileType?: "image" | "files" | "video";
    single?: boolean;
  }>(),
  {
    modelValue: null,
    single: true,
    fileType: "image",
  }
);

const emits = defineEmits<{
  (e: "update:modelValue", files: UploadUserFile[] | UploadUserFile): void;
}>();

const fileList = ref<UploadUserFile[]>(
  Array.isArray(props.modelValue)
    ? props.modelValue
    : props.modelValue === null
    ? []
    : [props.modelValue].filter((item) => !!item)
);

const handleConvertFileList = computed(() => {
  if (props.single) {
    return fileList.value[0];
  }

  return fileList.value;
});

watchEffect(() => {
  emits("update:modelValue", handleConvertFileList.value);
});

const fileTypes = computed(() => {
  let types = [".jpeg", ".png", ".jpg"];

  if (props.fileType === "files") {
    types = [".pdf"];
  } else if (props.fileType === "video") {
    types = ["video/*"];
  }

  return types.join(", ");
});

const messageFileTypes = computed(() => {
  if (props.fileType === "video") {
    return "Any video format";
  }

  return fileTypes.value;
});

const uploadRef = ref<UploadInstance>();

defineExpose({
  async uploadToServer(file?: any) {
    const formData = new FormData();
    if (file) {
      formData.append("file", file.raw as File | Blob);
      if (file.edit)
        return {
          uid: file.uid,
          name: file.image.name,
        };
      const res = await fetchPost<PartialFileAdminApiDto>("files", formData);
      return {
        uid: file.uid,
        name: res.name,
      };
    }

    if (props.single) {
      if (handleConvertFileList.value.status === "success") {
        return handleConvertFileList.value;
      }

      formData.append("file", handleConvertFileList.value.raw as File | Blob);

      return await fetchPost<PartialFileAdminApiDto>("files", formData);
    }

    const uploadedFiles: PartialFileAdminApiDto[] = [];

    handleConvertFileList.value.forEach((item) => {
      if (item.status === "ready") {
        formData.append("files[]", item.raw as File | Blob);
      } else if (item.status === "success") {
        uploadedFiles.push(item);
      }
    });

    return [
      ...(await fetchPost<PartialFileAdminApiDto[]>(
        "files/multiple",
        formData
      )),
      ...uploadedFiles,
    ];
  },
});
</script>

<template>
  <div style="width: 100%">
    <ElUpload
      ref="uploadRef"
      v-model:file-list="fileList"
      drag
      :limit="single ? 1 : 20"
      :action="apiFilesUrl"
      :list-type="fileType === 'image' ? 'picture' : 'text'"
      :accept="fileTypes"
      :auto-upload="false"
    >
      <ElIcon class="el-icon--upload"><ElIconUploadFilled /></ElIcon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #file="{ file }">
        <slot :file="file"></slot>
      </template>

      <template #tip>
        <div class="el-upload__tip">
          {{ messageFileTypes }} files with a size less than 500kb
        </div>
      </template>
    </ElUpload>
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
