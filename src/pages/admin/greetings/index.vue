<script lang="ts" setup>
import type { IArticle } from "~/types/admin-api";

const headTitle = ref("Concept");

definePageMeta({
  layout: "admin",
});

useHeadSafe({
  title: headTitle.value,
});

const {
  handleCreate,
  handleDelete,
  handleEdit,
  data: { entities, pending },
} = useAdmin().makeFetchersForIndexCard<IArticle>(
  "greetings",
  "greeting-index"
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
    <ElTableColumn label="Text" prop="translate.0.text" />
    <ElTableColumn label="Greeting is active" prop="is_active" />
  </AdminTemplateCardIndexPage>
</template>
