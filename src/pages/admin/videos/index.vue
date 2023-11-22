<script lang="ts" setup>
import type { IVideoCollection } from "~/types/admin-api";

const headTitle = ref("Videos");

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
  data: { entities, pending },
} = useAdmin().makeFetchersForIndexCard<IVideoCollection>(
  headTitle.value,
  "video-collection"
);
</script>

<template>
  <AdminTemplateCardIndexPage
    v-loading="pending"
    :data="entities"
    :head-title="headTitle"
    @create="handleCreate"
    @edit="handleEdit"
    @delete="handleDelete"
  >
    <ElTableColumn label="Title" prop="title" />
    <ElTableColumn label="Project" prop="project.title" />
  </AdminTemplateCardIndexPage>
</template>
