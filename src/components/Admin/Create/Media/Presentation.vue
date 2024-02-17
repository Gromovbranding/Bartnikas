<script lang="ts" setup>
import type { IMediaPresentation } from "@/types/admin-api";

const headTitle = ref("Media Presentation");

const {
  handleDelete,
  handleCreate,
  handleEdit,
  data: { entities, pending },
} = useAdmin().makeFetchersForIndexCard<IMediaPresentation>(
  "media/presentation"
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
    <ElTableColumn label="Title" prop="translate.0.title" />
  </AdminTemplateCardIndexPage>
</template>
