<script lang="ts" setup>
import type {
  IBio,
  IBioTranslate,
  IBioTestimonials,
  IBioTestimonialsTranslate
} from '@/types/admin-api'

const { breakpoint } = useBreakpoints()

const { t } = useI18n()

const videoGreetingStyle = computed(() => {
  return {
    'flex-direction':
      breakpoint.value === 'xs' ? 'column-reverse' : 'row-reverse'
  }
})

const { getBio, getBioTestimonials } = usePublicData()

const { data: bio } = await useAsyncData<IBio>(
  'bio',
  async () => await getBio()
)

const translated = reactive(
  useTranslateLanguage<IBioTranslate>(bio.value!.translate)
)

useHeadSafe({
  title: t('titles.about'),
  meta: [
    {
      name: 'description',
      content: translated.value?.description ?? ''
    }

  ]
})

const { data: bioTestimonials } = await useAsyncData<IBioTestimonials[]>(
  'bioTestimonials',
  async () => await getBioTestimonials()
)

const translateBioTestimonials = reactive(
  (bioTestimonials.value ?? []).map((item) => {
    return {
      ...item,
      translate: useTranslateLanguage<IBioTestimonialsTranslate>(item.translate)
    }
  })
)
</script>

<template>
  <main>
    <AppPageHead :title="$t('titles.about')" />

    <section class="biography-about">
      <div class="biography-about__img">
        <NuxtImg loading="lazy" :src="`/baseApiFiles/${bio?.awatar.name}`" />
      </div>
      <div class="biography-about__text">
        <p>
          {{ translated?.sub_description }}
        </p>
        <div v-html="translated?.description" />
      </div>
    </section>

    <section class="testimonials">
      <div
        class="testimonials__wrapper"
      >
        <div
          v-for="item in [translateBioTestimonials[0], translateBioTestimonials[0], translateBioTestimonials[0]]"
          :key="item.id"
          class="testimonials__item"
        >
          <div class="testimonials__person">
            <div>
              <NuxtImg
                loading="lazy"
                :src="`/baseApiFiles/${item.photo.name}`"
              />
            </div>
            <div>
              <h3>{{ item.translate?.name }}</h3>
              <p>{{ item.translate?.job }}</p>
            </div>
          </div>
          <div class="testimonials__text">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="m2.699 20c-.411 0-.699-.312-.699-.662 0-.249.145-.516.497-.703 1.788-.947 3.858-4.226 3.858-6.248-3.016.092-4.326-2.582-4.326-4.258 0-2.006 1.738-4.129 4.308-4.129 3.241 0 4.83 2.547 4.83 5.307 0 5.981-6.834 10.693-8.468 10.693zm10.833 0c-.41 0-.699-.312-.699-.662 0-.249.145-.516.497-.703 1.788-.947 3.858-4.226 3.858-6.248-3.015.092-4.326-2.582-4.326-4.258 0-2.006 1.739-4.129 4.308-4.129 3.241 0 4.83 2.547 4.83 5.307 0 5.981-6.833 10.693-8.468 10.693z"
                  fill-rule="nonzero"
                />
              </svg>
            </div>
            <div>
              <p>
                {{ item.translate?.testimonial }}
              </p>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="m2.699 20c-.411 0-.699-.312-.699-.662 0-.249.145-.516.497-.703 1.788-.947 3.858-4.226 3.858-6.248-3.016.092-4.326-2.582-4.326-4.258 0-2.006 1.738-4.129 4.308-4.129 3.241 0 4.83 2.547 4.83 5.307 0 5.981-6.834 10.693-8.468 10.693zm10.833 0c-.41 0-.699-.312-.699-.662 0-.249.145-.516.497-.703 1.788-.947 3.858-4.226 3.858-6.248-3.015.092-4.326-2.582-4.326-4.258 0-2.006 1.739-4.129 4.308-4.129 3.241 0 4.83 2.547 4.83 5.307 0 5.981-6.833 10.693-8.468 10.693z"
                  fill-rule="nonzero"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
    <AppAwardsSection />
    <AppContentSpliter> {{ $t("titles.concept") }} </AppContentSpliter>
    <AppSectionVideoGreeting :style="videoGreetingStyle" />
  </main>
