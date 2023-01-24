<script lang="ts" setup>
// import "swiper/css";
const thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
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
            :modules="[SwiperNavigation, SwiperThumbs]"
            :slides-per-view="1"
            :centered-slides="true"
            :space-between="10"
            :navigation="true"
            :thumbs="{ swiper: thumbsSwiper }"
          >
            <SwiperSlide v-for="slide in 3" :key="slide">
              <img
                src="https://static.tildacdn.com/tild3235-3732-4330-a537-333065613437/Ice-Sprout-Iceland-0.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide v-for="slide in 3" :key="slide">
              <img
                src="https://static.tildacdn.com/tild3235-3732-4330-a537-333065613437/Ice-Sprout-Iceland-0.jpg"
                alt=""
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div class="swiper-slider__thumb">
          <Swiper
            slides-per-view="auto"
            :slide-to-clicked-slide="true"
            :watch-slides-visibility="true"
            :watch-slides-progress="true"
            @swiper="setThumbsSwiper"
          >
            <SwiperSlide v-for="slide in 3" :key="slide">
              <img
                src="https://static.tildacdn.com/tild3235-3732-4330-a537-333065613437/Ice-Sprout-Iceland-0.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide v-for="slide in 3" :key="slide">
              <img
                src="https://static.tildacdn.com/tild3235-3732-4330-a537-333065613437/Ice-Sprout-Iceland-0.jpg"
                alt=""
              />
            </SwiperSlide>
          </Swiper>
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
    grid-template-columns: minmax(max-content, 465px) minmax(320px, 1fr) 320px;
    column-gap: 45px;
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
          margin-top: 50px;
        }
      }
    }

    .swiper {
      &-slider {
        &__main {
          overflow: hidden;

          :deep(.swiper-wrapper) {
            display: flex;
            max-height: 600px;
          }

          :deep(.swiper-slide) {
            flex: 0 0 100% !important;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }

        &__thumb {
          overflow: hidden;

          :deep(.swiper-wrapper) {
            display: flex;
          }

          :deep(.swiper-slide-thumb-active) {
            border: 1px solid $colorAccentBlue;
          }

          :deep(.swiper-slide) {
            flex: 0 0 33.3%;
            border-radius: $borderRadiusMain;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
