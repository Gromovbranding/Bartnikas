<script lang="ts" setup>
import type { ITestimonial } from "~/types/admin-api";

const headTitle = ref("Testimonials");

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
} = useAdmin().makeFetchersForIndexCard<ITestimonial>(headTitle.value);
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
    <ElTableColumn label="Info" prop="additional_info" />
  </AdminTemplateCardIndexPage>
</template>
