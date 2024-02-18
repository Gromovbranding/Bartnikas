<template>
  <section class="spliter">
    <h2 v-scroll-scale-text>
      <slot></slot>
    </h2>
  </section>
</template>

<style lang="scss" scoped>
.spliter {
  background-color: $colorAccentBlue;
  border-radius: $borderRadiusMain;
  padding: 3rem 3rem;

  h2 {
    font-size: 12.5rem;
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
      letter-spacing: 3px;
      font-size: 4rem;
    }
  }
}
</style>
