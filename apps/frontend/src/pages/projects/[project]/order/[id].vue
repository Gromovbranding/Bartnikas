<script lang="ts" setup>
import type { Swiper } from 'swiper/types'
import type { IProject, IProjectTranslate } from '~/types/admin-api'

const route = useRoute()
const projectId = Number(route.params.project)
const imageId = Number(route.params.id)

const { getAllProjects } = usePublicData()

const { t } = useI18n()

const { data: projects } = await useAsyncData<IProject[]>(
  'projects',
  async () => await getAllProjects()
)

const isShowOrderFormEmail = ref(false)

const moreOrdersSwiper = ref<Swiper | null>(null)

const initMoreOrdersSwiper = (swiper: Swiper) => {
  moreOrdersSwiper.value = swiper
}

const { breakpoint } = useBreakpoints()

const slidesPerView = computed(() => {
  return breakpoint.value === 'xs' ? 1 : 2
})

const project = computed(() =>
  projects.value?.find(item => item.id === +route.params.project)
)

const translatedProject = reactive(useTranslateLanguage<IProjectTranslate>(
  project.value!.translate
))

const projectDetails = computed(() => project.value?.details ?? [])

const projectImage = computed(() =>
  projectDetails.value.find(img => img.id === imageId)
)

useHeadSafe({
  title: `${t('titles.projectImage')} ${projectImage.value?.image_name}`,
  meta: [
    {
      name: 'description',
      content:
        `${projectImage.value?.image_name} with price ${projectImage.value?.price}` ??
        'My Desc'
    }

  ]
})

const moreProjectImages = computed(() =>
  projectDetails.value.filter(img => img.id !== imageId).slice(0, 9)
)

const sizes = computed(() => {
  return (projectImage.value?.sizes ?? []).map(item => ({
    label: `${item.width}x${item.height} ${item.unit}`,
    value: item.id
  }))
})

const selectedSize = ref<{
  value: string | number;
  label: string;
}>(sizes.value[0])

function toOrder () {
  isShowOrderFormEmail.value = true
}
</script>

<template>
  <main>
    <AppPageHead
      only-logo
      :title="projectImage?.image_name"
      :sub="[
        {
          name: $t('titles.projects'),
          url: '/projects',
        },
        {
          name: String(translatedProject?.title),
          url: `/projects/${project?.id}`,
        },
      ]"
    />
    <section class="order">
      <h3 class="order__title_mobile">
        {{ projectImage?.image_name }}
      </h3>
      <div class="order__gallery">
        <NuxtImg
          loading="lazy"
          :src="`/baseApiFiles/${projectImage?.image.name}`"
        />
      </div>
      <div class="order__info">
        <h3>{{ projectImage?.image_name }}</h3>
        <ul class="order__info-checklist">
          <li>
            <b>{{ $t("projects.order.preferSize.headline") + " " }}</b>
            <div>
              <small>
                {{ $t("projects.order.preferSize.delivered") }}
              </small>
              <UISelect :list="sizes" @change="selectedSize = $event" />
              <small> {{ $t("projects.order.preferSize.individual") }} </small>
            </div>
          </li>
          <li>
            <b>{{ $t("projects.order.allPhotosProportions.headline") + " " }}
            </b>
            <small>
              {{ $t("projects.order.allPhotosProportions.print") }}
            </small>
          </li>
          <li>
            <b>{{ $t("projects.order.limitedEdition.headline") + " " }}</b>
            <small>
              {{ $t("projects.order.limitedEdition.print") }}
            </small>
          </li>
          <li>
            <b>{{ $t("projects.order.dilivery.headline") + " " }}</b>
            <small> {{ $t("projects.order.dilivery.print") }} </small>
          </li>
        </ul>
        <div class="order__info-control">
          <div class="order__info-colorlist">
            <b> {{ $t("projects.order.bestColors") }} </b>
            <div class="order__info-color-interior">
              <ul class="order__info-colors">
                <li style="background-color: #07343d" />
                <li style="background-color: #63aebd" />
                <li style="background-color: #b99766" />
                <li style="background-color: #ffd73e" />
              </ul>
              <!-- <div class="order__info-interior upper-slide">In Interior</div> -->
            </div>
          </div>
        </div>
        <UIButton @click="toOrder">
          {{ $t("projects.request") }}
        </UIButton>
      </div>
    </section>

    <!-- Раздел "More Abstract" -->
    <section v-if="moreProjectImages?.length" class="more">
      <h2 class="more__title">
        {{ $t("projects.more") }} {{ translatedProject?.title }}
      </h2>
      <p
        class="more__subtitle"
        @click="navigateTo(useLocalePath()(`/projects/${projectId}`))"
      >
        {{ $t("projects.viewCollection") }}
      </p>
      <Swiper
        class="more__slider"
        :modules="[SwiperMousewheel]"
        :mousewheel="false"
        :slides-per-view="slidesPerView"
        :space-between="40"
        :speed="1000"
        @swiper="initMoreOrdersSwiper"
      >
        <SwiperSlide
          v-for="moreProjectImage in moreProjectImages"
          :key="`more__slider-item-${moreProjectImage.id}`"
        >
          <AppPortMoreOrder
            v-bind="moreProjectImage"
            :project-id="projectId"
            :url="useGetFileByUrl(moreProjectImage.image.name)"
            :name="moreProjectImage.image_name"
            class="more__slider-item"
          />
        </SwiperSlide>
      </Swiper>
    </section>
    <dialog v-if="projectImage && isShowOrderFormEmail">
      <AppPortOrder
        :image="projectImage"
        :project-id="projectId"
        :selected-size="
          projectImage.sizes.find((item) => item.id === selectedSize.value)!
        "
        @order="isShowOrderFormEmail = false"
      />
      <IconClose class="dialog-icon" @click="isShowOrderFormEmail = false" />
    </dialog>
  </main>
