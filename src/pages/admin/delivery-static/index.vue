<script lang="ts" setup>
import type { ITermsStatic } from "~/types/admin-api";

const headTitle = ref("Payment & Delivery");

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
} = useAdmin().makeFetchersForIndexCard<ITermsStatic>("delivery-static");
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
    <ElTableColumn label="Description" prop="description" />
  </AdminTemplateCardIndexPage>
</template>
