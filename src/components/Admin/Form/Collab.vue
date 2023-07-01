<script setup lang="ts">
import { UploadUserFile } from "element-plus";
import { IProjectCollab } from "~/types/admin-api";

interface PressReleaseCreate {
  title: string;
  text: string;
  file: {
    name: string;
  };
}

interface CollabCreate
  extends Omit<
    IProjectCollab,
    "created_at" | "id" | "updated_at" | "video" | "press_release"
  > {
  video: {
    name: string;
  };
  press_release: PressReleaseCreate[];
}

const props = defineProps<{
  modelValue: CollabCreate;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", val: CollabCreate): void;
}>();

const videoList = ref<any[]>([]);
const fileList = ref<any[]>([]);

const collab = computed({
  set(val: CollabCreate) {
    emit("update:modelValue", val);
  },
  get() {
    return props.modelValue;
  },
});

const uploadFile = (files: UploadUserFile[]) => {
  if (!files[0]) return;
  fileList.value = files;
  collab.value.press_release[0].file = files[0].response;
};

const uploadVideo = (files: UploadUserFile[]) => {
  if (!files[0]) return;
  videoList.value = files;
  collab.value.video = files[0].response;
};

onMounted(() => {
  fileList.value = collab.value.press_release
    .filter((item) => !!item.file)
    .map((item) => item.file)
    .filter((item) => item.name);
  videoList.value = collab.value.video.name
    ? [{ ...collab.value.video, uid: 1 }]
    : [];
});
</script>

<template>
  <div class="collab">
    <h1>Collab</h1>
    <ElFormItem label="Title">
      <ElInput v-model="collab.title" />
    </ElFormItem>
    <ElFormItem label="Collab with">
      <ElInput v-model="collab.collab_with" />
    </ElFormItem>
    <ElFormItem label="Description">
      <ElInput v-model="collab.description" type="textarea" />
    </ElFormItem>
    <ElFormItem label="Video">
      <AdminUploadVideo :list="videoList" @upload-file="uploadVideo" />
    </ElFormItem>
    <h1>Press release</h1>
    <ElFormItem label="Title">
      <ElInput v-model="collab.press_release[0].title" />
    </ElFormItem>
    <ElFormItem label="Text">
      <ElInput v-model="collab.press_release[0].text" type="textarea" />
    </ElFormItem>
    <ElFormItem label="File">
      <AdminUploadFile
        filetype="pdf"
        :list="fileList"
        single
        @upload-file="uploadFile"
      />
    </ElFormItem>
  </div>
</template>

<style scoped lang="scss">
h1 {
  margin-left: 6rem;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.collab {
  margin-bottom: 5rem;
}
</style>
