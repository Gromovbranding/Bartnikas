<script setup lang="ts">
import type { IPhotoportal, IPhotoportalTranslate } from '~/types/admin-api'

const { getPhotoportal } = usePublicData()

const { data: photoportal } = await useAsyncData<IPhotoportal>(
  'photoportal',
  async () => await getPhotoportal()
)

const translated = reactive(
  useTranslateLanguage<IPhotoportalTranslate>(
    photoportal.value?.translate ?? []
  )
)

</script>

<template>
  <section class="special">
    <div class="special__main">
      <h2 class="special__title">
        {{ translated?.special_title }}
      </h2>
      <p class="special__description">
        {{ translated?.special_description }}
      </p>
      <p class="special__footer">
        {{ translated?.special_footer_text }}
      </p>
      <UIButton
        :to="`/services/photoportal`"
        class="special__action-btn"
        :is-white="true"
      >
        {{ translated?.special_action }}
      </UIButton>
    </div>
    <NuxtImg loading="lazy" src="/img/special.png" class="special__img" />
  </section>
</template>

<style scoped lang="scss">
.special {
  color: #fff;
  display: flex;

  &__main {
    padding-top: 3.646rem;
    padding-left: 3.385rem;
    padding-bottom: 4.896rem;
    padding-right: 6.667rem;
    width: 59.8%;
    background: $colorAccentBlue;
    border-radius: $borderRadiusMain;
  }

  &__title {
    color: inherit;
    font-size: 2.083rem;
    margin-bottom: 1.042rem;
  }

  &__description {
    color: inherit;
    font-size: 5.208rem;
    margin-bottom: 5.729rem;
  }

  &__footer {
    color: inherit;
    font-size: 1.563rem;
    line-height: 1.2;
    margin-bottom: 2.083rem;
  }

  &__action-btn {
    color: #000 !important;
    font-size: 1.563rem !important;
    padding: 1.563rem !important;
  }

  &__img {
    width: 40.2%;
  }
}

@media screen and (max-width: 1000px) {
  .special {
    &__main {
      padding: 2.1rem;
    }

    &__title {
      font-size: 1.7rem;
    }

    &__description {
      font-size: 3.8rem;
      margin-bottom: 4rem;
    }

    &__footer {
      font-size: 1.2rem;
    }
  }
}

@media screen and (max-width: 550px) {
  .special {
    flex-direction: column;

    &__main {
      padding: 5.089rem 1.628rem 4.071rem;
      width: 100%;
    }

    &__title {
      font-size: 1.628rem;
      margin-bottom: 1.425rem;
    }

    &__description {
      font-size: 2.646rem;
      line-height: 1;
      max-width: 22.29rem;
      margin-bottom: 3.664rem;
    }

    &__footer {
      font-size: 1.425rem;
      margin-bottom: 3.053rem;
    }

    &__action-btn {
      font-size: 2.443rem !important;
      padding: 1.425rem 3.257rem !important;
    }

    &__img {
      width: 100%;
      max-height: 19.338rem;
      object-fit: cover;
    }
  }
}
</style>
