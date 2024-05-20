<script setup lang="ts">
import type { IPlaceOfPower, IPlaceOfPowerTranslate } from '~/types/admin-api'
import type { ITextField } from '~/types/types'

const { t } = useI18n()

const { getPlaceOfPower } = usePublicData()

const { data: placeOfPower } = await useAsyncData<IPlaceOfPower>(
  'place-of-power',
  async () => await getPlaceOfPower()
)

const translated = reactive(useTranslateLanguage<IPlaceOfPowerTranslate>(placeOfPower?.translate))

const popupTextFields: Ref<ITextField[]> = ref([
  {
    label: t('placeOfPower.popup.textfields.name.label'),
    placeholder: t('placeOfPower.popup.textfields.name.placeholder'),
    key: 'name',
    inputType: 'text'
  },
  {
    label: t('placeOfPower.popup.textfields.mail.label'),
    placeholder: t('placeOfPower.popup.textfields.mail.placeholder'),
    key: 'mail',
    inputType: 'email'
  }
])

const breadcrumbLinks = ref([
  {
    href: '/',
    text: t('titles.home')
  },
  {
    href: '/services',
    text: t('titles.services')
  },
  {
    href: '/services/place-of-power',
    text: t('titles.placeOfPower')
  }
])

const artefactTitleBlock = ref()
const { $anime } = useNuxtApp()
const transformationListBlock = ref()
const transformationItemsAnimation = ref()
const popupIsOpen = ref(false)

onMounted(() => {
  transformationItemsAnimation.value = $anime({
    targets: '.transformation__text-item',
    translateX: ['-100%', 0],
    delay: $anime.stagger(100),
    duration: 600,
    autoplay: false,
    easing: 'linear'
  })

  window.addEventListener('scroll', transformationItemsAppearance)

  if (artefactTitleBlock) {
    useColorChangerOnScroll(artefactTitleBlock.value, 'rgb(66, 136, 193)')
  }
  console.log(translated)
})

function transformationItemsAppearance () {
  const triggerOffset =
    transformationListBlock.value.offsetTop -
    (window.innerHeight - transformationListBlock.value.offsetHeight)
  const blockFullVisible = window.scrollY > triggerOffset
  if (blockFullVisible) {
    transformationItemsAnimation.value.play()
    window.removeEventListener('scroll', transformationItemsAppearance)
  }
}

console.log(translated)
</script>

<template>
  <main class="place-of-power-page">
    <Title>{{ $t('titles.placeOfPower') }}</Title>

    <section class="intro">
      <AppContainer class="intro__container">
        <AppBreadCrumb
          class="place-of-power-page__breadcrumb"
          :links="breadcrumbLinks"
        />
        <h1 class="intro__title">
          {{ translated?.title }}
        </h1>
        <div class="intro__info">
          <NuxtLink class="intro__ultra-anchor" to="#ultra-exclusive">
            <IconSmallArrow class="intro__ultra-anchor-icon" />
            {{ translated?.exclusive_title }}
          </NuxtLink>
          <p class="intro__subtitle">
            {{ translated?.subtitle }}
          </p>
        </div>
      </AppContainer>
      <NuxtImg
        class="intro__img"
        loading="lazy"
        src="/img/place_of_power_intro.png"
      />
    </section>

    <section class="bartnikas-quote">
      <NuxtImg
        class="bartnikas-quote__img"
        loading="lazy"
        src="/img/place_of_power_bartnikas.png"
      />
      <div class="bartnikas-quote__quote">
        <p class="bartnikas-quote__text">
          {{ translated?.quote_text }}
        </p>
        <p class="bartnikas-quote__author">
          {{ translated?.quote_author }}
        </p>
      </div>
    </section>

    <section class="transformation">
      <AppContentSpliter class="transformation__title">
        {{ translated?.transformation_title }}
      </AppContentSpliter>
      <div class="transformation__main">
        <div class="transformation__text">
          <p class="transformation__text-description">
            {{ translated?.transformation_list_text }}
          </p>
          <ul ref="transformationListBlock" class="transformation__text-list">
            <li
              v-for="item in translated?.transformation_list_items"
              :key="item"
              class="transformation__text-item"
            >
              <IconLogoIcon class="transformation__text-item-icon" />
              {{ item }}
            </li>
          </ul>
        </div>
        <Swiper
          class="transformation__swiper"
          :modules="[SwiperAutoplay]"
          autoplay
        >
          <SwiperSlide
            v-for="(slide, i) in placeOfPower?.transformationSlides"
            :key="slide.name"
            class="transformation__swiper-item"
          >
            <NuxtImg
              class="transformation__swiper-img"
              loading="lazy"
              :src="
                `/baseApiFiles/${slide.name}` || `/img/transformation_${i}.png`
              "
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>

    <section class="artefact">
      <AppContainer class="artefact__container">
        <h2 ref="artefactTitleBlock" class="artefact__title">
          {{ translated?.artefact_title }}
        </h2>
        <div class="artefact__text" v-html="translated?.artefact_text" />
      </AppContainer>
    </section>

    <section id="ultra-exclusive" class="exclusive">
      <AppContentSpliter class="exclusive__title">
        {{ translated?.exclusive_title }}
      </AppContentSpliter>
      <div class="exclusive__head">
        <NuxtImg
          class="exclusive__head-img"
          loading="lazy"
          src="/img/exclusive_head.png"
        />
        <p class="exclusive__head-text">
          {{ translated?.exclusive_head_text }}
        </p>
      </div>

      <AppContainer class="exclusive__container">
        <h3 class="exclusive__subtitle">
          {{ translated?.exclusive_subtitle }}
        </h3>

        <div class="exclusive__rates">
          <div
            v-for="item in translated?.exclusive_rates"
            :key="item.title"
            class="exclusive__rates-item"
          >
            <h4 class="exclusive__rates-item-title">
              {{ item.title }}
            </h4>
            <ul class="exclusive__rates-item-benefits">
              <li
                v-for="benefit in item.benefits"
                :key="benefit"
                class="exclusive__rates-item-benefit"
              >
                {{ benefit }}
              </li>
            </ul>
            <p v-if="item.footer.text" class="exclusive__rates-footer">
              <span
                v-if="item.footer.description"
                class="exclusive__rates-footer-description"
              >
                {{ item.footer.description }}
              </span>
              <span class="exclusive__rates-footer-text">{{
                item.footer.text
              }}</span>
            </p>
          </div>
        </div>
        <p class="exclusive__footer-info">
          {{ translated?.exclusive_footer_info }}
        </p>
        <UIButton
          class="exclusive__footer-action"
          :is-text-uppercase="false"
          :is-weight-normal="true"
          @click="popupIsOpen = true"
        >
          {{ translated?.exclusive_footer_btn }}
        </UIButton>
      </AppContainer>
    </section>

    <Transition name="slide-left">
      <AppPopup
        v-if="popupIsOpen"
        :title="translated?.popup_title ?? ''"
        :subtitle="translated?.popup_subtitle ?? ''"
        :note="translated?.popup_note ?? ''"
        :button-text="translated?.popup_btn ?? ''"
        :agreement="translated?.agreement ?? ''"
        :textfields="popupTextFields"
        @close="popupIsOpen = false"
      />
    </Transition>
  </main>
