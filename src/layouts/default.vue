<template>
  <div class="wrapper">
    <TheMenu />
    <slot />
    <TheFooter />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: relative;
}
</style>
