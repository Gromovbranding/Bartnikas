<script lang="ts" setup>
import { IProjectOrderByEmail } from "~/types/admin-api";

const headTitle = ref("Ordered By Email");

definePageMeta({
  layout: "admin",
});

useHeadSafe({
  title: headTitle.value,
});

const {
  handleDelete,
  data: { entities, pending },
} = useAdmin().makeFetchersForIndexCard<IProjectOrderByEmail>(
  "projects/order/by-email"
);
</script>

<template>
  <AdminTemplateCardIndexPage
    v-loading="pending"
    :data="entities"
    :head-title="headTitle"
    :handlers-off="['create', 'edit']"
    @delete="handleDelete"
  >
    <ElTableColumn label="Name" prop="name" />
    <ElTableColumn label="Email" prop="email" />
    <ElTableColumn label="Image name" prop="image.image_name" />
    <ElTableColumn label="Price" prop="image.price" />
    <ElTableColumn label="Status" prop="Sent on email" />
  </AdminTemplateCardIndexPage>
</template>