</template>

<style scoped lang="scss">
.place-of-power-page {
  padding-top: 2.083rem;

  &__breadcrumb {
    font-size: 1.25rem;
    margin-bottom: 2.083rem;
  }
}

.intro {
  &__container {
    margin-bottom: 3.125rem;
  }

  &__title {
    font-size: 7.292rem;
    max-width: 69.635rem;
    margin-bottom: 1.563rem;
  }

  &__info {
    font-size: 2.083rem;
    display: flex;
    gap: 1.563rem;
  }

  &__ultra-anchor {
    color: $colorAccentBlue;
    font-weight: bold;
  }

  &__ultra-anchor-icon {
    width: 1.12rem;
    height: 1.12rem;
  }

  &__subtitle {
    max-width: 38.802rem;
  }

  &__img {
    width: 100%;
    display: flex;
  }
}

.bartnikas-quote {
  display: flex;

  &__img {
    width: 54.5%;
  }

  &__quote {
    font-size: 1.563rem;
    width: 45.5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.563rem;
    padding: 2.083rem 3.385rem 2.083rem 2.083rem;
  }

  &__text {
    font-style: italic;
    line-height: 1.2;
  }
}

.transformation {
  &__main {
    display: flex;
  }

  &__text {
    font-size: 1.563rem;
    padding: 4rem 1rem 1rem 3.385rem;
    width: 54.5%;
  }

  &__text-description {
    line-height: 1.2;
    margin-bottom: 1.042rem;
  }

  &__text-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-left: 2.188rem;
  }

  &__text-item {
    display: flex;
    align-items: center;
    gap: 0.521rem;
  }

  &__text-item-icon {
    width: 1.146rem;
    height: 1.146rem;
  }

  &__swiper {
    width: 45.5%;
    align-self: center;
  }

  &__swiper-img {
    width: 100%;
    display: flex;
  }
}

.artefact {
  padding-top: 4.167rem;
  padding-bottom: 3.646rem;

  &__title {
    font-size: 6.25rem;
    max-width: 83.333rem;
    margin-bottom: 1.563rem;
  }

  &__text {
    font-size: 1.563rem;
    line-height: 1.2;
    display: flex;
    flex-direction: column;
    gap: 1.563rem;
    max-width: 60.521rem;
  }
}

