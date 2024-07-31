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
  padding: 3rem 3rem;

  h2 {
    font-size: 9rem;
    text-transform: uppercase;
    color: #fff;
    will-change: transform;
  }
}

@media screen and (max-width: 1000px) {
  .spliter {
    h2 {
      font-size: 7rem;
    }
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
