<script lang="ts" setup>
import type { IMediaCV } from "@/types/admin-api";

const headTitle = ref("Media CV");

const {
  handleDelete,
  handleCreate,
  handleEdit,
  data: { entities, pending },
} = useAdmin().makeFetchersForIndexCard<IMediaCV>("media/cv");
</script>

<template>
  <AdminTemplateCardIndexPage
    v-loading="pending"
    :data="entities"
    :head-title="headTitle"
    @create="handleCreate"
    @edit="handleEdit"
    @delete="handleDelete"
  />
</template>