.exclusive {
  padding-bottom: 4.167rem;
  &__head {
    display: flex;
    align-items: center;
    margin-bottom: 3.646rem;
  }

  &__head-img {
    flex: 1;
  }

  &__head-text {
    font-size: 2.083rem;
    padding-left: 2.604rem;
    padding-right: 3.385rem;
    width: 50rem;
  }

  &__container {
    display: flex;
    flex-direction: column;
  }

  &__subtitle {
    font-size: 6.25rem;
    margin-bottom: 3.281rem;
  }

  &__rates {
    display: flex;
    gap: 1.563rem;
    margin-bottom: 2.083rem;
  }

  &__rates-item {
    padding: 1.302rem 2.083rem 3.698rem;
    border-radius: $borderRadiusMain;

    &:nth-child(1) {
      flex: 1;
      background: $colorBackgroundGreyDarken;
    }

    &:nth-child(2) {
      flex: 2;
      color: #fff;
      background: #000;

      .exclusive__rates-item-benefits {
        display: grid;
        grid-template-rows: repeat(6, max-content);
        grid-auto-flow: column;
        grid-auto-columns: 17.188rem;
      }
    }

    &:nth-child(3) {
      flex: 1;
      color: #fff;
      background: $colorAccentBlue;
    }
  }

  &__rates-item-title {
    color: inherit;
    font-size: 2.083rem;
    font-weight: 700;
    margin-bottom: 1.563rem;
    text-align: center;
  }

  &__rates-item-benefits {
    font-size: 1.146rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-bottom: 1.927rem;
  }

  &__rates-item-benefit {
    display: flex;
    gap: 0.365rem;

    &::before {
      content: '•';
    }
  }

  &__rates-footer {
    font-size: 1.146rem;
    line-height: 1.3;
    display: flex;
    flex-direction: column;
    gap: 0.26rem;
    max-width: 30.208rem;
  }

  &__rates-footer-description {
    color: $colorAccentBlue;
  }

  &__rates-footer,
  &__rates-footer-text {
    color: inherit;
  }

  &__footer-info {
    font-size: 3.125rem;
    margin-bottom: 1.563rem;
    text-align: center;
  }

  &__footer-action {
    align-self: center;
    padding: 1.563rem 3.333rem !important;
    color: #fff !important;
    font-size: 1.563rem !important;
  }
}

@media screen and (max-width: 1000px) {
  .place-of-power-page {
    padding-top: 5rem;
  }

  .bartnikas-quote {
    &__quote {
      font-size: 1rem;
    }
  }

  .transformation {
    &__text {
      font-size: 1rem;
      padding-top: 2rem;
    }
  }

  .artefact {
    padding-top: 2rem;
    &__title {
      font-size: 4.2rem;
    }
  }

  .exclusive {
    &__subtitle {
      font-size: 5rem;
    }

    &__head-img {
      width: 50%;
    }

    &__head-text {
      font-size: 1.7rem;
      line-height: 1.2;
      width: 50%;
    }

    &__rates {
      flex-direction: column;
    }

    &__footer-info {
      font-size: 2.8rem;
    }
  }
}

@media screen and (max-width: 550px) {
  .place-of-power-page {
    padding-top: 7.532rem;

    &__breadcrumb {
      font-size: 1.221rem;
      margin-bottom: 3.053rem;
    }
  }

  .intro {
    &__container {
      margin-bottom: 3.053rem;
    }

    &__title {
      font-size: 2.646rem;
      margin-bottom: 1.628rem;
    }

    &__info {
      font-size: 1.628rem;
      flex-direction: column;
      gap: 0.407rem;
    }

    &__utlra-anchor-icon {
      width: 1.094rem;
      height: 1.094rem;
    }

    &__img {
      height: 61.069rem;
      object-fit: cover;
    }
  }

  .bartnikas-quote {
    flex-direction: column;

    &__img {
      width: 100%;
    }

    &__quote {
      font-size: 1.425rem;
      width: 100%;
      padding: 2.036rem 1.628rem 4.071rem;
    }
  }

  .transformation {
    &__main {
      flex-direction: column-reverse;
    }

    &__text {
      font-size: 1.425rem;
      width: 100%;
      padding: 2.036rem 1.628rem;
    }

    &__text-list {
      padding-left: 0;
    }

    &__swiper {
      width: 100%;
    }
  }

  .artefact {
    padding-top: 1rem;
    padding-bottom: 4.071rem;

    &__title {
      font-size: 2.646rem;
      margin-bottom: 1.221rem;
    }

    &__text {
      font-size: 1.425rem;
    }
  }

  .exclusive {
    padding-bottom: 5.089rem;

    &__head {
      flex-direction: column;
      margin-bottom: 2.036rem;
    }

    &__head-img {
      width: 100%;
    }

    &__head-text {
      font-size: 1.628rem;
      width: 100%;
      padding: 2.036rem 1.628rem;
    }

    &__subtitle {
      font-size: 2.646rem;
      margin-bottom: 2.036rem;
    }

    &__rates {
      display: flex;
      flex-direction: column;
      gap: 1.018rem;
    }

    &__rates-item {
      padding: 2.036rem;
      padding-bottom: 4.071rem;

      &:nth-child(n) {
        .exclusive__rates-item-benefits {
          display: flex;
          flex-direction: column;
        }
      }
    }

    &__rates-item-title {
      font-size: 1.628rem;
      margin-bottom: 1.425rem;
    }

    &__rates-item-benefits {
      font-size: 1.425rem;
    }

    &__rates-footer {
      font-size: 1.425rem;
      gap: 0.9rem;
    }

    &__footer-action {
      font-size: 2.443rem !important;
      align-self: stretch !important;
      padding-top: 1.425rem !important;
      padding-bottom: 1.425rem !important;
    }
  }
}
</style>
