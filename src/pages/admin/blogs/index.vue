<script lang="ts" setup>
import type { IBlog } from "~/types/admin-api";

const headTitle = ref("Blogs");

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
} = useAdmin().makeFetchersForIndexCard<IBlog>(headTitle.value);
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
    <ElTableColumn label="Text" prop="text" />
  </AdminTemplateCardIndexPage>
</template>
