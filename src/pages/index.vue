<script lang="ts" setup>
import defBgImg from "@/assets/img/header_bg.jpg";
const { breakpoint } = useBreakpoints();
const { getActiveIndexCardFooter, getIndexSlider } = usePublicData();

const headerMain = ref<HTMLDivElement>();
const defImgSize = ref(115);
const imgSize = ref(`${defImgSize.value}%`);

const onScroll = () => {
  const height = headerMain.value?.offsetHeight ?? 0;
  const res = (window.scrollY / height) * 15;
  if (res <= 15) imgSize.value = `${Math.round(defImgSize.value - res)}%`;
};

const throttledListener = useThrottle(onScroll, 50);

const { data: activeIndexCard } = useAsyncData(
  "activeIndexCard",
  async () => await getActiveIndexCardFooter()
);

const { data: sliderImages } = useAsyncData(
  "sliderImages",
  async () => await getIndexSlider(),
  {
    default: () => [{ id: defBgImg, image: { name: defBgImg } }],
  }
);

onMounted(() => {
  defImgSize.value = breakpoint.value === "xs" ? 250 : 115;
  window.addEventListener("scroll", throttledListener);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", throttledListener);
});
</script>

<template>
  <main>
    <Title>Home</Title>
    <header class="header" style="height: 150vh">
      <div ref="headerMain" class="header__main">
        <IconLogo is-full-black />
      </div>
      <Swiper
        style="
          position: sticky;
          top: 0;
          z-index: -1;
          perspective: 1px;
          height: 120vh;
        "
        :mousewheel="false"
        :modules="[SwiperAutoplay, SwiperEffectFade]"
        :slides-per-view="1"
        :speed="1300"
        effect="fade"
        :loop="true"
        :autoplay="{
          delay: 2000,
        }"
      >
        <SwiperSlide v-for="item in sliderImages" :key="item.id">
          <img
            v-scroll-scale-image
            style="width: 100%; height: 100%; transition-duration: 100ms"
            :src="useGetFileByUrl(item?.image?.name)"
          />
        </SwiperSlide>
      </Swiper>
    </header>
    <AppSectionHotNews />
    <AppContentSpliter> CONCEPT </AppContentSpliter>
    <AppSectionVideoGreeting class="app-video-greeting" />
    <AppContentSpliter> PROJECTS </AppContentSpliter>
    <AppPortSection />
    <AppAwardsSection />
    <AppNewsSection />
    <AppSectionInteriosOrderSlider />
    <section v-if="activeIndexCard" class="home-info-project-paralax">
      <div>
        <img src="@/assets/img/index_parallax.jpg" alt="Parallax bg" />
      </div>
      <div>
        <h3>{{ activeIndexCard?.title }}</h3>
        <p>
          {{ activeIndexCard?.text }}
        </p>
        <UIButton :to="activeIndexCard?.button?.url">
          {{ activeIndexCard?.button.text }}
        </UIButton>
      </div>
    </section>
    <AppVideoSection />
    <AppTestimonialsSection />
  </main>
</template>

<style lang="scss" scoped>
.home-info-project-paralax {
  height: 250vh;
  position: relative;
  border-radius: $borderRadiusMain;

  > div {
    &:first-child {
      position: sticky;
      top: 0;

      img {
        height: 100vh;
        width: 100%;
        object-fit: cover;
      }
    }

    &:last-child {
      position: absolute;
      bottom: 10rem;
      padding: 5rem 2.5rem;
      max-width: 800px;
      left: 2rem;
      border-radius: $borderRadiusMain;
      background-color: $colorBackgroundGrey;

      h3 {
        font-size: 5rem;
        margin-bottom: 20px;
        font-weight: bold;
      }

      p {
        font-size: 24px;
        font-weight: 400;
        line-height: 1.7;
      }

      a {
        margin-top: 60px;
      }
    }
  }
}

.header {
  &__main {
    width: 100%;
    height: 675px;
    display: flex;
    justify-content: center;
    align-content: center;

    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    background-color: #fff;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    &:deep(svg) {
      max-width: 575px;
      width: 100%;
    }
  }
}

@media screen and (max-width: 1000px) {
  .header {
    &__main {
      height: calc(100vh + 10px);
      &:deep(svg) {
        max-width: 30rem;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .header {
    &__main {
      height: 50vh;
      &:deep(svg) {
        width: 88%;
      }
    }
  }

  .app-video-greeting {
    margin-bottom: 80px;
  }

  .home-info-project-paralax {
    height: 2000px;

    > div {
      &:first-child {
        img {
        }
      }

      &:last-child {
        padding: 60px 16px;
        left: 16px;
        right: 16px;
        h3 {
          font-size: 50px;
          word-wrap: break-word;
          margin-bottom: 12px;
        }

        p {
          font-size: 20px;
          line-height: 1.6;
        }

        button {
          font-size: 32px;
        }
      }
    }
  }
}
</style>
