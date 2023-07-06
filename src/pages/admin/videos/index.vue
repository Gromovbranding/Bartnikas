<script lang="ts" setup>
import { IVideoCollection } from "~/types/admin-api";

const headTitle = ref("videos");

definePageMeta({
  layout: "admin",
});

useHeadSafe({
  title: headTitle.value,
});

const {
  handleCreate,
  handleEdit,
  handleDelete,
  data: { entities },
} = useAdmin().makeFetchersForIndexCard<IVideoCollection>(
  headTitle.value,
  "video-collection"
);
</script>

<template>
  <AdminTemplateCardIndexPage
    :data="entities"
    :head-title="headTitle"
    @create="handleCreate"
    @edit="handleEdit"
    @delete="handleDelete"
  >
    <ElTableColumn label="id" prop="id" width="120" />
    <ElTableColumn label="Title" prop="title" width="220" />
    <ElTableColumn label="Project" prop="project.title" width="200" />
    <ElTableColumn label="Date" prop="date" width="120" />
  </AdminTemplateCardIndexPage>
</template>
