<script lang="ts" setup>
import type { Swiper } from "swiper/types";
const moreOrdersSwiper = ref<Swiper | null>(null);

const initMoreOrdersSwiper = (swiper: Swiper) => {
  moreOrdersSwiper.value = swiper;
};

const { type: typeScreen } = useBreakpoints();
const slidesPerView = computed(() => {
  return typeScreen.value === "xs" ? 1 : 4;
});
const spaceBetween = computed(() => {
  return typeScreen.value === "xs" ? 10 : 120;
});

const items = ref([
  {
    id: 1,
    img: "https://static.tildacdn.com/tild3333-6466-4162-b835-313361366137/noroot.png",
    name: "Alexander Palienko",
    profession: "Сoach, analyst",
  },
  {
    id: 2,
    img: "https://static.tildacdn.com/tild3333-6466-4162-b835-313361366137/noroot.png",
    name: "Alexander Palienko",
    profession: "Сoach, analyst",
  },
  {
    id: 3,
    img: "https://static.tildacdn.com/tild3333-6466-4162-b835-313361366137/noroot.png",
    name: "Alexander Palienko",
    profession: "Сoach, analyst",
  },
  {
    id: 4,
    img: "https://static.tildacdn.com/tild3333-6466-4162-b835-313361366137/noroot.png",
    name: "Alexander Palienko",
    profession: "Сoach, analyst",
  },
  {
    id: 5,
    img: "https://static.tildacdn.com/tild3333-6466-4162-b835-313361366137/noroot.png",
    name: "Alexander Palienko",
    profession: "Сoach, analyst",
  },
  {
    id: 6,
    img: "https://static.tildacdn.com/tild3333-6466-4162-b835-313361366137/noroot.png",
    name: "Alexander Palienko",
    profession: "Сoach, analyst",
  },
]);
</script>

<template>
  <section class="testimonials">
    <AppSectionHeader :is-link="false">Testimonials</AppSectionHeader>
    <div class="testimonials__content">
      <Swiper
        class="more__slider"
        :modules="[SwiperMousewheel]"
        :mousewheel="true"
        :slides-per-view="slidesPerView"
        :space-between="spaceBetween"
        :speed="1000"
        @swiper="initMoreOrdersSwiper"
      >
        <SwiperSlide
          v-for="item in items"
          :key="`testimonials-slider-item-${item.id}`"
        >
          <AppTestimonialsItem
            :img="item.img"
            :name="item.name"
            :profession="item.profession"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.testimonials {
  padding: 60px 40px 80px;
  &__content {
  }
}

:deep(.caption) {
  h2 {
    font-size: 12vw;
  }
}

@media screen and (max-width: 479px) {
  .testimonials {
    padding: 30px 16px 50px;
  }

  :deep(.caption) {
    margin-bottom: 30px;
    h2 {
      font-size: 11vw;
    }
  }
}
</style>
