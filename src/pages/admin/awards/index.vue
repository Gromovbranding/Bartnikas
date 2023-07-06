<script lang="ts" setup>
import { IAwards } from "~/types/admin-api";

const headTitle = ref("awards");

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
} = useAdmin().makeFetchersForIndexCard<IAwards>(headTitle.value);
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
    <ElTableColumn label="Description" prop="description" width="700" />
  </AdminTemplateCardIndexPage>
</template>
