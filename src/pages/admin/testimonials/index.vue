<script lang="ts" setup>
import { ITestimonial } from "~/types/admin-api";

const headTitle = ref("testimonials");

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
} = useAdmin().makeFetchersForIndexCard<ITestimonial>(headTitle.value);
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
    <ElTableColumn label="Info" prop="additional_info" width="200" />
  </AdminTemplateCardIndexPage>
</template>
