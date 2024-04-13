<script lang="ts" setup>
import type { IIntroAdvantage } from '~/types/admin-api'

const { $anime } = useNuxtApp()
const advantagesBlock = ref()
const advantagesAnimation = ref()
const introTitleBlock = ref<HTMLElement>()

onMounted(() => {
  advantagesAnimation.value = $anime({
    targets: '.intro__advantage',
    translateX: ['-100%', 0],
    delay: $anime.stagger(100),
    duration: 500,
    autoplay: false,
    easing: 'linear'
  })

  window.addEventListener('scroll', advantagesAppearance)

  if (introTitleBlock.value) {
    useColorChangerOnScroll(introTitleBlock.value, 'rgb(66, 136, 193)')
  }
})

function advantagesAppearance () {
  const scrollPercent = (window.scrollY - advantagesBlock.value.offsetTop + 200) / advantagesBlock.value.offsetHeight * 100
  if (scrollPercent > 0) {
    advantagesAnimation.value.play()
    window.removeEventListener('scroll', advantagesAppearance)
  }
}

</script>

<template>
  <main>
    <Title>{{ $t('titles.about') }}</Title>

    <section class="intro">
      <IconLogoIcon class="intro__logo" />

      <h1 ref="introTitleBlock" class="intro__title">
        {{ $t('intro.title') }}
      </h1>
      <div class="intro__info">
        <div class="intro__info-text-block">
          <p class="intro__subtitle">
            {{ $t('intro.subtitle') }}
          </p>

          <ul ref="advantagesBlock" class="intro__advantages">
            <li
              v-for="advantage in ($tm('intro.advantages') as IIntroAdvantage[])"
              :key="advantage.text"
              class="intro__advantage"
            >
              <span class="intro__advantage-value">>&#8239;{{ $rt(advantage.value) }}</span>
              <span class="intro__advantage-text">{{
                $rt(advantage.text)
              }}</span>
            </li>
          </ul>
        </div>

        <NuxtImg
          class="intro__img"
          loading="lazy"
          src="/img/intro_bartnikas.jpg"
        />
        <p class="intro__subtitle intro__subtitle_mobile">
          {{ $t('intro.subtitle') }}
        </p>
      </div>
    </section>

    <AppContentSpliter :font-weight="'normal'">
      {{ $t('titles.concept') }}
    </AppContentSpliter>

    <section class="concept">
      <div class="concept__main-block">
        <div class="concept__text-block">
          <p
            v-for="p in $tm('concept.text')"
            :key="$rt(p)"
            class="concept__text-p"
          >
            {{ $rt(p) }}
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
    <AppAwardsSection :title-font-weight="'normal'" />
    <AppContentTicker
      :ticker-title="$t('main_page_ticker1.title')"
      :ticker-text="$t('main_page_ticker1.text')"
    />

    <section class="recognition">
      <AppContentSpliter class="recognition__title" :color="'#000'" :font-weight="'normal'">
        {{ $t('recognition.title') }}
      </AppContentSpliter>

      <p class="recognition__description">
        {{ $t('recognition.description') }}
      </p>

      <div class="recognition__tickers">
        <div v-for="(ticker, i) in $tm('recognition.tickers')" :key="i" class="recognition__ticker" :class="{recognition__ticker_reverse: i % 2 === 0}">
          <div v-for="(city, index) in ticker" :key="city" class="recognition__city">
            <NuxtImg class="recognition__city-img" loading="lazy" :src="`/img/city/${i}_${index}.png`" />
            <span class="recognition__city-text">{{ city }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="achievements">
      <div v-for="(ach, i) in $tm('achievements.items')" :key="$rt(ach)" class="achievements__item" :class="`achievements__item_${i}`">
        <NuxtImg class="achievements__item-img" loading="lazy" :src="`/img/ach_${i}.png`" />
        <p class="achievements__item-text">
          {{ $rt(ach) }}
        </p>
      </div>
    </section>

    <AppVideoSection />
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
    padding-top: 4.219rem;
    padding-bottom: 2.083rem;
    background: transparent;
  }

  &__description {
    font-size: 1.563rem;
    padding: 0 3.385rem;
    max-width: 33.854rem;
    margin-bottom: 2.604rem;
  }

  &__tickers {
    display: flex;
    flex-direction: column;
    gap: 2.083rem;
  }

  &__ticker {
    display: flex;
    gap: 7.813rem;
    width: max-content;
    animation: 25s linear 0 ticker;
    animation-iteration-count: infinite;

    &_reverse {
      animation-direction: reverse;
    }
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
      max-width: 650px;
      left: 2rem;
      border-radius: $borderRadiusMain;
      background-color: $colorBackgroundGrey;

      h3 {
        font-size: 5rem;
        margin-bottom: 20px;
        font-weight: bold;
      }

      > div {
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

  .header {
    &__main {
      height: calc(100vh + 10px);
      &:deep(svg) {
        max-width: 30rem;
      }
    }
  }
}

@media screen and (max-width: 825px) {
  .header {
    &__main {
      height: calc(65vh + 10px);
      &:deep(svg) {
        max-width: 30rem;
      }
    }
    height: 130vh;
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
      padding: 0 1.628rem;
    }

    &__tickers {
      gap: 1.018rem;
    }

    &__ticker {
      gap: 3.053rem;
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

  .header {
    height: 90vh;
    &__main {
      height: 45vh;
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
