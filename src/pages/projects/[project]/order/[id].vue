<script lang="ts" setup>
import type { Swiper } from "swiper/types";
const config = useRuntimeConfig();
const route = useRoute();
const projectId = route.params.project;
const imageId = Number(route.params.id);

const projectImage = ref(null);
const fetch = async () => {
  const { data } = await useFetch(
    `${config.apiBaseUrl}/projects/${projectId}/image/${imageId}`
  );
  projectImage.value = data.value;
};
fetch();

const moreOrdersSwiper = ref<Swiper | null>(null);

const initMoreOrdersSwiper = (swiper: Swiper) => {
  moreOrdersSwiper.value = swiper;
};

const moreProjectImages = computed(() => {
  return projectImage.value?.project?.project_images
    ?.filter((i: any) => i.id !== imageId)
    ?.map((i: any) => ({ id: i.id, name: i.name, url: i.files[0]?.url }));
});

const { type: typeScreen } = useBreakpoints();
const slidesPerView = computed(() => {
  return typeScreen.value === "xs" ? 1 : 2;
});
</script>

<template>
  <main>
    <Title> Карта фото </Title>
    <AppPageHead
      only-logo
      :title="projectImage?.name"
      :sub="`projects/${projectImage?.project?.id}`"
    />
    <section class="order">
      <h3 class="order__title_mobile">{{ projectImage?.name }}</h3>
      <div class="order__gallery">
        <img :src="projectImage?.files[0]?.url" alt="" />
        <div class="order__gallery-list">
          <img
            v-for="img in projectImage?.files.slice(1)"
            :key="img.id"
            class="upper-slide"
            :src="img?.url"
            alt=""
          />
        </div>
      </div>
      <div class="order__info">
        <h3>{{ projectImage?.name }}</h3>
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
        <div class="order__info-control">
          <div class="order__info-quanity">
            <AppFormQuanity />
          </div>
          <div class="order__info-colorlist">
            <b> Interior best collors: </b>
            <div class="order__info-color-interior">
              <ul class="order__info-colors">
                <li style="background-color: #07343d"></li>
                <li style="background-color: #63aebd"></li>
                <li style="background-color: #b99766"></li>
                <li style="background-color: #ffd73e"></li>
              </ul>
              <!-- <div class="order__info-interior upper-slide">In Interior</div> -->
            </div>
          </div>
        </div>
        <UIButton href="/">ORDER</UIButton>
      </div>
    </section>

    <!-- Раздел "More Abstract" -->
    <section v-if="moreProjectImages?.length" class="more">
      <h2 class="more__title">MORE ABSTRACT</h2>
      <p class="more__subtitle">View the entire collection</p>
      <Swiper
        class="more__slider"
        :modules="[SwiperMousewheel]"
        :mousewheel="true"
        :slides-per-view="slidesPerView"
        :space-between="40"
        :speed="1000"
        @swiper="initMoreOrdersSwiper"
      >
        <SwiperSlide
          v-for="moreProjectImage in moreProjectImages"
          :key="`more__slider-item-${moreProjectImage.id}`"
        >
          <AppPortMoreOrder
            v-bind="moreProjectImage"
            :project-id="projectId"
            class="more__slider-item"
          />
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

  &__title_mobile {
    display: none;
  }

  &__gallery {
    flex: 1 1 60%;

    > img {
      width: 100%;
      height: 100%;
      min-height: 800px;
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
      font-weight: 400;
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
        background-color: #fff;
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
      // display: flex;
      // gap: 50px;
    }

    &-item {
      //width: 888px;
    }
  }
}

@media screen and (max-width: 479px) {
  .order {
    flex-direction: column;
    padding: 0px 16px;
    gap: 28px;

    &__title_mobile {
      display: block;
      font-size: 36px;
      font-weight: 600;
    }
    &__gallery {
      > img {
        min-height: 320px;
        max-height: 320px;
      }
      &-list {
        margin-top: 12px;
        > img {
          max-width: 80px;
          min-height: 58px;
          max-height: 58px;
          border-radius: 10px;
        }
      }
    }
    &__info {
      > h3 {
        display: none;
      }
      b,
      small,
      p {
        font-size: 22px;
        font-weight: 400;
        line-height: 32px;
      }

      b {
        font-weight: bold;
      }

      &-control {
        display: flex;
        margin-bottom: 40px;
        justify-content: space-between;
        padding-right: 50px;
      }
      &-quanity {
        :deep(.form__control) {
          margin-top: 8px;
        }
      }
      &-colorlist {
        margin: 0;
      }
      &-color-interior {
        flex-direction: column;
        gap: 30px;
      }
      &-colors {
        li {
          width: 44px;
          height: 44px;
        }
      }
      &-interior {
        padding: 6px 40px;
        font-size: 20px;
        align-self: flex-start;
      }
    }
  }

  .more {
    padding: 65px 16px 108px;
    &__title {
      font-size: 60px;
      line-height: 80px;
      margin-left: 0;
    }
    &__subtitle {
      font-size: 26px;
      margin-top: 10px;
    }
    &__slider {
      :deep(.swiper-wrapper) {
        //gap: 0;
      }
      &-item {
        //width: 100%;
      }
    }
  }
}
</style>
