<script lang="ts" setup>
definePageMeta({
  layout: "admin",
  middleware: "admin-auth",
});

const { fetchGet } = useApi();
const { accessToken } = useAdmin();

onMounted(async () => {
  if (accessToken.value) {
    await fetchGet("auth/me");
  }
});
</script>

<template>
  <NuxtPage />
</template>
