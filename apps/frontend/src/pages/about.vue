<script lang="ts" setup>
import type { IAbout, IAboutTranslate } from '~/types/admin-api'

const { $anime } = useNuxtApp()
const advantagesBlock = ref()
const advantagesAnimation = ref()
const introTitleBlock = ref<HTMLElement>()

onMounted(() => {
  advantagesAnimation.value = $anime({
    targets: '.intro__advantage',
    translateX: ['-100%', 0],
    delay: $anime.stagger(100),
    duration: 1000,
    autoplay: false,
    easing: 'linear'
  })

  window.addEventListener('scroll', advantagesAppearance)

  if (introTitleBlock.value) {
    useColorChangerOnScroll(introTitleBlock.value, 'rgb(66, 136, 193)')
  }
})

function advantagesAppearance () {
  const triggerOffset =
    advantagesBlock.value.offsetTop -
    (window.innerHeight - advantagesBlock.value.offsetHeight)
  const blockFullVisible = window.scrollY > triggerOffset
  if (blockFullVisible) {
    advantagesAnimation.value.play()
    window.removeEventListener('scroll', advantagesAppearance)
  }
}

const { getAbout, getAllVideoCollection } = usePublicData()

const { data: videos } = await useAsyncData(
  'video-collection',
  async () => await getAllVideoCollection()
)

const { data: about } = await useAsyncData<IAbout>(
  'about',
  async () => await getAbout()
)

const translated = reactive(
  useTranslateLanguage<IAboutTranslate>(about.value?.translate ?? [])
)

function getGroupVideos (group: string) {
  return (videos.value ?? []).filter(
    video => video.group?.toLowerCase?.() === group.toLowerCase?.()
  )
}
</script>

