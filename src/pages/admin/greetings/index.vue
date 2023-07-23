<script lang="ts" setup>
import { IArticle } from "~/types/admin-api";

const headTitle = ref("Greetings");

definePageMeta({
  layout: "admin",
});

useHeadSafe({
  title: headTitle.value,
});

const {
  handleCreate,
  handleDelete,
  data: { entities, pending },
} = useAdmin().makeFetchersForIndexCard<IArticle>(
  headTitle.value,
  "greeting-index"
);
</script>

<template>
  <AdminTemplateCardIndexPage
    v-loading="pending"
    :data="entities"
    :head-title="headTitle"
    @create="handleCreate"
    @delete="handleDelete"
  >
    <ElTableColumn label="Text" prop="text" />
    <ElTableColumn label="Greeting is active" prop="is_active" />
  </AdminTemplateCardIndexPage>
</template>
