<script lang="ts" setup>
import type { FormRules, UploadUserFile } from "element-plus";
import { IFile, IProject, IVideoCollection } from "~/types/admin-api";

definePageMeta({
  layout: "admin",
  validate(route) {
    return /^\d+$/.test(route.params.id as string);
  },
});

const { fetchGet, fetchPatch, fetchDelete } = useApi();
const route = useRoute();

const { data: projects } = useAsyncData<IProject[]>(
  "projects",
  async () => await fetchGet("/projects")
);

const { data: entity } = await useAsyncData<IVideoCollection>(
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
});

const fileList = ref<(IFile | UploadUserFile)[]>(
  [entity.value?.video].filter(Boolean)
);

const form = reactive({
  title: entity.value?.title ?? "",
  project: entity.value?.id ?? "",
});

const handleUpload = (files: UploadUserFile[]) => {
  fileList.value = files;
};

const handlePatch = async () => {
  const video = fileList.value.map((item) => ({
    name: item.response?.name ?? item.name,
  }));
  const project =
    projects.value?.find((item) => item.id === form.project) ?? null;

  await fetchPatch(`/video-collection/${route.params.id}`, {
    title: form.title,
    project,
    ...(video[0]?.name && { video: video[0] }),
  });
};

const handleDelete = async () => {
  try {
    await fetchDelete(`/video-collection/${entity.value?.id}`);
    await navigateTo("/admin/videos");
  } catch (exc) {
    console.error(exc);
  }
};

const projectsOptions = computed(() =>
  (projects.value || []).map((item) => ({
    value: item.id,
    label: item.title,
  }))
);
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

        <ElFormItem label="Project" prop="project">
          <ElSelect v-model="form.project" clearable placeholder="Select">
            <ElOption
              v-for="option in projectsOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </ElSelect>
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
          <ElButton @click="handleDelete">Delete</ElButton>
        </ElFormItem>
      </ElForm>
    </ClientOnly>
  </ElCard>
</template>
