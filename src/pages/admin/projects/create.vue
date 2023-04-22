<script lang="ts" setup>
import type { UploadProps, UploadUserFile } from "element-plus";

const rules = reactive({
  title: [
    {
      required: true,
      message: "Please input Title",
      trigger: "change",
    },
  ],
  desc: [
    {
      required: true,
      message: "Please input Desc",
      trigger: "change",
    },
  ],
});

const fileList = ref<UploadUserFile[]>([]);

const form = reactive({
  title: "",
  desc: "",
});

const isPreviewImageVisible = ref<boolean>(false);
const previewImageUrl = ref<string | null>(null);

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  previewImageUrl.value = uploadFile.url!;
  isPreviewImageVisible.value = true;
};
</script>

<template>
  <ElCard>
    <template #header>
      <div class="card-header">
        <span> Projects {{ form.title }} </span>
        <ElButton type="default" plain @click="navigateTo('/admin/projects')">
          Back
        </ElButton>
      </div>
    </template>

    <ClientOnly>
      <ElForm :model="form" :rules="rules" label-width="120px">
        <ElFormItem label="Title" prop="title">
          <ElInput v-model="form.title" />
        </ElFormItem>

        <ElFormItem label="Description" prop="desc">
          <ElInput v-model="form.desc" :rows="5" type="textarea" />
        </ElFormItem>

        <!-- Project Images -->
        <ElFormItem required label="Project Images">
          <ElUpload
            v-model:file-list="fileList"
            style="width: 100%"
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
              <div>jpg/png files with a size less than 500kb</div>
            </template>
          </ElUpload>
        </ElFormItem>

        <ElFormItem>
          <ElButton type="primary"> Save </ElButton>
          <ElButton>Clear</ElButton>
        </ElFormItem>
      </ElForm>

      <ElDialog v-model="isPreviewImageVisible">
        <ElImage :src="previewImageUrl" alt="Preview Image" />
      </ElDialog>
    </ClientOnly>
  </ElCard>
</template>
