<script lang="ts" setup>
import type { Swiper } from 'swiper/types'
import type { IProject } from '~/types/admin-api'

const thumbsSwiper = ref<Swiper | null>(null)
const mainSwiper = ref<Swiper | null>(null)
const selectedIdx = ref(0)

const initThumbsSwiper = (swiper: Swiper) => {
  thumbsSwiper.value = swiper
}

const initMainSwiper = (swiper: Swiper) => {
  mainSwiper.value = swiper
}

const handleSlideChange = (direction: 'slideNext' | 'slidePrev') => {
  if (mainSwiper.value) {
    mainSwiper.value[direction]()
  }
}

const { getAllProjects } = usePublicData()

const { data: projects } = await useAsyncData<IProject[]>(
  'projects',
  async () => await getAllProjects()
)

const options = computed(() =>
  (projects.value ?? []).map((item, idx) => ({
    label: item.title,
    value: idx
  }))
)

const project = computed(
  () =>
    projects.value?.[selectedIdx.value] ?? {
      details: [],
      id: null
    }
)

const orderImgLink = computed(() => {
  if (!project.value.id || !mainSwiper.value) { return '/projects' }
  const imgId = project.value.details[mainSwiper.value.activeIndex].id
  return `/projects/${project.value.id}/order/${imgId}`
})

const colors = [
  '#1a1c28',
  '#353736',
  '#545c20',
  '#a66456',
  '#a49484',
  '#8a88a0'
]

function copyColor (idx: number) {
  navigator.clipboard.writeText(colors[idx])
}
</script>

