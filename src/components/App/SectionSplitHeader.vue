<template>
  <section class="split-block-caption">
    <h2><slot /></h2>
  </section>
</template>

<style lang="scss" scoped>
.split-block-caption {
  background-color: $colorAccentBlue;
  border-radius: $borderRadiusMain;

  h2 {
    font-size: 120px;
    text-transform: uppercase;
    color: #fff;
    padding: 60px 40px;
  }
}
</style>
