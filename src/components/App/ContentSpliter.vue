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
  padding: 80px 40px;

  h2 {
    font-size: 14vw;
    text-transform: uppercase;
    color: #fff;
    font-weight: bold;
  }
}
</style>
