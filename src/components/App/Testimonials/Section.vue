<script lang="ts" setup>
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);
// import type { Swiper } from "swiper/types";
// const moreOrdersSwiper = ref<Swiper | null>(null);
// const sliderOffset = ref(0);
const wrapper = ref<HTMLDivElement>();
const root = ref<HTMLDivElement>();
// const lastScrollTop = ref(0);
// const isSliderActive = ref(false);
const scrollProgress = ref(0);
const { getAllTestimonials } = usePublicData();

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

const { data: testimonials } = useAsyncData(
  "testimonials",
  async () => await getAllTestimonials()
);

// const onScroll = () => {
//   if (!root.value || !wrapper.value) return;
//   const rootHeight = root.value?.offsetHeight || 100;
//   const scrollTop = document.documentElement.scrollTop;
//   const progress =
//     scrollTop -
//     (root.value.offsetTop +
//       (root.value.querySelector("h2")?.offsetHeight || 0));
//   const progressPercent =
//     (progress / (rootHeight - wrapper.value.offsetHeight - 300)) * 100;
//   if (progressPercent < 0) scrollProgress.value = 0;
//   else if (progressPercent >= 0 && progressPercent < 100) {
//     scrollProgress.value = Math.floor(progressPercent);
//   } else scrollProgress.value = 100;
//   lastScrollTop.value = scrollTop;
// };

// onMounted(() => {
//   lastScrollTop.value = document.documentElement.scrollTop;
//   window.addEventListener("scroll", onScroll);
// });

// onUnmounted(() => {
//   window.removeEventListener("scroll", onScroll);
// });
</script>

<template>
  <section
    v-if="(testimonials ?? []).length > 0"
    ref="root"
    class="testimonials"
  >
    <AppSectionHeader :is-link="false">Testimonials</AppSectionHeader>
    <div class="testimonials__content">
      <AppTestimonialsItem
        v-for="item in testimonials"
        :key="`top-testimonial-${item.id}`"
        :testimonial="item"
      />
    </div>
    <div
      ref="wrapper"
      class="sticky-wrapper"
      :style="{ '--offset': `${-scrollProgress}%` }"
    >
      <div class="testimonials__content2">
        <AppTestimonialsItem
          v-for="item in testimonials"
          :key="`bottom-testimonial-${item.id}`"
          :testimonial="item"
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
  padding: 4rem 3rem 6rem;
  // min-height: 200vh;
  &__content {
    display: none;
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

@media screen and (max-width: 1000px) {
  .testimonials {
    min-height: initial;
    padding-bottom: 0;
    &__content {
      display: flex;
      gap: 2rem;
      overflow: auto;
      margin-inline: -3rem;
      padding-bottom: 4rem;
      padding-left: 10rem;
      padding-right: 2rem;
    }
  }
  .sticky-wrapper {
    display: none;
  }
}

@media screen and (max-width: 550px) {
  .testimonials {
    padding: 2rem 2rem 0;
    &__content {
      margin-inline: 0;
      padding-inline: 0;
      margin-right: -2rem;
    }
  }

  :deep(.caption) {
    margin-bottom: 30px;
    h2 {
      font-size: 11vw;
    }
  }
}
</style>
