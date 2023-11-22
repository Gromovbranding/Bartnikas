<script lang="ts" setup>
import type { IGeneralInfo } from "~/types/admin-api";

const headTitle = ref("Index Slider");

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
} = useAdmin().makeFetchersForIndexCard<IGeneralInfo>("general-info");
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
    <ElTableColumn label="Email Press" prop="email_press" />
    <ElTableColumn label="Email Gallery" prop="email_gallery" />
    <ElTableColumn label="Is active" prop="is_active" />
  </AdminTemplateCardIndexPage>
</template>
