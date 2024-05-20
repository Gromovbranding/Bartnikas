<script setup lang="ts">
import type { IPhotoportal, IPhotoportalTranslate } from '~/types/admin-api'
import type { ITextField } from '~/types/types'

const { getPhotoportal } = usePublicData()

const { t } = useI18n()

const { data: photoportal } = await useAsyncData<IPhotoportal>(
  'photoportal',
  async () => await getPhotoportal()
)

const translated = reactive(useTranslateLanguage<IPhotoportalTranslate>(
  photoportal.value?.translate
))

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
    href: '/services/photoportal',
    text: t('titles.photoportal')
  }
])

const popupIsOpen = ref(false)
const popupTextFields: Ref<ITextField[]> = ref([
  {
    label: t('photoportal.popup.textfields.name.label'),
    placeholder: t('photoportal.popup.textfields.name.placeholder'),
    key: 'name',
    inputType: 'text'
  },
  {
    label: t('photoportal.popup.textfields.mail.label'),
    placeholder: t('photoportal.popup.textfields.mail.placeholder'),
    key: 'mail',
    inputType: 'email'
  },
  {
    label: t('photoportal.popup.textfields.phone.label'),
    placeholder: t('photoportal.popup.textfields.phone.placeholder'),
    key: 'phone',
    inputType: 'tel'
  },
  {
    label: t('photoportal.popup.textfields.address.label'),
    placeholder: t('photoportal.popup.textfields.address.placeholder'),
    key: 'address',
    inputType: 'text'
  }
])

const quoteBlock = ref()

onMounted(() => {
  if (quoteBlock.value) {
    useColorChangerOnScroll(quoteBlock.value, 'rgb(66, 136, 193)')
  }
})
</script>

