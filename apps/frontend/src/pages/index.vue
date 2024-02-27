<script lang="ts" setup>
import defBgImg from '@/assets/img/header_bg.jpg'
import type { IProjectTranslate } from '~/types/admin-api'
const { getIndexSlider, getProjectByFooterCard } = usePublicData()

const { data: activeIndexCard } = await useAsyncData(
  'activeIndexCard',
  async () => await getProjectByFooterCard()
)

const { data: sliderImages } = await useAsyncData(
  'sliderImages',
  async () => await getIndexSlider(),
  {
    default: () => [{ id: defBgImg, image: { name: defBgImg } }]
  }
)

const activeCardTranslate = useTranslateLanguage<IProjectTranslate>(
  activeIndexCard.value?.translate
)
</script>

<template>
  <main>
    <Title>{{ $t("titles.home") }}</Title>

    <header class="header">
      <div class="header__main">
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
        loop
        :autoplay="{
          delay: 2000,
        }"
      >
        <SwiperSlide v-for="item in sliderImages" :key="item.id">
          <NuxtImg
            v-scroll-scale-image
            loading="lazy"
            :src="`/baseApiFiles/${item?.image?.name}`"
            style="width: 100%; height: 100%; transition-duration: 100ms"
          />
        </SwiperSlide>
      </Swiper>
    </header>
    <AppNewsHot />
    <AppContentSpliter> {{ $t("titles.concept") }} </AppContentSpliter>
    <AppSectionVideoGreeting class="app-video-greeting" />
    <AppContentSpliter> {{ $t("titles.projects") }} </AppContentSpliter>
    <AppPortSection />
    <AppAwardsSection />
    <AppNewsSection />
    <!-- <AppSectionInteriosOrderSlider /> -->
    <section v-if="activeIndexCard" class="home-info-project-paralax">
      <div>
        <NuxtImg
          :src="
            `/baseApiFiles/${activeIndexCard.details?.[0].image.name}` ||
              'assets/img/index_parallax.jpg'
          "
          loading="lazy"
          alt="Parallax bg"
        />
      </div>
      <div>
        <h3>{{ activeCardTranslate?.title }}</h3>
        <p v-html="activeCardTranslate?.description" />
        <UIButton :to="`/projects/${activeIndexCard.id}`">
          {{ $t("buttons.viewProject") }}
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

      img,
      picture {
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
  height: 150vh;
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
        img,
        picture {
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
