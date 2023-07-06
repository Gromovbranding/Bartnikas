<script lang="ts" setup>
import { IContact } from "~/types/admin-api";

const headTitle = ref("contacts");

definePageMeta({
  layout: "admin",
});

useHeadSafe({
  title: headTitle.value,
});

const {
  handleDelete,
  data: { entities },
} = useAdmin().makeFetchersForIndexCard<IContact>(headTitle.value);
</script>

<template>
  <AdminTemplateCardIndexPage
    :data="entities"
    :head-title="headTitle"
    :handlers-off="['create', 'edit']"
    @delete="handleDelete"
  >
    <ElTableColumn label="id" prop="id" width="120" />
    <ElTableColumn label="Name" prop="name" width="220" />
    <ElTableColumn label="Email" prop="email" width="220" />
    <ElTableColumn label="Comment" prop="comment" width="720" />
    <ElTableColumn label="Created" prop="created_at" width="220" />
  </AdminTemplateCardIndexPage>
</template>
