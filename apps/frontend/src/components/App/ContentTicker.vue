<script setup lang="ts">
defineProps<{
  tickerTitle: string
  tickerText: string
}>()
</script>

<template>
  <div class="ticker">
    <p class="ticker__title">
      {{ tickerTitle }}
    </p>
    <p class="ticker__text">
      {{ tickerText }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.ticker {
  color: #fff;
  padding-top: 3.385rem;
  padding-bottom: 5.156rem;
  border-radius: $borderRadiusMain;
  background: $colorAccentBlue;
  overflow: hidden;

  &__title {
    color: inherit;
    font-size: 1.563rem;
    padding: 0 3.385rem;
    margin-bottom: 2.604rem;
  }

  &__text {
    color: inherit;
    font-size: 4.167rem;
    animation: 25s linear 0 ticker;
    animation-iteration-count: infinite;
    white-space: nowrap;
    display: inline-block;
  }
}

@media screen and (max-width: 1000px) {
  .ticker {
    padding-top: 3rem;
    padding-bottom: 4rem;

    &__title {
      margin-bottom: 2rem;
    }

    &__text {
      font-size: 3.8rem;
    }
  }
}

@media screen and (max-width: 550px) {
  .ticker {
    padding-top: 2.036rem;
    padding-bottom: 2.748rem;

    &__title {
      font-size: 1.425rem;
      padding: 0 1.628rem;
      margin-bottom: 1.221rem;
    }

    &__text {
      font-size: 2.443rem;
    }
  }
}
</style>
