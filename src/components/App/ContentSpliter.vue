<template>
  <section class="spliter">
    <h2>
      <slot />
    </h2>
  </section>
</template>

<style lang="scss" scoped>
.spliter {
  background-color: $colorAccentBlue;
  border-radius: $borderRadiusMain;

  h2 {
    font-size: 14vw;
    text-transform: uppercase;
    color: #fff;
    padding: 60px 80px;
    font-weight: bold;
  }
}
</style>
