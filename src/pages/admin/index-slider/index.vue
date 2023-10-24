<script lang="ts" setup>
import { IIndexSlider } from "~/types/admin-api";

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
} = useAdmin().makeFetchersForIndexCard<IIndexSlider>("index-slider");
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
    <ElTableColumn label="Name" prop="name" />
    <ElTableColumn label="Is active" prop="active" />
  </AdminTemplateCardIndexPage>
</template>
