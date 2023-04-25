<script lang="ts" setup>
definePageMeta({
  layout: "admin",
  middleware: "admin-auth",
});

const { fetchGet, login } = useApi();

onMounted(async () => {
  await login({
    username: "admin1",
    password: "uHeN6WVM",
  });

  console.log(await fetchGet("auth/profile"));
});
</script>

<template>
  <NuxtPage />
</template>
