<script setup lang="ts">
import type { IServices, IServicesTranslate } from '~/types/admin-api'

const { getServices } = usePublicData()

const { data: services } = await useAsyncData<IServices>(
  'services',
  async () => await getServices()
)

const translated = reactive(
  useTranslateLanguage<IServicesTranslate>(
    services.value?.translate ?? []
  )
)

const titleBlock = ref()

const route = useRoute()

onMounted(() => {
  if (titleBlock.value) {
    route.fullPath.includes('services') ? useColorChangerOnScroll(titleBlock.value, 'rgb(66, 136, 193)', true, 3) : useColorChangerOnScroll(titleBlock.value, 'rgb(66, 136, 193)')
  }
})
</script>

<template>
  <section class="choose-format">
    <h2 ref="titleBlock" class="choose-format__title">
      {{ translated?.title }}
    </h2>

    <div class="choose-format__cards">
      <article
        v-for="(service, i) in translated?.services"
        :key="service.title"
        class="choose-format__card"
      >
        <NuxtImg
          :src="
            /* `/baseApiFiles/${service.image.name}` || */ `/img/format_${i + 1}.png`
          "
          loading="lazy"
          class="choose-format__card-img"
        />
        <div class="choose-format__card-info">
          <NuxtLink :to="`${service.btn.url}`">
            <h3 class="choose-format__card-title">
              <IconArrow class="choose-format__card-arrow" is-arrow30-deg />{{
                service.title
              }}
            </h3>
          </NuxtLink>
          <p class="choose-format__card-text">
            {{ service.text }}
          </p>
          <NuxtLink
            class="choose-format__card-action"
            :to="`${service.btn.url}`"
          >
            {{ service.btn.text }}
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
    padding: 0 3.385rem;
    margin-bottom: 3.125rem;
  }

  &__cards {
    max-width: 81.77rem;
    padding: 0 3.385rem;
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
    border-radius: $borderRadiusMain;
    transition: transform 0.2s ease-in-out;
    transform: translateY(0);

    &:hover {
      transform: translateY(-12px);
    }

    &:nth-child(even) {
      flex-direction: row-reverse;
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

    &__card-title {
      font-size: 1.5rem;
    }

    &__card-text {
      font-size: 0.9rem;
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

      &:nth-child(even) {
        flex-direction: column;
      }
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
