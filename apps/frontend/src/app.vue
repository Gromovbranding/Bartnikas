<script setup lang="ts">
const { finalizePendingLocaleChange } = useI18n()

const onBeforeEnter = async () => {
  await finalizePendingLocaleChange()
}

const DOMAIN = useRuntimeConfig().public.DOMAIN
const route = useRoute()

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: DOMAIN + route.path
    }
  ]
}))

useSeoMeta({
  ogUrl: DOMAIN + route.path
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
    <NuxtPage
      :transition="{
        name: 'my',
        mode: 'out-in',
        onBeforeEnter,
      }"
    />
  </NuxtLayout>
</template>

<style>
.my-enter-active,
.my-leave-active {
  transition: opacity 0.3s;
}
.my-enter,
.my-leave-active {
  opacity: 0;
}
</style>
