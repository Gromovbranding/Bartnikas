<script lang="ts" setup>
import type { Swiper } from "swiper/types";

const thumbsSwiper = ref<Swiper | null>(null);
const mainSwiper = ref<Swiper | null>(null);

const initThumbsSwiper = (swiper: Swiper) => {
  thumbsSwiper.value = swiper;
};

const initMainSwiper = (swiper: Swiper) => {
  mainSwiper.value = swiper;
};

const handleSlideChange = (direction: "slideNext" | "slidePrev") => {
  if (mainSwiper.value) {
    mainSwiper.value[direction]();
  }
};
</script>

<template>
  <div>
    <section class="interios-order">
      <AppSectionHeader :is-link="false"> IN INTERIORS </AppSectionHeader>
      <div class="interios-order__content">
        <div class="interios-order__sl">
          <div class="interios-order__project-select">
            <span>Project:</span>
            <UISelect
              :list="[
                {
                  label: 'xPalienko',
                  value: 'xPalienko',
                },
                {
                  label: 'xPalienko2',
                  value: 'xPalienko2',
                },
                {
                  label: 'xPalienko3',
                  value: 'xPalienko3',
                },
              ]"
            />
          </div>
          <div class="interios-order__project-name">
            <h3>Name Photo</h3>
          </div>
          <div class="interios-order__project-colors">
            <h4>Best Colors Of Interior:</h4>
            <div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div class="interios-order__project-order">
            <UIButton style="width: 100%"> Order </UIButton>
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
            <SwiperSlide v-for="slide in 6" :key="`swiper-slide-main-${slide}`">
              <img
                src="https://static.tildacdn.com/tild3235-3732-4330-a537-333065613437/Ice-Sprout-Iceland-0.jpg"
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
              v-for="slide in 6"
              :key="`swiper-slide-thumb-${slide}`"
            >
              <img
                src="https://static.tildacdn.com/tild3235-3732-4330-a537-333065613437/Ice-Sprout-Iceland-0.jpg"
                alt=""
              />
            </SwiperSlide>
          </Swiper>

          <div class="swiper-slider__main-navigation">
            <UIButton @click="handleSlideChange('slidePrev')"> ← </UIButton>
            <UIButton @click="handleSlideChange('slideNext')"> → </UIButton>
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
    height: 100%;

    .interios-order__sl {
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
          margin-top: 60px;
          margin-bottom: 90px;
          font-size: 42px;
          font-weight: 600;
        }

        &-colors {
          h4 {
            margin-bottom: 30px;
            font-size: 32px;
            font-weight: 500;
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

              &:nth-child(1) {
                background-color: #1a1c28;
              }

              &:nth-child(2) {
                background-color: #353736;
              }

              &:nth-child(3) {
                background-color: #545c20;
              }

              &:nth-child(4) {
                background-color: #a66456;
              }

              &:nth-child(5) {
                background-color: #a49484;
              }

              &:nth-child(6) {
                background-color: #8a88a0;
              }
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
            max-height: 650px;
          }

          :deep(.swiper-slide) {
            flex: 0 0 100% !important;
            img {
              width: 100%;
              height: 100%;
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

          :deep(.swiper-wrapper) {
            display: flex;
            gap: 10px;
            max-height: 94px;
          }

          :deep(.swiper-slide-thumb-active) {
            border: 1px solid $colorAccentBlue;
          }

          :deep(.swiper-slide) {
            flex: 0 0 calc(50% - 9px);
            border-radius: $borderRadiusMain;
            width: 100% !important;
            img {
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
</style>
