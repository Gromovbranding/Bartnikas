<template>
  <div class="container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 0 3.385rem;
}

@media screen and (max-width: 550px) {
  .container {
    padding: 0 1.628rem;
  }
}
</style>
