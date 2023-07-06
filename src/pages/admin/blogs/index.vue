<script lang="ts" setup>
import { IBlog } from "~/types/admin-api";

const headTitle = ref("blogs");

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
} = useAdmin().makeFetchersForIndexCard<IBlog>(headTitle.value);
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
    <ElTableColumn label="Title" prop="title" width="320" />
    <ElTableColumn label="Text" prop="text" width="820" />
    <ElTableColumn label="Date" prop="date" width="120" />
  </AdminTemplateCardIndexPage>
</template>
