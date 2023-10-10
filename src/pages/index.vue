<script lang="ts" setup>
import defBgImg from "@/assets/img/header_bg.jpg";
const { breakpoint } = useBreakpoints();
const { getIndexSlider, getActiveIndexCardFooter } = usePublicData();

const headerMain = ref<HTMLDivElement>();
const defImgSize = ref(115);
const imgSize = ref(`${defImgSize.value}%`);

const onScroll = () => {
  const height = headerMain.value?.offsetHeight ?? 0;
  const res = (window.scrollY / height) * 15;
  if (res <= 15) imgSize.value = `${Math.round(defImgSize.value - res)}%`;
};

const throttledListener = useThrottle(onScroll, 50);

const { data: indexSlider } = useAsyncData(
  "slider",
  async () => await getIndexSlider()
);

const { data: activeIndexCard } = useAsyncData(
  "activeIndexCard",
  async () => await getActiveIndexCardFooter()
);

const sliderImg = computed(
  () => `url(${useGetFileByUrl(indexSlider.value?.image?.name) ?? defBgImg})`
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
    <header class="header">
      <div ref="headerMain" class="header__main">
        <IconLogo is-full-black />
      </div>
      <div class="header__img-sticky"></div>
    </header>
    <AppSectionHotNews />
    <AppContentSpliter> CONCEPT </AppContentSpliter>
    <AppSectionVideoGreeting class="app-video-greeting" />
    <AppContentSpliter> PROJECTS </AppContentSpliter>
    <AppPortSection />
    <AppAwardsSection />
    <AppNewsSection />
    <AppSectionInteriosOrderSlider />
    <section class="home-info-project-paralax">
      <div>
        <img src="@/assets/img/index_parallax.jpg" alt="Parallax bg" />
      </div>
      <div>
        <h3>{{ activeIndexCard?.title }}</h3>
        <p>
          {{ activeIndexCard?.text }}
        </p>
        <UIButton :to="activeIndexCard?.button.url">
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

    // position: absolute;
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

  &__img-sticky {
    position: sticky;
    bottom: -10px;
    height: calc(100vh + 20px);
    z-index: -1;
    background-image: v-bind(sliderImg);
    transform: translateY(-10px);
    margin-bottom: -10px;
    background-repeat: no-repeat;
    background-size: v-bind(imgSize);
    background-position: bottom center;
    transition-duration: 200ms;

    // img {
    //   position: sticky;
    //   top: 0;
    //   width: 100%;
    //   height: 100vh;
    // }
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
    &__img-sticky {
      // height: 100vh;
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