<template>
  <main>
    <Title>{{ $t('titles.about') }}</Title>

    <section class="intro">
      <IconLogoIcon class="intro__logo" />

      <h1 ref="introTitleBlock" class="intro__title">
        {{ translated?.title }}
      </h1>
      <div class="intro__info">
        <div class="intro__info-text-block">
          <p class="intro__subtitle">
            {{ translated?.subtitle }}
          </p>

          <ul ref="advantagesBlock" class="intro__advantages">
            <li
              v-for="advantage in translated?.advantages"
              :key="advantage.text"
              class="intro__advantage"
            >
              <span class="intro__advantage-value">>&#8239;{{ advantage.value }}</span>
              <span class="intro__advantage-text">{{ advantage.text }}</span>
            </li>
          </ul>
        </div>

        <NuxtImg
          class="intro__img"
          loading="lazy"
          src="/img/intro_bartnikas.jpg"
        />
        <p class="intro__subtitle intro__subtitle_mobile">
          {{ translated?.subtitle }}
        </p>
      </div>
    </section>

    <AppContentSpliter>
      {{ translated?.concept_title }}
    </AppContentSpliter>

    <section class="concept">
      <div class="concept__main-block">
        <div class="concept__text-block">
          <p
            v-for="p in translated?.concept_text.split('<br>')"
            :key="p"
            class="concept__text-p"
          >
            {{ p }}
          </p>
        </div>
        <NuxtImg
          class="concept__nature-img"
          loading="lazy"
          src="/img/concept_nature.jpg"
        />
      </div>
      <NuxtImg
        class="concept__gallery-img"
        loading="lazy"
        src="/img/concept_gallery.jpg"
      />
    </section>

    <AppChooseFormatSection />
    <AppSpecialSection />
    <AppAwardsSection />
    <AppContentTicker
      :ticker-title="translated?.ticker_title ?? ''"
      :ticker-text="translated?.ticker_text ?? ''"
    />

    <section class="recognition">
      <AppContainer>
        <AppContentSpliter class="recognition__title">
          {{ translated?.recognition_title }}
        </AppContentSpliter>

        <p class="recognition__description">
          {{ translated?.recognition_text }}
        </p>

        <div class="recognition__tickers">
          <div
            class="recognition__ticker"
          >
            <div v-for="part in 2" :key="part" class="recognition__ticker-part">
              <div
                v-for="(city, index) in translated?.recognition_cities.slice(0, 4)"
                :key="city.name"
                class="recognition__city"
              >
                <NuxtImg
                  class="recognition__city-img"
                  loading="lazy"
                  :src="
                    /* `/baseApiFiles/${city.image.name}` || */
                    `/img/city/${0}_${index}.png`
                  "
                />
                <span class="recognition__city-text">{{ city.name }}</span>
              </div>
            </div>
          </div>

          <div
            class="recognition__ticker recognition__ticker_reverse"
          >
            <div v-for="part in 2" :key="part" class="recognition__ticker-part">
              <div
                v-for="(city, index) in translated?.recognition_cities.slice(4)"
                :key="city.name"
                class="recognition__city"
              >
                <NuxtImg
                  class="recognition__city-img"
                  loading="lazy"
                  :src="
                    /* `/baseApiFiles/${city.image.name}` || */
                    `/img/city/${1}_${index}.png`
                  "
                />
                <span class="recognition__city-text">{{ city.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="achievements">
      <div
        v-for="(ach, i) in translated?.achievements"
        :key="ach.text"
        class="achievements__item"
        :class="`achievements__item_${i}`"
      >
        <NuxtImg
          class="achievements__item-img"
          loading="lazy"
          :src="/* `/baseApiFiles/${ach.image.name}` || */ `/img/ach_${i}.png`"
        />
        <p class="achievements__item-text">
          {{ ach.text }}
        </p>
      </div>
    </section>

    <section class="music">
      <AppContainer>
        <AppSectionHeader :is-link="false">
          {{ $t('titles.music') }}
        </AppSectionHeader>
        <div class="music__collection">
          <AppVideoItem
            v-for="item in getGroupVideos('music')"
            :key="item.id"
            :item="item"
          />
        </div>
      </AppContainer>
    </section>
    <AppTestimonialsSection />
  </main>
</template>

<style lang="scss" scoped>
// SECTION INTRO
.intro {
  padding-top: 1.042rem;
  padding-bottom: 3rem;
  display: flex;
  flex-direction: column;

  &__logo {
    color: $colorAccentBlue;
    align-self: center;
    width: 6.458rem;
    height: 6.458rem;
    margin-bottom: 1.094rem;
  }

  &__title {
    font-size: 5.208rem;
    padding: 0 3.385rem;
    margin-bottom: 1.35rem;
  }

  &__info {
    display: flex;
    align-items: flex-start;
    gap: 2.031rem;
  }

  &__info-text-block {
    max-width: 51%;
  }

  &__subtitle {
    font-size: 2.083rem;
    line-height: 1.2;
    margin-bottom: 3.646rem;
    padding-left: 3rem;

    &_mobile {
      display: none;
    }
  }

  &__advantages {
    display: flex;
    flex-direction: column;
    gap: 3.125rem;
    padding-left: 3rem;
  }

  &__advantage {
    display: flex;
    align-items: flex-end;
    gap: 1.042rem;
  }

  &__advantage-value {
    color: $colorAccentBlue;
    font-size: 6.25rem;
    line-height: 1;
  }

  &__advantage-text {
    font-size: 1.56rem;
    max-width: 18.229rem;
    margin-bottom: 1rem;
  }

  &__img {
    width: 100%;
    max-width: 47%;
    margin-left: auto;
  }
}

// SECTION CONCEPT
.concept {
  display: flex;
  align-items: flex-start;

  &__main-block {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-self: stretch;
  }

  &__text-block {
    font-size: 1.563rem;
    line-height: 1.2;
    display: flex;
    flex-direction: column;
    gap: 1.563rem;
    padding: 3rem 3.385rem 4.3rem 4.323rem;
  }

  &__nature-img {
    width: 100%;
  }

  &__gallery-img {
    width: 40%;
  }
}

// SECTION RECOGNITION
.recognition {
  overflow: hidden;
  padding-bottom: 4.167rem;

  &__title {
    padding: 4.219rem 0 2.083rem !important;
    background: transparent;

    &:deep(h2) {
      color: #000;
    }
  }

  &__description {
    font-size: 1.563rem;
    max-width: 33.854rem;
    margin-bottom: 2.604rem;
  }

  &__tickers {
    display: flex;
    flex-direction: column;
    gap: 2.083rem;
  }

  &__ticker,
  &__ticker-part {
    gap: $cityTickerGapDesktop;
  }

  &__ticker {
    display: flex;
    width: max-content;
    animation: 10s linear 0 city_ticker_loop;
    animation-iteration-count: infinite;

    &_reverse {
      animation-direction: reverse;
    }
  }

  &__ticker-part {
    display: flex;
  }

  &__city {
    display: inline-flex;
    align-items: center;
    gap: 1.563rem;
  }

  &__city-img {
    width: 15.99rem;
  }

  &__city-text {
    font-size: 2.083rem;
    white-space: nowrap;
  }
}

// SECTION achievements
.achievements {
  min-height: 46.354rem;
  background: url('/img/bartnikas_achievements.png') no-repeat center/cover;
  position: relative;

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.7rem;
    width: 18.906rem;
    min-height: 13.073rem;
    padding: 1.042rem 2.083rem 1.302rem;
    border-radius: $borderRadiusMain;
    background: #fff;
    position: absolute;

    &_0 {
      top: 12.5rem;
      left: 13.854rem;
    }

    &_1 {
      top: 4.74rem;
      right: 15.208rem;
    }
  }

  &__item-img {
    max-width: 100%;
  }

  &__item-text {
    font-size: 1.25rem;
    line-height: 1.2;
  }
}

// SECTION MUSIC
.music {
  padding-top: 3.385rem;
  padding-bottom: 4.688rem;
  background: $colorBackgroundGreyDarken;

  &:deep(.caption) {
    margin-bottom: 3.385rem;
  }

  &__collection {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 3rem;
  }
}

@keyframes city_ticker_loop {
  0% {
    transform: translateX(calc(-50% - $cityTickerGapDesktop / 2));
  }

  100% {
    transform: translateX(0);
  }
}

@media screen and (max-width: 1000px) {
  .intro {
    &__title {
      font-size: 3.8rem;
    }

    &__subtitle {
      font-size: 1.3rem;
      margin-bottom: 2rem;
    }

    &__advantages {
      gap: 2rem;
    }

    &__advantage-value {
      font-size: 4rem;
    }

    &__advantage-text {
      font-size: 1rem;
      max-width: 14rem;
    }
  }

  .concept {
    &__text-block {
      font-size: 1.15rem;
      padding: 2rem;
      gap: 1.3rem;
    }
  }

  .achievements {
    min-height: 32rem;

    &__item {
      &_0 {
        top: 7rem;
        left: 4rem;
      }

      &_1 {
        top: 3rem;
        right: 3rem;
      }
    }
  }

  .music {
    &__collection {
      gap: 3rem;
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media screen and (max-width: 550px) {
  .intro {
    padding-top: 1.018rem;
    padding-bottom: 4.071rem;

    &__logo {
      width: 6.107rem;
      height: 6.107rem;
      margin-bottom: 1.018rem;
    }

    &__title {
      font-size: 2.646rem;
      padding: 0 1.628rem;
      margin-bottom: 0.611rem;
    }

    &__info {
      flex-direction: column-reverse;
      gap: unset;
    }

    &__info-text-block {
      max-width: 100%;
    }

    &__subtitle {
      font-size: 1.628rem;
      padding: 0 1.628rem;
      margin-bottom: 1.628rem;
      max-width: 100%;
      display: none;

      &_mobile {
        display: flex;
      }
    }

    &__advantages {
      padding: 0 1.628rem;
      gap: 2rem;
      max-width: 100%;
    }

    &__advantage-value {
      font-size: 5.089rem;
      white-space: nowrap;
    }

    &__advantage-text {
      font-size: 1.425rem;
      max-width: 18.83rem;
      margin-bottom: 0.75rem;
    }

    &__img {
      max-width: 100%;
      margin-bottom: 3.053rem;
    }
  }

  .concept {
    flex-direction: column;

    &__main-block {
      width: 100%;
    }

    &__text-block {
      font-size: 1.425rem;
      padding: 2.036rem 1.628rem 3.053rem;
    }

    &__nature-img {
      display: none;
    }

    &__gallery-img {
      width: 100%;
    }
  }

  .recognition {
    padding-bottom: 4.071rem;

    &__title {
      padding-top: 4.071rem;
      padding-bottom: 2.036rem;
    }

    &__description {
      font-size: 1.425rem;
      margin-bottom: 3.053rem;
    }

    &__tickers {
      gap: 1.018rem;
    }

    &__ticker,
    &__ticker-part {
      gap: $cityTickerGapMobile;
    }

    &__city {
      gap: 1.018rem;
    }

    &__city-img {
      width: 11.196rem;
    }

    &__city-text {
      font-size: 1.628rem;
    }
  }

  .achievements {
    min-height: 39.898rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1.221rem;
    padding: 2.748rem 1.628rem;
    background-position-x: 70%;

    &__item {
      position: static;
      min-height: 12.723rem;

      &_0 {
        .achievements__item-img {
          width: 6.005rem;
        }
      }

      &_1 {
        .achievements__item-img {
          width: 11.196rem;
        }
      }
    }

    &__item-text {
      font-size: 1.221rem;
    }
  }

  .music {
    padding-top: 4.071rem;
    padding-bottom: 5.089rem;

    &:deep(.caption) {
      margin-bottom: 3.053rem;
    }

    &__collection {
      display: flex;
      flex-direction: column;
    }
  }

  @keyframes city_ticker_loop {
    0% {
      transform: translateX(calc(-50% - $cityTickerGapMobile / 2));
    }

    100% {
      transform: translateX(0);
    }
  }
}
</style>
