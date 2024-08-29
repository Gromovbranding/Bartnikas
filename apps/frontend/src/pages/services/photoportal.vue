<script setup lang="ts">
import type { IPhotoportal, IPhotoportalTranslate } from '~/types/admin-api'
import type { IBlockType, ITextField } from '~/types/types'

const { getPhotoportal } = usePublicData()

const { t } = useI18n()

const { data: photoportal } = await useAsyncData<IPhotoportal>(
  'photoportal',
  async () => await getPhotoportal()
)

const translated = reactive(
  useTranslateLanguage<IPhotoportalTranslate>(
    photoportal.value?.translate ?? []
  )
)

const breadcrumbLinks = computed(() => {
  return [
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
  ]
})

const popupIsOpen = ref(false)
const popupTextFields: ComputedRef<ITextField[]> = computed(() => {
  return [
    {
      label: t('photoportal.popup.textfields.name.label'),
      placeholder: t('photoportal.popup.textfields.name.placeholder'),
      key: 'name',
      inputType: 'text'
    },
    {
      label: t('photoportal.popup.textfields.mail.label'),
      placeholder: t('photoportal.popup.textfields.mail.placeholder'),
      key: 'email',
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
  ]
})

const quoteBlockRef = ref<IBlockType[]>([])

function setQuoteBlockRef (el: IBlockType) {
  if (el) {
    quoteBlockRef.value.push(el)
  }
}

onBeforeUpdate(() => {
  quoteBlockRef.value = []
})

onMounted(() => {
  if (quoteBlockRef.value) {
    for (let i = 0; i < quoteBlockRef.value.length; i++) {
      const negativeOffset = i * 100
      useColorChangerOnScroll(quoteBlockRef.value[i] as HTMLElement, 'rgb(66, 136, 193)', false, 2, negativeOffset)
    }
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
          {{ translated?.intro_title }}
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
              @click="popupIsOpen = true"
            >
              {{ translated?.intro_action }}
            </UIButton>
            <p class="intro__subtitle">
              {{ translated?.intro_subtitle }}
            </p>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="peculiarities">
      <AppContainer class="peculiarities__container">
        <AppContentSpliter class="peculiarities__title">
          {{ translated?.peculiarities_title }}
        </AppContentSpliter>
        <div class="peculiarities__main">
          <NuxtImg
            class="peculiarities__img"
            loading="lazy"
            src="/img/photoportal_intro.png"
          />
          <div class="peculiarities__list">
            <ul class="peculiarities__items">
              <li v-for="item in translated?.peculiarities_list.split('<br>').slice(0, 4)" :key="item" class="peculiarities__item">
                <p class="peculiarities__item-text">
                  {{ item }}
                </p>
              </li>
            </ul>
            <ul class="peculiarities__items">
              <li v-for="item in translated?.peculiarities_list.split('<br>').slice(4)" :key="item" class="peculiarities__item">
                <p class="peculiarities__item-text">
                  {{ item }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </AppContainer>
    </section>

    <section class="influence">
      <AppContentSpliter class="influence__title">
        {{ translated?.influence_title }}
      </AppContentSpliter>
      <div class="influence__main">
        <NuxtImg
          class="influence__img"
          loading="lazy"
          src="/img/influence.png"
        />
        <div class="influence__quote">
          <q class="influence__quote-text">
            <span
              v-for="span in translated?.influence_quote_text.split('<br>')"
              :key="span"
              class="influence__quote-span"
            >
              {{ span }}
            </span>
            <span class="influence__quote-text-accent">
              <span
                v-for="span in translated?.influence_quote_accent_text.split('<br>')"
                :key="span"
                :ref="el => setQuoteBlockRef(el)"
              >
                {{ span }}
              </span>
            </span>
          </q>
          <span class="influence__quote-author">
            {{ translated?.influence_quote_author }}
          </span>
        </div>
      </div>
    </section>

    <section class="for-what">
      <AppContainer class="for-what__container">
        <AppContentSpliter class="for-what__title">
          {{ translated?.for_what_title }}
        </AppContentSpliter>
        <div class="for-what__list">
          <div
            v-for="(item, i) in translated?.for_what_list.split('<br>')"
            :key="item"
            class="for-what__item"
          >
            <IconLogoIcon class="for-what__item-icon" />
            <p class="for-what__item-text">
              {{ item }}
            </p>
            <NuxtImg class="for-what__item-img" loading="lazy" :src="`/img/for-what_${i}.png`" />
          </div>
        </div>
      </AppContainer>
    </section>

    <AppPopup
      :title="translated?.popup_title ?? ''"
      :subtitle-accent="translated?.popup_subtitle_accent"
      :subtitle="translated?.popup_subtitle ?? ''"
      :button-text="translated?.popup_btn ?? ''"
      :agreement="translated?.agreement ?? ''"
      :textfields="popupTextFields"
      :is-block="true"
      :request-path="'photoportal'"
    />

    <Transition name="slide-left">
      <AppPopup
        v-if="popupIsOpen"
        :title="translated?.popup_title ?? ''"
        :subtitle-accent="translated?.popup_subtitle_accent"
        :subtitle="translated?.popup_subtitle ?? ''"
        :button-text="translated?.popup_btn ?? ''"
        :agreement="translated?.agreement ?? ''"
        :textfields="popupTextFields"
        :request-path="'photoportal'"
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
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  }

  &__main {
    display: flex;
    align-items: center;
    gap: 2.083rem;
    align-self: center;
  }

  &__img {
    width: 32.604rem;
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
    justify-content: space-between;
    padding-top: 4.323rem;
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 2.969rem;
    width: 20rem;
  }

  &__item {
    display: flex;
    gap: 0.365rem;

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
    align-self: flex-start;
    width: 54%;
  }

  &__quote {
    font-size: 1.563rem;
    line-height: 1.2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.5rem;
    padding: 2.604rem 3.385rem 2.604rem 1.979rem;
    width: 46%;
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

  .peculiarities {
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

    &__items {
      width: 100%;
      gap: 0.7rem;
    }
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

    &__items {
      width: 100%;
      gap: 0.7rem;
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