<template>
  <main class="photoportal-page">
    <Title>{{ $t('titles.photoportal') }}</Title>

    <section class="intro">
      <AppContainer class="intro__container">
        <AppBreadCrumb
          class="photoportal-page__breadcrumb"
          :links="breadcrumbLinks"
        />

        <h1 class="intro__title">
          {{ translated.value?.intro_title }}
        </h1>
        <div class="intro__main">
          <NuxtImg
            class="intro__img"
            loading="lazy"
            src="/img/photoportal_intro.png"
          />
          <div class="intro__main-action">
            <UIButton
              class="intro__action-btn"
              :is-text-uppercase="false"
              :is-weight-normal="true"
              @click="popupIsOpen = true"
            >
              {{ translated.value?.intro_btn }}
            </UIButton>
            <p class="intro__subtitle">
              {{ translated.value?.intro_subtitle }}
            </p>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="peculiarities">
      <AppContainer class="peculiarities__container">
        <AppContentSpliter class="peculiarities__title">
          {{ translated.value?.peculiarities_title }}
        </AppContentSpliter>
        <div class="peculiarities__main">
          <NuxtImg
            class="peculiarities__img"
            loading="lazy"
            src="/img/photoportal_intro.png"
          />
          <ul class="peculiarities__list">
            <li
              v-for="item in translated.value?.peculiarities_list"
              :key="item"
              class="peculiarities__item"
            >
              <div class="peculiarities__item-content">
                <p class="peculiarities__item-text">
                  {{ item }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </AppContainer>
    </section>

    <section class="influence">
      <AppContentSpliter class="influence__title">
        {{ translated.value?.influence_title }}
      </AppContentSpliter>
      <div class="influence__main">
        <NuxtImg
          class="influence__img"
          loading="lazy"
          src="/img/influence.png"
        />
        <p class="influence__quote">
          <q class="influence__quote-text">
            <span
              v-for="span in translated.value?.influence_quote_text"
              :key="span"
              class="influence__quote-span"
            >
              {{ span }}
            </span>
            <span ref="quoteBlock" class="influence__quote-text-accent">
              <span
                v-for="span in translated.value?.influence_quote_text_accent"
                :key="span"
              >
                {{ span }}
              </span>
            </span>
          </q>
          <span class="influence__quote-author">
            {{ translated.value?.influence_quote_text_author }}
          </span>
        </p>
      </div>
    </section>

    <section class="for-what">
      <AppContainer class="for-what__container">
        <AppContentSpliter class="for-what__title">
          {{ translated.value?.for_what_title }}
        </AppContentSpliter>
        <div class="for-what__list">
          <div
            v-for="item in translated.value?.for_what_list"
            :key="item.text"
            class="for-what__item"
          >
            <IconLogoIcon class="for-what__item-icon" />
            <p class="for-what__item-text">
              {{ item.text }}
            </p>
            <NuxtImg class="for-what__item-img" loading="lazy" :src="`/baseApiFiles/${item?.image.name}`" />
          </div>
        </div>
      </AppContainer>
    </section>

    <AppPopup
      :title="translated.value?.popup_title ?? ''"
      :subtitle-accent="translated.value?.popup_subtitle_accent"
      :subtitle="translated.value?.popup_subtitle ?? ''"
      :button-text="translated.value?.popup_btn ?? ''"
      :agreement="translated.value?.agreement ?? ''"
      :textfields="popupTextFields"
      :is-block="true"
    />

    <Transition name="slide-left">
      <AppPopup
        v-if="popupIsOpen"
        :title="translated.value?.popup_title ?? ''"
        :subtitle-accent="translated.value?.popup_subtitle_accent"
        :subtitle="translated.value?.popup_subtitle ?? ''"
        :button-text="translated.value?.popup_btn ?? ''"
        :agreement="translated.value?.agreement ?? ''"
        :textfields="popupTextFields"
        @close="popupIsOpen = false"
      />
    </Transition>
  </main>
</template>

<style scoped lang="scss">
.photoportal-page {
  padding-top: 2.083rem;

  &__breadcrumb {
    font-size: 1.25rem;
    margin-bottom: 2.083rem;
  }
}

.intro {
  padding-bottom: 9.479rem;

  &__container {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: 6.25rem;
  }

  &__main {
    display: flex;
    align-items: center;
    gap: 2.083rem;
    align-self: center;
  }

  &__main-action {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.042rem;
  }

  &__action-btn {
    font-size: 1.563rem !important;
    padding: 1.563rem 2.604rem !important;
  }

  &__subtitle {
    font-size: 1.25rem;
    max-width: 25.781rem;
  }
}

.peculiarities {
  padding-bottom: 3.125rem;

  &__title {
    background: none !important;
    padding: 0 !important;
    margin-bottom: 2.604rem;

    &:deep(h2) {
      color: #000;
    }
  }

  &__main {
    position: relative;
    min-height: 35.938rem;
  }

  &__img {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 50.417rem;
  }

  &__list {
    font-size: 1.25rem;
    display: flex;
    flex-wrap: wrap;
    row-gap: 2.969rem;
    padding-top: 4.323rem;
  }

  &__item {
    display: flex;
    min-width: 50%;

    &:nth-child(even) {
      justify-content: flex-end;
    }
  }

  &__item-content {
    display: flex;
    gap: 0.365rem;
    width: 20rem;

    &::before {
      content: '•';
      padding-top: 0.26rem;
    }
  }

  &__item-text {
    line-height: 1.3;
  }
}

.influence {
  &__main {
    display: flex;
  }

  &__img {
    display: flex;
    flex: 1;
    align-self: flex-start;
  }

  &__quote {
    font-size: 1.563rem;
    line-height: 1.2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.5rem;
    padding: 2.604rem 3.385rem 2.604rem 1.979rem;
    max-width: 45.573rem;
  }

  &__quote-text {
    font-style: italic;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__quote-text-accent {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
}

.for-what {
  padding-top: 7.813rem;

  &__title {
    background: none !important;
    padding: 0 !important;
    margin-bottom: 3.646rem;

    &:deep(h2) {
      color: #000;
    }
  }

  &__list {
    display: flex;
    justify-content: center;
  }

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.604rem;
    width: 26.563rem;
    height: 27.708rem;
    position: relative;

    &:nth-child(1) {
      .for-what__item-icon {
        color: $colorAccentBlue;
      }
    }

    &:nth-child(2) {
      .for-what__item-icon {
        color: #4ba37f;
      }
    }

    &:nth-child(3) {
      .for-what__item-icon {
        color: #c3bfb6;
      }
    }

    &:hover {
      .for-what__item-img {
        opacity: 1;
      }
    }
  }

  &__item-icon {
    width: 7.813rem;
    height: 7.813rem;
  }

  &__item-text {
    font-size: 1.563rem;
    text-align: center;
    max-width: 20.833rem;
    pointer-events: none;
  }

  &__item-img {
    position: absolute;
    opacity: 0;
    z-index: 5;
    transition: opacity 300ms linear;
    width: 28rem;
  }
}

@media screen and (max-width: 1000px) {
  .photoportal-page {
    padding-top: 5rem;
  }

  .influence {
    &__img {
      width: 50%;
    }

    &__quote {
      width: 50%;
      font-size: 1.1rem;
      gap: 1rem;
      padding: 1.5rem;
    }

    &__quote-text,
    &__quote-text-accent {
      gap: 1rem;
    }
  }

  .for-what {
    &__item {
      width: 100%;
      height: auto;
      padding: 2rem;
      flex: 1;
    }

    &__item-img {
      width: 22rem;
    }
  }
}

@media screen and (max-width: 550px) {
  .photoportal-page {
    padding-top: 7.532rem;

    &__breadcrumb {
      font-size: 1.221rem;
      margin-bottom: 3.053rem;
    }
  }

  .intro {
    padding-bottom: 4rem;

    &__title {
      font-size: 4.682rem;
      margin-bottom: 3.053rem;
    }

    &__main {
      flex-direction: column;
      align-items: stretch;
    }

    &__img {
      width: 100%;
    }

    &__main-action {
      display: flex;
      flex-direction: column-reverse;
      align-items: stretch;
      gap: 4.071rem;
    }
  }

  .peculiarities {
    padding-bottom: 4.071rem;

    &__title {
      margin-bottom: 3.053rem;
    }

    &__img {
      position: static;
      transform: translate(0);
      width: 100%;
      margin-bottom: 2.036rem;
    }

    &__list {
      flex-direction: column;
      gap: 0.7rem;
      padding-top: 0;
    }

    &__item {
      &:nth-child(even) {
        justify-content: flex-start;
      }
    }

    &__item-content {
      width: 100%;
    }

    &__item-text {
      font-size: 1.425rem;
    }
  }

  .influence {
    &__main {
      flex-direction: column;
    }

    &__img {
      width: 100%;
    }

    &__quote {
      font-size: 1.425rem;
      width: 100%;
      padding: 2.036rem 1.628rem;
    }
  }

  .for-what {
    padding-top: 4.107rem;
    padding-bottom: 5.107rem;

    &__title {
      margin-bottom: 5.089rem;
    }

    &__list {
      display: flex;
      flex-direction: column;
      gap: 6.107rem;
    }

    &__item {
      gap: 1.5rem;
      padding: 0;
    }

    &__item-icon {
      width: 7.125rem;
      height: 7.125rem;
    }

    &__item-text {
      font-size: 1.425rem;
      max-width: 18.321rem;
    }

    &__item-img {
      position: static;
      opacity: 1;
      width: calc(100% + 3.256rem);
    }
  }
}
</style>
