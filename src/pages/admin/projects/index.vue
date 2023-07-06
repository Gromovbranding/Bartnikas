<script lang="ts" setup>
import { IProject } from "~/types/admin-api";

const headTitle = ref("projects");

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
} = useAdmin().makeFetchersForIndexCard<IProject>(headTitle.value);
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
    <ElTableColumn label="Group" prop="group" width="220" />
    <ElTableColumn label="Collab" prop="collab.collab_with" width="220" />
  </AdminTemplateCardIndexPage>
</template>
