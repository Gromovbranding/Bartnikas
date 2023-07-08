<script lang="ts" setup>
import { IProject } from "~/types/admin-api";

const {
  VideosData: { form },
} = useAdmin();

const { fetchGet } = useApi();

const { data: projects } = await useAsyncData<IProject[]>("projects", () =>
  fetchGet("/projects")
);
</script>

<template>
  <ElFormItem label="Title" prop="title">
    <ElInput v-model="form.title" />
  </ElFormItem>
  <ElFormItem label="Project" prop="project">
    <ElSelect v-model="form.project">
      <ElOption
        v-for="item in projects"
        :key="item.id"
        :label="item.title"
        :value="item"
      />
    </ElSelect>
  </ElFormItem>
  <ElFormItem required label="Video" prop="video">
    <AdminUploadFile v-model="form.video" file-type="video" />
  </ElFormItem>
</template>
