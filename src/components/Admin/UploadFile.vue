<script setup lang="ts">
import { UploadProps, UploadUserFile } from "element-plus";

const props = withDefaults(
  defineProps<{
    modelValue: UploadProps["fileList"];
    fileType?: "image" | "files" | "video";
    single?: boolean;
  }>(),
  {
    modelValue: () => [],
    single: true,
    fileType: "image",
  }
);

const emits = defineEmits<{
  (e: "update:modelValue", files: UploadUserFile[]): void;
}>();

const fileList = ref<UploadUserFile[]>(
  Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]
);

watchEffect(() => {
  emits("update:modelValue", fileList.value);
});

const handleBeforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (!props.single) {
    return rawFile;
  }

  return fileList.value.length === 0;
};

const fileTypes = computed(() => {
  let types = ["image/jpeg", "image/png", "image/jpg"];

  if (props.fileType === "files") {
    types = ["image/pdf"];
  } else if (props.fileType === "video") {
    types = ["video/*"];
  }

  return types.join(", ");
});
</script>

<template>
  <div style="width: 100%">
    <ElUpload
      v-model:file-list="fileList"
      action="#"
      drag
      :list-type="fileType === 'image' ? 'picture' : 'text'"
      :accept="fileTypes"
      :before-upload="handleBeforeUpload"
    >
      <ElIcon class="el-icon--upload"><ElIconUploadFilled /></ElIcon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>

      <template #tip>
        <div class="el-upload__tip">
          {{ fileTypes }} files with a size less than 500kb
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
