<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.6s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
