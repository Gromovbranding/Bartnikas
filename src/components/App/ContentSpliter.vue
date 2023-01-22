<template>
  <section class="spliter">
    <h2 v-scroll-scale-text>
      <slot />
    </h2>
  </section>
</template>

<style lang="scss" scoped>
.spliter {
  background-color: $colorAccentBlue;
  border-radius: $borderRadiusMain;
  padding: 80px 40px;
  transition: transform 4s ease-in;
  will-change: transform;

  h2 {
    font-size: 14vw;
    text-transform: uppercase;
    color: #fff;
    font-weight: bold;
  }
}
</style>
