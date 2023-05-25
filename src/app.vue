<template>
  <NuxtLayout>
    <NuxtLoadingIndicator :height="5" :duration="3000" :throttle="400" />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
img {
  pointer-events: none;
}

.admin-layout img {
  pointer-events: initial;
}
</style>
