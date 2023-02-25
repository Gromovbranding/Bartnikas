<script lang="ts" setup>
import { useAdminStore } from "~/stores/admin";

definePageMeta({
  layout: "admin",
});

const adminStore = useAdminStore();
adminStore.setPageName("Blogs");
</script>

<template>
  <p>blogs</p>
</template>
