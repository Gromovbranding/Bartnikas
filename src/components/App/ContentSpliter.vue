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
  padding: 40px 40px;

  h2 {
    font-size: 150px;
    text-transform: uppercase;
    color: #fff;
    font-weight: bold;
    will-change: transform;
  }
}

@media screen and (max-width: 479px) {
  .spliter {
    padding: 42px 30px;

    h2 {
      letter-spacing: 3px;
    }
  }
}
</style>
