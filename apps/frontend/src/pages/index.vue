<script lang="ts" setup>
import type { IIntroAdvantage } from '~/types/admin-api'
// const { getProjectByFooterCard } = usePublicData()

// const { data: activeIndexCard } = await useAsyncData(
//   'activeIndexCard',
//   async () => await getProjectByFooterCard()
// )

// const activeCardTranslate = reactive(
//   useTranslateLanguage<IProjectTranslate>(activeIndexCard.value?.translate)
// )
</script>

<template>
  <main>
    <Title>{{ $t('titles.home') }}</Title>

    <section class="intro">
      <h1 class="intro__title">
        {{ $t('intro.title') }}
      </h1>
      <div class="intro__info">
        <div class="intro__info-text-block">
          <p class="intro__subtitle">
            {{ $t('intro.subtitle') }}
          </p>

          <ul class="intro__advantages">
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

    <!-- <AppNewsHot /> -->
    <AppContentSpliter> {{ $t('titles.concept') }} </AppContentSpliter>

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
    <!-- <AppSectionVideoGreeting class="app-video-greeting" /> -->
    <AppContentSpliter> {{ $t('titles.projects') }} </AppContentSpliter>
    <!-- <AppPortSection /> -->
    <!-- <AppAwardsSection /> -->
    <!-- <AppNewsSection /> -->
    <!-- <AppSectionInteriosOrderSlider /> -->
    <!-- <section v-if="activeIndexCard" class="home-info-project-paralax">
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
        <div v-html="activeCardTranslate?.description" />
        <UIButton :to="`/projects/${activeIndexCard.id}`">
          {{ $t('buttons.viewProject') }}
        </UIButton>
      </div>
    </section> -->
    <!-- <AppVideoSection /> -->
    <!-- <AppTestimonialsSection /> -->
  </main>
</template>

<style lang="scss" scoped>
.intro {
  padding-bottom: 3rem;
  &__title {
    font-size: 5.208rem;
    padding: 0 3rem;
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
    padding-bottom: 4.071rem;

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
      padding: 2.036rem 1.628rem 3.053rem;
    }

    &__nature-img {
      display: none;
    }

    &__gallery-img {
      width: 100%;
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
