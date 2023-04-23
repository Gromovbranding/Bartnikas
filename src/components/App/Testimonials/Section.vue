<script lang="ts" setup>
// import type { Swiper } from "swiper/types";
// const moreOrdersSwiper = ref<Swiper | null>(null);
// const sliderOffset = ref(0);
const wrapper = ref<HTMLDivElement>();
const root = ref<HTMLDivElement>();
const lastScrollTop = ref(0);
// const isSliderActive = ref(false);
const scrollProgress = ref(0);

// const initMoreOrdersSwiper = (swiper: Swiper) => {
//   moreOrdersSwiper.value = swiper;
// };

// const { type: typeScreen } = useBreakpoints();
// const slidesPerView = computed(() => {
//   return typeScreen.value === "xs" ? 1 : 4;
// });
// const spaceBetween = computed(() => {
//   return typeScreen.value === "xs" ? 10 : 120;
// });

const onScroll = () => {
  if (!root.value || !wrapper.value) return;
  const rootHeight = root.value?.offsetHeight || 100;
  const scrollTop = document.documentElement.scrollTop;
  // const maxScroll =
  //   root.value.offsetTop + rootHeight - wrapper.value.offsetHeight - 60;
  const progress =
    scrollTop -
    (root.value.offsetTop +
      (root.value.querySelector("h2")?.offsetHeight || 0));
  const progressPercent =
    (progress / (rootHeight - wrapper.value.offsetHeight - 300)) * 100;
  if (progressPercent < 0) scrollProgress.value = 0;
  else if (progressPercent >= 0 && progressPercent < 100) {
    scrollProgress.value = Math.floor(progressPercent);
  } else scrollProgress.value = 100;
  lastScrollTop.value = scrollTop;
};

onMounted(() => {
  lastScrollTop.value = document.documentElement.scrollTop;
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
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
  <section ref="root" class="testimonials">
    <AppSectionHeader :is-link="false">Testimonials</AppSectionHeader>
    <!-- <div class="testimonials__content">
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
    </div> -->
    <div
      ref="wrapper"
      class="sticky-wrapper"
      :style="{ '--offset': `${-scrollProgress}%` }"
    >
      <div class="testimonials__content2">
        <AppTestimonialsItem
          v-for="item in items"
          :key="item.id"
          :img="item.img"
          :name="item.name"
          :profession="item.profession"
        />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.sticky-wrapper {
  position: sticky;
  top: 100px;
  // transform: translateX(var(--offset));
  // transform: translateX(0%);
  // padding-inline: 25%;
  overflow: hidden;
  margin-inline: -40px;
}
.testimonials {
  padding: 60px 40px 80px;
  min-height: 200vh;
  &__content {
  }
  &__content2 {
    display: flex;
    gap: 20px;
    transform: translateX(var(--offset));
    padding-left: 50%;
    transition-duration: 100ms;
    > * {
      transform: translateX(-50%);
    }
  }
}

:deep(.caption) {
  h2 {
    font-size: 12vw;
  }
}

@media screen and (max-width: 549px) {
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
