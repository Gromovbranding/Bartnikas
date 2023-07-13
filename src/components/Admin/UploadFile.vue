<script setup lang="ts">
import { UploadInstance, UploadUserFile } from "element-plus";
import { PartialFileAdminApiDto } from "types/admin-api";

const { apiFilesUrl } = useRuntimeConfig().public;
const { accessToken } = useAdmin();

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
  (
    e: "update:modelValue",
    files: UploadUserFile[] | UploadUserFile | PartialFileAdminApiDto
  ): void;
}>();

const fileList = ref<UploadUserFile[]>(
  Array.isArray(props.modelValue)
    ? props.modelValue
    : props.modelValue === null
    ? []
    : [props.modelValue].filter((item) => !!item)
);

watchEffect(() => {
  if (props.single) {
    emits(
      "update:modelValue",
      (fileList.value[0]?.response as PartialFileAdminApiDto) ??
        fileList.value[0]
    );
  } else {
    const data = fileList.value.map(
      (item) => (item?.response as PartialFileAdminApiDto) ?? item
    );

    emits("update:modelValue", data);
  }
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
  async uploadToServer() {
    await uploadRef.value!.submit();
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
      :headers="{
        Authorization: `Bearer ${accessToken}`,
      }"
      :action="apiFilesUrl"
      :name="single ? 'file' : 'files'"
      :list-type="fileType === 'image' ? 'picture' : 'text'"
      :accept="fileTypes"
      :auto-upload="false"
    >
      <ElIcon class="el-icon--upload"><ElIconUploadFilled /></ElIcon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>

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
