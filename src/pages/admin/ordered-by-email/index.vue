<script lang="ts" setup>
import type { IProjectOrderByEmail } from "~/types/admin-api";

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
    <ElTableColumn label="Image name" prop="image_name" />
    <ElTableColumn label="Size" prop="size">
      <template #default="{ row }: { row: IProjectOrderByEmail }">
        {{ row.size.width }} x
        {{ row.size.height }}
      </template>
    </ElTableColumn>
    <ElTableColumn label="URL Image" prop="url" />
    <ElTableColumn label="Status" prop="status" />
  </AdminTemplateCardIndexPage>
</template>