<template>
  <div v-if="false">
    <section class="interios-order">
      <AppSectionHeader :is-link="false">
        {{ $t("secrionInteriosOrder.inInterios") }}
      </AppSectionHeader>
      <div class="interios-order__content">
        <div class="interios-order__sl">
          <div class="interios-order__project-select">
            <span>{{ $t("secrionInteriosOrder.project") }}</span>
            <UISelect :list="options" @change="selectedIdx = +$event.value" />
          </div>
          <div class="interios-order__project-name">
            <h3>
              {{ project.details[mainSwiper?.realIndex ?? 0]?.image_name }}
            </h3>
          </div>
          <div class="interios-order__project-colors">
            <h4>{{ $t("secrionInteriosOrder.bestColorsOfInterior") }}</h4>
            <div>
              <div
                v-for="(color, idx) in colors"
                :key="color"
                :style="{ 'background-color': color }"
                title="copy HEX code to clipboard"
                @click="copyColor(idx)"
              />
            </div>
            <div class="controls">
              <UIButton @click="handleSlideChange('slidePrev')">
                ←
              </UIButton>
              <UIButton @click="handleSlideChange('slideNext')">
                →
              </UIButton>
              <UIButton :to="orderImgLink">
                {{ $t("secrionInteriosOrder.request") }}
              </UIButton>
            </div>
          </div>
          <div class="interios-order__project-order">
            <UIButton style="width: 100%" :to="orderImgLink">
              {{ $t("secrionInteriosOrder.request") }}
            </UIButton>
          </div>
        </div>
        <div class="swiper-slider__main">
          <Swiper
            navigation
            centered-slides
            :modules="[SwiperThumbs]"
            :slides-per-view="1"
            :space-between="10"
            :thumbs="{ swiper: thumbsSwiper }"
            @swiper="initMainSwiper"
          >
            <SwiperSlide
              v-for="slide in project.details"
              :key="`swiper-slide-main-${slide.id}`"
            >
              <NuxtImg
                loading="lazy"
                :src="`/baseApiFiles/${slide.image.name}`"
                alt=""
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div class="swiper-slider__thumb">
          <Swiper
            slide-to-clicked-slide
            watch-slides-visibility
            watch-slides-progress
            :slides-per-view="2"
            @swiper="initThumbsSwiper"
          >
            <SwiperSlide
              v-for="slide in project.details"
              :key="`swiper-slide-thumb-${slide.id}`"
            >
              <NuxtImg
                loading="lazy"
                :src="`/baseApiFiles/${slide.image.name}`"
              />
            </SwiperSlide>
          </Swiper>

          <div class="swiper-slider__main-navigation">
            <UIButton @click="handleSlideChange('slidePrev')">
              ←
            </UIButton>
            <UIButton @click="handleSlideChange('slideNext')">
              →
            </UIButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.interios-order {
  background-color: $colorBackgroundGrey;
  padding: 80px 40px;

  &__content {
    display: grid;
    grid-template-columns: minmax(max-content, 395px) minmax(320px, 1fr) 200px;
    column-gap: 70px;
    max-height: 650px;

    .interios-order__sl {
      max-width: 402px;
      .interios-order__project {
        &-select {
          display: flex;
          align-items: center;
          gap: 25px;

          span {
            font-size: 32px;
            font-weight: 400;
          }
        }

        &-name {
          word-wrap: break-word;
          margin-top: 60px;
          margin-bottom: 90px;
          font-size: 42px;
          font-weight: 600;
        }

        &-colors {
          h4 {
            margin-bottom: 30px;
            font-size: 32px;
            font-weight: 400;
          }
          .controls {
            display: none;
          }

          > div {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            max-width: 380px;

            > div {
              background-color: transparent;
              width: 80px;
              height: 45px;
              border-radius: $borderRadiusMain;
              cursor: pointer;
            }
          }
        }

        &-order {
          margin-top: 31.5%;
        }
      }
    }

    .swiper {
      &-slider {
        &__main {
          overflow: hidden;

          :deep(.swiper-wrapper) {
            display: flex;
            // max-height: 34.8rem;
          }

          :deep(.swiper-slide) {
            flex: 0 0 100% !important;
            img,
            picture {
              width: 100%;
              height: 650px;
              object-fit: cover;
            }
          }

          &-navigation {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 15px;
            margin-top: auto;

            :deep(.btn-default) {
              padding: 20px 22px;
            }
          }
        }

        &__thumb {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          img,
          picture {
            aspect-ratio: 1;
          }

          :deep(.swiper-wrapper) {
            display: flex;
            gap: 0.5rem;
            max-height: 4.25rem;
            width: 9.5rem;
          }

          :deep(.swiper-thumbs) {
            margin-right: 4.5rem;
          }

          :deep(.swiper-slide-thumb-active) {
            border: 1px solid $colorAccentBlue;
          }

          :deep(.swiper-slide) {
            flex: 0 0 4.25rem;
            border-radius: $borderRadiusMain;
            width: 100% !important;
            img,
            picture {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
      }
    }
  }
}

@media screen and (min-width: 551px) and (max-width: 1000px) {
  .interios-order {
    &__content {
      display: flex;
      flex-direction: column;
      .interios-order__sl {
        position: relative;
        .interios-order__project {
          &-select {
            gap: 1rem;
            span {
              font-size: 1.7rem;
            }
          }

          &-name {
            margin: 0;
            font-size: 34px;
          }

          &-colors {
            margin: 0;
            display: grid;
            grid-template-columns: 30% 1fr;
            grid-template-rows: auto auto;
            h4 {
              font-size: 24px;
              margin-bottom: 20px;
              grid-column: span 2;
            }
            .controls {
              display: flex;
              justify-content: space-between;
              max-width: 100%;
              align-items: flex-end;
              > :first-child {
                margin-left: auto;
                width: 5rem;
                height: 5rem;
                padding: 0;
                font-size: 2rem;
              }
              > :nth-child(2) {
                margin-right: auto;
                width: 5rem;
                height: 5rem;
                padding: 0;
                font-size: 2rem;
              }
              > :last-child {
                width: 21.5rem !important;
              }
            }
          }

          &-order {
            display: none;
          }
        }
      }

      .swiper {
        &-slider {
          &__main {
            margin-top: 2rem;
            order: -1;

            :deep(.swiper-slide) {
              img,
              picture {
                height: 36rem;
              }
            }

            &-navigation {
              display: none;
            }
          }
          &__thumb {
            order: -1;
            :deep(.swiper-wrapper) {
              max-height: initial;
            }

            :deep(.swiper-thumbs) {
              margin-right: 4.5rem;
            }
          }
        }
      }
    }
    &__project-select {
      margin-block: 2rem;
    }
    &__project-name {
      h3 {
        margin-bottom: 2rem;
      }
    }
  }

  :deep(.caption) {
    margin-bottom: 60px;
    h2 {
      font-size: 12vw;
    }
  }
}

@media screen and (max-width: 550px) {
  .interios-order {
    padding: 50px 16px;
    &__content {
      display: flex;
      flex-direction: column;
      height: 800px;
      .interios-order__sl {
        position: relative;
        .interios-order__project {
          &-select {
            gap: 14px;
            span {
              font-size: 26px;
            }
          }

          &-name {
            position: absolute;
            top: 470px;
            margin: 0;
            font-size: 34px;
          }

          &-colors {
            position: absolute;
            top: 530px;
            margin: 0;
            h4 {
              font-size: 24px;
              margin-bottom: 20px;
            }

            > div {
              max-width: 50%;
              > div {
                width: 45px;
                &:nth-child(1) {
                }

                &:nth-child(2) {
                }

                &:nth-child(3) {
                }

                &:nth-child(4) {
                }

                &:nth-child(5) {
                }

                &:nth-child(6) {
                }
              }
            }
          }

          &-order {
            position: absolute;
            top: 720px;
            width: 100%;
            margin: 0;
          }
        }
      }

      .swiper {
        &-slider {
          &__main {
            margin-top: 30px;
            :deep(.swiper-button-prev) {
              display: none;
            }
            :deep(.swiper-button-next) {
              display: none;
            }
            :deep(.swiper-wrapper) {
              min-height: 264px;
              max-height: 264px;
            }

            :deep(.swiper-slide) {
              img,
              picture {
                height: 250px;
              }
            }

            &-navigation {
              margin-top: 200px;
              justify-content: flex-end;
              gap: 22px;
              :deep(.btn-default) {
                padding: 8px 10px;
              }
            }
          }

          &__thumb {
            :deep(.swiper-wrapper) {
            }

            :deep(.swiper-slide-thumb-active) {
            }

            :deep(.swiper-slide) {
              // flex: 0 0 calc(58px);
              img,
              picture {
                // min-height: 58px;
                // max-height: 58px;
              }
            }
          }
        }
      }
    }
  }
  .swiper-slider {
    &__main {
      &-navigation {
        padding-right: 3px;
      }
    }
  }

  :deep(.caption) {
    margin-bottom: 60px;
    h2 {
      font-size: 12vw;
    }
  }
}
</style>

<style lang="scss">
.interios-order {
  .swiper-button-prev,
  .swiper-button-next {
    display: none;
  }
}
</style>
