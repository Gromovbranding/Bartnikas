<script setup lang="ts">
useHeadSafe({
  title: "Blog",
  meta: [
    {
      name: "description",
      content: "My Blog",
    },
    {
      name: "robots",
      content: "index,follow",
    },
  ],
});
</script>
<template>
  <main>
    <AppPageHead title="Blog" />
    <AppBlogsSection />
  </main>
</template>