</template>

<style lang="scss" scoped>
dialog {
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 15;
  border: none;
  width: 100%;
  height: 100%;
  max-width: 100vw;
  max-height: 100vh;
  display: flex;
  align-items: center;
  .dialog-icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2rem;
    cursor: pointer;
  }
}
.order {
  display: flex;
  gap: 60px;
  padding: 0 40px;
  margin-bottom: 80px;
  height: 100%;
  &__title_mobile {
    display: none;
  }
  &__gallery {
    flex: 1 1 60%;
    > img,
    picture {
      width: 100%;
      height: 100%;
      min-height: 800px;
      max-height: 800px;
      object-fit: cover;
      border-radius: $borderRadiusMain;
    }
    &-list {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 20px;
      > img,
      picture {
        max-width: 110px;
        max-height: 75px;
        border-radius: $borderRadiusMain + 12px;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  &__info {
    padding-top: 25px;
    flex: 1 1 40%;

    b,
    small,
    p {
      font-size: 13px;
      font-weight: 400;
    }

    b {
      font-weight: bold;
    }

    > h3 {
      font-size: 36px;
      font-weight: bold;
      margin-bottom: 35px;
    }

    &-checklist {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-bottom: 40px;

      :deep(.select) {
        margin: 20px 0;
        background-color: #fff;
      }
    }

    &-colorlist {
      margin-bottom: 40px;
      margin-top: 40px;

      > div {
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }

    &-colors {
      display: flex;
      gap: 15px;
      align-items: center;
      li {
        width: 48px;
        height: 48px;
        border-radius: $borderRadiusMain;
      }
    }

    &-interior {
      border-radius: $borderRadiusMain;
      font-size: 24px;
      background-color: #f5f4f4;
      line-height: 1.55;
      padding: 8px 25px;
      font-weight: 600;
      cursor: pointer;
    }

    > :deep(.btn-default) {
      width: 100%;
    }
  }
}

.more {
  padding: 65px 65px 108px;
  background-color: #eceae8;

  &__title {
    margin-left: -12px;
    color: #000000;
    font-size: 190px;
    font-weight: bold;
    letter-spacing: 5px;
    text-transform: uppercase;
  }

  &__subtitle {
    color: #999999;
    font-size: 33px;
    margin-top: 23px;
  }

  &__slider {
    margin-top: 54px;
    :deep(.swiper-wrapper) {
      // display: flex;
      // gap: 50px;
    }

    &-item {
      //width: 888px;
    }
  }
}

@media screen and (max-width: 550px) {
  .order {
    flex-direction: column;
    padding: 0px 16px;
    gap: 28px;

    &__title_mobile {
      display: block;
      font-size: 36px;
      font-weight: 600;
    }
    &__gallery {
      > img,
      picture {
        min-height: 320px;
        max-height: 320px;
      }
      &-list {
        margin-top: 12px;
        > img,
        picture {
          max-width: 80px;
          min-height: 58px;
          max-height: 58px;
          border-radius: 10px;
        }
      }
    }
    &__info {
      > h3 {
        display: none;
      }
      b,
      small,
      p {
        font-size: 22px;
        font-weight: 400;
        line-height: 32px;
      }

      b {
        font-weight: bold;
      }

      &-control {
        display: flex;
        margin-bottom: 40px;
        justify-content: space-between;
        padding-right: 50px;
      }
      &-quanity {
        :deep(.form__control) {
          margin-top: 8px;
        }
      }
      &-colorlist {
        margin: 0;
      }
      &-color-interior {
        flex-direction: column;
        gap: 30px;
      }
      &-colors {
        li {
          width: 44px;
          height: 44px;
        }
      }
      &-interior {
        padding: 6px 40px;
        font-size: 20px;
        align-self: flex-start;
      }
    }
  }

  .more {
    padding: 65px 16px 108px;
    &__title {
      font-size: 60px;
      line-height: 80px;
      margin-left: 0;
    }
    &__subtitle {
      font-size: 26px;
      margin-top: 10px;
    }
    &__slider {
      :deep(.swiper-wrapper) {
        //gap: 0;
      }
      &-item {
        //width: 100%;
      }
    }
  }
}
</style>
