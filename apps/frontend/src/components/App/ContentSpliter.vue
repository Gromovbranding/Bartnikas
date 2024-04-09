<script setup lang="ts">
defineProps<{
  color?: string;
  fontWeight?: string;
}>()
</script>

<template>
  <section class="spliter">
    <h2 v-scroll-scale-text :style="{color, fontWeight}">
      <slot />
    </h2>
  </section>
</template>

<style lang="scss" scoped>
.spliter {
  background-color: $colorAccentBlue;
  border-radius: $borderRadiusMain;
  padding: 3rem 3rem;

  h2 {
    font-size: 9.5rem;
    text-transform: uppercase;
    color: #fff;
    font-weight: bold;
    will-change: transform;
  }
}

@media screen and (max-width: 550px) {
  .spliter {
    padding: 3rem 2rem;

    h2 {
      font-size: 3.664rem;
    }
  }
}
</style>
