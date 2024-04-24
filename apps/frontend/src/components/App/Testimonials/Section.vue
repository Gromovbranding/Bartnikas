<script lang="ts" setup>
const wrapper = ref<HTMLDivElement>()
const root = ref<HTMLDivElement>()
const lastScrollTop = ref(0)
const scrollProgress = ref(0)
const { getAllTestimonials } = usePublicData()

const { data: testimonials } = await useAsyncData(
  'testimonials',
  async () => await getAllTestimonials()
)

const sectionHeight = computed(
  () => `${30 * (testimonials.value?.length || 1) + 15}rem`
)
// const section_height = computed(() => `${30*3+20}rem`)
// const section_height = computed(() => `${40*3+13}rem`)

const onScroll = () => {
  if (!root.value || !wrapper.value || testimonials.value!.length <= 3) { return }
  const rootHeight = root.value?.offsetHeight || 100
  const scrollTop = document.documentElement.scrollTop
  // const progress =
  //   scrollTop -
  //   (root.value.offsetTop +
  //     (root.value.querySelector("h2")?.offsetHeight || 0));
  const progress = scrollTop - root.value.offsetTop
  const progressPercent =
    (progress / (rootHeight - wrapper.value.offsetHeight)) * 100
  if (progressPercent < 0) { scrollProgress.value = 0 } else if (progressPercent >= 0 && progressPercent < 100) {
    scrollProgress.value = Math.floor(progressPercent)
  } else { scrollProgress.value = 100 }
  lastScrollTop.value = scrollTop
}

onMounted(() => {
  lastScrollTop.value = document.documentElement.scrollTop
  window.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <section
    v-if="(testimonials ?? []).length > 0"
    ref="root"
    class="testimonials"
    :class="{ 'active-slider': testimonials!.length > 3 }"
  >
    <AppSectionHeader :is-link="false">
      {{
        $t("titles.testimonials")
      }}
    </AppSectionHeader>
    <div class="testimonials__content">
      <AppTestimonialsItem
        v-for="item in testimonials"
        :key="`top-testimonial-${item.id}`"
        :testimonial="item"
      />
    </div>
    <div ref="wrapper" class="sticky-wrapper">
      <div
        class="testimonials__content2"
        :style="{ '--offset': `${-scrollProgress}%` }"
      >
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
.active-slider {
  height: v-bind(sectionHeight);
  .testimonials__content2 {
    transform: translateX(var(--offset));
    margin-left: 50%;
    > * {
      transform: translateX(-50%);
      flex-shrink: 0;
    }
  }
  .sticky-wrapper {
    position: sticky;
    top: 100px;
    // transform: translateX(var(--offset));
    // transform: translateX(0%);
    // padding-inline: 25%;
    overflow: hidden;
    margin-inline: -3rem;
  }
}
.testimonials {
  padding: 4rem 3rem 6rem;
  &__content {
    display: none;
  }
  &__content2 {
    display: flex;
    gap: 1.5rem;
    transition-duration: 100ms;
    width: fit-content;
    margin-inline: auto;
    > * {
      flex-shrink: 0;
    }
  }
}

:deep(.caption) {
  h2 {
    font-size: 11.5vw;
  }
}

@media screen and (max-width: 1000px) {
  .testimonials {
    height: initial;
    padding-bottom: 0;
    &__content {
      display: flex;
      gap: 1rem;
      overflow: auto;
      margin-inline: -3rem;
      padding-bottom: 4rem;
      padding-left: 2rem;
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
      padding-right: 4rem;
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
