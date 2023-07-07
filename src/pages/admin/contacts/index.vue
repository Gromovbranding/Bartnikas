<script lang="ts" setup>
import { IContact } from "~/types/admin-api";

const headTitle = ref("Contacts");

definePageMeta({
  layout: "admin",
});

useHeadSafe({
  title: headTitle.value,
});

const {
  handleDelete,
  data: { entities, pending },
} = useAdmin().makeFetchersForIndexCard<IContact>(headTitle.value);
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
    <ElTableColumn label="Comment" prop="comment" />
  </AdminTemplateCardIndexPage>
</template>
