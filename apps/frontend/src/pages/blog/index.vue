<script setup lang="ts">
const { t } = useI18n()

useHeadSafe({
  title: t('titles.blog'),
  meta: [
    {
      name: 'description',
      content: 'My Blog'
    }

  ]
})
</script>
<template>
  <main>
    <AppPageHead :title="$t('titles.blog')" />
    <AppBlogsSection />
  </main>
</template>
