<script lang="ts" setup>
import type { IFaq } from "~/types/admin-api";

const headTitle = ref("Faq");

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
} = useAdmin().makeFetchersForIndexCard<IFaq>(headTitle.value);
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
    <ElTableColumn label="Title" prop="translate.0.title" />
    <ElTableColumn label="Description" prop="translate.0.description" />
  </AdminTemplateCardIndexPage>
</template>
