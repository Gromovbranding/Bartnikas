<script setup lang="ts">
import type { IChooseFormatCard } from '~/types/admin-api'
</script>

<template>
  <section class="choose-format">
    <h2 class="choose-format__title">
      {{ $t('choose_format.title') }}
    </h2>

    <div class="choose-format__cards">
      <article
        v-for="(card, index) in ($tm('choose_format.cards') as IChooseFormatCard[])"
        :key="$rt(card.title)"
        class="choose-format__card"
      >
        <NuxtImg :src="`/img/format_${index + 1}.png`" loading="lazy" class="choose-format__card-img" />
        <div class="choose-format__card-info">
          <h3 class="choose-format__card-title">
            <IconArrow class="choose-format__card-arrow" is-arrow30-deg />{{ $rt(card.title) }}
          </h3>
          <p class="choose-format__card-text">
            {{ $rt(card.text) }}
          </p>
          <NuxtLink class="choose-format__card-action">
            {{ $rt(card.action) }}
          </NuxtLink>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.choose-format {
  padding-top: 5.208rem;
  padding-bottom: 6.25rem;
  display: flex;
  flex-direction: column;

  &__title {
    font-size: 5.208rem;
    padding: 0 3rem;
    margin-bottom: 3.125rem;
  }

  &__cards {
    max-width: 81rem;
    padding: 0 3rem;
    display: flex;
    flex-direction: column;
    gap: 5.208rem;
    align-self: center;
  }

  &__card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 150ms ease-in;
    position: relative;
    border-radius: 10px;
    transition: transform 0.2s ease-in-out;
    transform: translateY(0);

    &:hover {
      transform: translateY(-12px);
    }
  }

  &__card-img {
    width: 47.2%;
  }

  &__card-info {
    width: 52.8%;
    padding: 2rem;
  }

  &__card-arrow {
    width: 1.563rem;
    margin-right: 1.042rem;
  }

  &__card-title {
    font-size: 2.083rem;
    margin-bottom: 1.042rem;
  }

  &__card-text {
    font-size: 1.042rem;
    line-height: 1.2;
    margin-bottom: 2.083rem;
  }

  &__card-action {
    color: #999999;
    font-size: 1.563rem;
  }
}

@media screen and (max-width: 1000px) {
  .choose-format {

    &__title {
      font-size: 3.2rem;
    }

    &__card-text {
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
    }
  }
}

@media screen and (max-width: 550px) {
  .choose-format {
    padding-top: 4.071rem;
    padding-bottom: 4.071rem;

    &__title {
      font-size: 2.646rem;
      padding: 0 1.628rem;
      margin-bottom: 2.036rem;
    }

    &__cards {
      padding: 0 3.053rem;
      gap: 4.071rem;
    }

    &__card {
      flex-direction: column;
    }

    &__card-img {
      width: 100%;
    }

    &__card-info {
      width: 100%;
      padding: 2.036rem 1.018rem 0;
    }

    &__card-arrow {
      width: 1.832rem;
    }

    &__card-title {
      font-size: 1.628rem;
    }

    &__card-text {
      font-size: 1.221rem;
    }

    &__card-action {
      font-size: 1.425rem;
    }
  }
}
</style>
