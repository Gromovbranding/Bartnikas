<script lang="ts" setup>
import { IMediaKit } from "@/types/admin-api";

const headTitle = ref("Media Kit");

const {
  handleDelete,
  handleCreate,
  handleEdit,
  data: { entities, pending },
} = useAdmin().makeFetchersForIndexCard<IMediaKit>("media/kit");
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
