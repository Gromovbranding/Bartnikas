<script lang="ts" setup>
import type { FormRules, UploadUserFile } from "element-plus";
import { IFile, IVideoCollection } from "~/types/admin-api";

definePageMeta({
  validate(route) {
    return /^\d+$/.test(route.params.id as string);
  },
});

const { fetchGet, fetchPatch } = useApi();
const route = useRoute();

const { data: entity } = useAsyncData<IVideoCollection>(
  "videos",
  async () => await fetchGet(`/video-collection/${route.params.id}`)
);

const rules = reactive<FormRules>({
  title: [
    {
      required: true,
      message: "Please input Title",
      trigger: "change",
    },
  ],
  group: [
    {
      required: true,
      message: "Please input Desc",
      trigger: "change",
    },
  ],
});

const fileList = ref<(IFile | UploadUserFile)[]>(
  [entity.value?.video].filter(Boolean)
);

const form = reactive({
  title: entity.value?.title ?? "",
  group: entity.value?.group?.name ?? "",
});

const handleUpload = (files: UploadUserFile[]) => {
  fileList.value = files;
};

const handlePatch = async () => {
  const video = fileList.value.map((item) => ({
    name: item.response?.name ?? item.name,
  }));

  await fetchPatch(`/video-collection/${route.params.id}`, {
    title: form.title,
    group: {
      name: form.group,
    },

    ...(video[0]?.name && { video: video[0] }),
  });
};
</script>

<template>
  <ElCard>
    <template #header>
      <div class="card-header">
        <span> Edit video</span>
        <ElButton type="default" plain @click="navigateTo('/admin/videos')">
          Back
        </ElButton>
      </div>
    </template>

    <ClientOnly>
      <ElForm :model="form" :rules="rules" label-width="120px">
        <ElFormItem label="Title" prop="title">
          <ElInput v-model="form.title" />
        </ElFormItem>

        <ElFormItem label="Group" prop="group">
          <ElInput v-model="form.group" :rows="5" type="text" />
        </ElFormItem>

        <ElFormItem required label="Video">
          <AdminUploadVideo
            :list="fileList"
            single
            @uploadFile="handleUpload"
          />
        </ElFormItem>

        <ElFormItem>
          <ElButton type="primary" @click="handlePatch"> Save </ElButton>
          <ElButton>Delete</ElButton>
        </ElFormItem>
      </ElForm>
    </ClientOnly>
  </ElCard>
</template>
