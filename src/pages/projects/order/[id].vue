<script lang="ts" setup>
import type { Swiper } from "swiper/types";
const { fetchGet } = useApi();

const moreOrdersSwiper = ref<Swiper | null>(null);

const initMoreOrdersSwiper = (swiper: Swiper) => {
  moreOrdersSwiper.value = swiper;
};

const { data: moreOrders } = useAsyncData(
  "projects",
  async () => await fetchGet("/projects")
);
</script>

<template>
  <main>
    <Title> Photo Card </Title>
    <AppPageHead only-logo title="Name Photo" sub="projects/1" />
    <section class="order">
      <div class="order__gallery">
        <img
          src="https://static.tildacdn.com/tild3537-3531-4564-b065-656465303135/wealth.png"
          alt=""
        />
        <div class="order__gallery-list">
          <img
            class="upper-slide"
            src="https://static.tildacdn.com/tild3537-3531-4564-b065-656465303135/wealth.png"
            alt=""
          />
          <img
            class="upper-slide"
            src="https://static.tildacdn.com/tild3537-3531-4564-b065-656465303135/wealth.png"
            alt=""
          />
          <img
            class="upper-slide"
            src="https://static.tildacdn.com/tild3537-3531-4564-b065-656465303135/wealth.png"
            alt=""
          />
        </div>
      </div>
      <div class="order__info">
        <h3>Name Photo</h3>
        <ul class="order__info-checklist">
          <li>
            <b>Preferred size:</b>
            <div>
              <small>
                All photos are delivered in two main proportions: 4:3 and 6:4
              </small>
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
              <small> Individual sizes are available upon request. </small>
            </div>
          </li>
          <li>
            <b>Limited Edition:</b>
            <small>
              All photographs are printed in a limited edition of a maximum of
              several dozen copies, depending on the work and its size.
            </small>
          </li>
          <li>
            <b>Paper Print:</b>
            <small>
              Canson Infinity Platine Fibre Rag Satin fine art paper, 100%
              cotton
            </small>
          </li>
          <li>
            <b>Delivery:</b>
            <small> free worldwide (DHL Express) </small>
          </li>
        </ul>
        <div>
          <AppFormQuanity />
        </div>
        <div class="order__info-colorlist">
          <b> Interior best collors: </b>
          <div>
            <ul class="order__info-colors">
              <li style="background-color: #07343d"></li>
              <li style="background-color: #63aebd"></li>
              <li style="background-color: #b99766"></li>
              <li style="background-color: #ffd73e"></li>
            </ul>
            <div class="order__info-interior upper-slide">In Interior</div>
          </div>
        </div>
        <UIButton href="/">ORDER</UIButton>
      </div>
    </section>

    <!-- Раздел "More Abstract" -->
    <section class="more">
      <h2 class="more__title">MORE ABSTRACT</h2>
      <p class="more__subtitle">View the entire collection</p>
      <Swiper
        class="more__slider"
        :modules="[SwiperMousewheel]"
        :mousewheel="true"
        :slides-per-view="2"
        :speed="1000"
        @swiper="initMoreOrdersSwiper"
      >
        <SwiperSlide
          v-for="moreOrder in moreOrders"
          :key="`more__slider-item-${moreOrder.id}`"
        >
          <AppPortMoreOrder v-bind="moreOrder" class="more__slider-item" />
        </SwiperSlide>
      </Swiper>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.order {
  display: flex;
  gap: 60px;
  padding: 0 40px;
  margin-bottom: 80px;
  height: 100%;

  &__gallery {
    flex: 1 1 60%;

    > img {
      width: 100%;
      height: 100%;
      max-height: 800px;
      object-fit: cover;
      border-radius: $borderRadiusMain;
    }

    &-list {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 20px;
      > img {
        max-width: 110px;
        max-height: 75px;
        border-radius: $borderRadiusMain + 12px;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  &__info {
    flex: 1 1 40%;

    b,
    small,
    p {
      font-size: 13px;
      font-weight: 500;
    }

    b {
      font-weight: bold;
    }

    > h3 {
      font-size: 36px;
      font-weight: bold;
      margin-bottom: 35px;
    }

    &-checklist {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-bottom: 40px;

      :deep(.select) {
        margin: 20px 0;
      }
    }

    &-colorlist {
      margin-bottom: 40px;
      margin-top: 40px;

      > div {
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }

    &-colors {
      display: flex;
      gap: 15px;
      align-items: center;
      li {
        width: 48px;
        height: 48px;
        border-radius: $borderRadiusMain;
      }
    }

    &-interior {
      border-radius: $borderRadiusMain;
      font-size: 24px;
      background-color: #f5f4f4;
      line-height: 1.55;
      padding: 8px 25px;
      font-weight: 600;
      cursor: pointer;
    }

    > :deep(.btn-default) {
      width: 100%;
    }
  }
}

.more {
  padding: 65px 65px 108px;
  background-color: #eceae8;

  &__title {
    margin-left: -12px;
    color: #000000;
    font-size: 190px;
    font-weight: bold;
    letter-spacing: 5px;
  }

  &__subtitle {
    color: #999999;
    font-size: 33px;
    margin-top: 23px;
  }

  &__slider {
    margin-top: 54px;
    :deep(.swiper-wrapper) {
      display: flex;
      gap: 50px;
    }

    &-item {
      width: 888px;
    }
  }
}
</style>
