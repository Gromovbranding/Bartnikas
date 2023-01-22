<template>
  <div class="marquee__container">
    <div class="marquee__delay">
      <p class="marquee__text">
        <slot />
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes marquee {
  0% {
    left: 0;
  }
  100% {
    left: -100%;
  }
}
.marquee {
  &__container {
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  &__delay {
    position: relative;
    width: max-content;
  }

  &__text {
    font-size: 62px;
    color: #fff;
    white-space: nowrap;
    font-weight: bold;
  }
}
</style>
