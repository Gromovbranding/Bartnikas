<script setup lang="ts">
interface BreadCrumbLink {
  href: string
  text: string
}

const props = defineProps<{
  links: BreadCrumbLink[]
}>()
</script>

<template>
  <nav class="breadcrumb">
    <template v-for="(link, i) in props.links" :key="link.href">
      <span v-if="i > 0" class="breadcrumb__separator"> > </span>
      <NuxtLink :to="link.href">
        {{ link.text }}
      </NuxtLink>
    </template>
  </nav>
</template>
