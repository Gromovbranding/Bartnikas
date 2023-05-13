<script lang="ts" setup>
import type { FormRules } from "element-plus";
import { IVideoCollection } from "~/types/admin-api";

definePageMeta({
  validate(route) {
    return /^\d+$/.test(route.params.id as string);
  },
});

const { fetchGet, fetchPatch } = useApi();
const route = useRoute();

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

const fileList = ref<any[]>([]);

const form = reactive({
  title: "",
  group: "",
});

getVideos();

const handleUpload = (files: any[]) => {
  fileList.value = files;
};

function getVideos() {
  const { data: entity } = useAsyncData<IVideoCollection>(
    "videos",
    async () => await fetchGet(`/video-collection/${route.params.id}`)
  );
  form.title = entity.value?.title || "";
  form.group = entity.value?.group?.name || "";
  fileList.value = [entity.value?.video] || [];
}

function onSave() {
  const video = fileList.value.map((item) => ({
    name: item.response?.name || item.name,
    url: item.response?.url || item.url,
  }));
  const { title, group } = form;
  fetchPatch(`/video-collection/${route.params.id}`, {
    title,
    ...(video[0]?.url && { video: video[0] }),
    group: {
      name: group,
    },
  });
}
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
          <ElButton type="primary" @click="onSave"> Save </ElButton>
          <ElButton>Delete</ElButton>
        </ElFormItem>
      </ElForm>
    </ClientOnly>
  </ElCard>
</template>
