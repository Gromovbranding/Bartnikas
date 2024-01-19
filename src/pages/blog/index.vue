<script setup lang="ts">
const { t } = useI18n();

useHeadSafe({
  title: t("titles.blog"),
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
    <AppPageHead :title="$t('titles.blog')" />
    <AppBlogsSection />
  </main>
</template>
