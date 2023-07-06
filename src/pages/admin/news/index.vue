<script lang="ts" setup>
import { IArticle } from "~/types/admin-api";

const headTitle = ref("news");

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
} = useAdmin().makeFetchersForIndexCard<IArticle>(headTitle.value);
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
    <ElTableColumn label="Text" prop="text" width="820" />
    <ElTableColumn label="Is Hot" prop="is_hot" width="90" />
    <ElTableColumn label="Date" prop="date" width="120" />
  </AdminTemplateCardIndexPage>
</template>
