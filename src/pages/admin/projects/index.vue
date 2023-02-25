<script lang="ts" setup>
import { useAdminStore } from "~/stores/admin";

definePageMeta({
  layout: "admin",
});

const adminStore = useAdminStore();
adminStore.setPageName("Projects");
</script>

<template>
  <p>projects</p>
</template>
