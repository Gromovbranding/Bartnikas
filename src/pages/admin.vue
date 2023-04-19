<script lang="ts" setup>
definePageMeta({
  layout: "admin",
  middleware: "admin-auth",
});

const { pageName } = useAdmin();

useHead({
  title: pageName,
});
</script>

<template>
  <NuxtPage />
</template>