</template>

<style lang="scss" scoped>
.biography-about {
  display: flex;
  align-items: flex-start;

  &__img {
    flex: 0 0 50%;

    img,
    picture {
      border-radius: $borderRadiusMain;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    padding: 3vw;

    :deep(p) {
      font-size: 1.5vw;
      line-height: 1.5;
      font-weight: 400;
    }

    small {
      color: $colorTextDark;
      font-size: 1.2vw;
      font-weight: 400;
      line-height: 1.5;
    }
  }
}

.testimonials {
  margin-block: 80px 0;
  padding: 0 40px 80px;
  overflow: hidden;
  &__wrapper {
    scroll-snap-type: x mandatory;
    overflow-x: auto;
    display: flex;
    gap: 100px;
    cursor: grab;
    touch-action: pan-x;

    &::-webkit-scrollbar {
      display: none;
  }
  }

  &__item {
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    gap: 50px;
    flex: 0 0 40vw;
  }

  &__person {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    > div {
      &:first-child {
        width: 160px;
        height: 160px;

        img,
        picture {
          object-fit: cover;
          width: 100%;
          height: 100%;
          border-radius: $borderRadiusMain;
        }
      }

      &:last-child {
        max-width: 380px;

        h3 {
          font-size: 34px;
          font-weight: bold;
        }

        :deep(p) {
          line-height: 1.3;
          font-size: 28px;
        }
      }
    }
  }

  &__text {
    display: flex;
    gap: 40px;

    > div {
      &:first-child {
        svg {
          transform: rotate(180deg);
        }
      }

      &:nth-child(odd) {
        svg {
          fill: $colorAccentBlue;
          stroke: $colorAccentBlue;
          width: 42px;
        }
      }

      &:last-child {
        align-self: flex-end;
      }
    }

    :deep(p) {
      font-size: 26px;
      line-height: 1.5;
    }
  }
}

@media screen and (min-width: 551px) and (max-width: 1000px) {
  .biography-about {
    &__text {
      :deep(p) {
        font-size: 1.3rem;
      }
      small {
        font-size: 1.1rem;
      }
    }
  }
  .testimonials {
    &__person {
      > div {
        &:first-child {
          width: 7.22rem;
          height: 7.22rem;
        }

        &:last-child {
          max-width: 16rem;

          h3 {
            font-size: 1.52rem;
            font-weight: bold;
          }
          p {
            font-size: 1.3rem;
          }
        }
      }
    }
    &__text {
      :deep(p) {
        line-height: 1.3;
        font-size: 1.2rem;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .biography-about {
    display: flex;
    flex-direction: column;
    gap: 14px;
    &__text {
      :deep(p) {
        font-size: 4vw;
      }

      small {
        font-size: 3vw;
      }
    }
  }

  .testimonials {
    padding: 0 1rem 5rem;
    flex-direction: column;
    gap: 180px;
    &__item {
      flex-basis: 100%;
    }

    &__person {
      > div {
        &:first-child {
          width: fit-content;
          height: fit-content;
          img,
          picture {
            width: 96px;
            height: 96px;
          }
        }

        &:last-child {
          h3 {
            font-size: 6vw;
          }

          p {
            font-size: 6vw;
            margin-top: 8px;
          }
        }
      }
    }

    &__text {
      gap: 16px;
      > div {
        &:nth-child(odd) {
          svg {
            width: 32px;
          }
        }
      }

      :deep(p) {
        font-size: 5vw;
      }
    }
  }

  :deep(.video-greeting) {
    .video-greeting__text {
      margin-top: 40px;
    }
  }
}
</style>
