<script setup lang="ts">
const { t } = useI18n()

useHeadSafe({
  title: t('titles.projects'),
  meta: [
    {
      name: 'description',
      content: 'My Projects'
    }

  ]
})
</script>

<template>
  <main>
    <AppPageHead :title="$t('titles.projects')" />
    <AppPortSection full />
  </main>
</template>
