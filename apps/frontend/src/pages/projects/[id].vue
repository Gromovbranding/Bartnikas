<script lang="ts" setup>
import type { Swiper } from 'swiper/types'
import type {
  IProject,
  IProjectCollabTranslate,
  // IProjectImageDetail,
  IProjectTranslate
} from '~/types/admin-api'

const route = useRoute()
const wrapper = ref<HTMLDivElement>()
// const wrapperHeight = ref("");
const sticky = ref<HTMLDivElement>()
const section = ref<HTMLElement>()
const scrollProgress = ref(0)
const wsHeight = ref(0)

const { getAllProjects, getProjectById } = usePublicData()
const { breakpoint } = useBreakpoints()

const { t } = useI18n()

const { data: project } = await useAsyncData(
  'project',
  async () => await getProjectById(route.params.id as string)
)

const translated = reactive(
  useTranslateLanguage<IProjectTranslate>(
    project.value!.translate
  )
)

useHead({
  title: `${t('titles.project')} ${translated.value?.title}`,
  meta: [
    {
      name: 'description',
      content: translated.value?.description ?? 'My Desc'
    }

  ]
})

const { data: projects } = await useAsyncData<IProject[]>(
  'projects',
  async () => await getAllProjects()
)

const moreProjects = computed(
  () => projects.value?.filter(item => item.id !== +route.params.id) || []
)

const translatedMoreProjects = reactive((moreProjects.value ?? []).map((item) => {
  return {
    ...item,
    translate: reactive(useTranslateLanguage<IProjectTranslate>(item.translate))
  }
}))

const onScroll = () => {
  if (!wrapper.value || !sticky.value) { return }
  const rem = window.innerWidth / 100
  const diff2 = window.scrollY - (section.value?.offsetTop || 0)
  if (diff2 > wrapper.value.offsetWidth - sticky.value.offsetWidth) { return }
  if (diff2 > 0) { return (scrollProgress.value = diff2 + 2 * rem) }
  scrollProgress.value = 0
}

onMounted(() => {
  if (!wrapper.value || projects.value?.length < 3 || breakpoint.value !== 'lg') { return }
  const diff = wrapper.value.offsetWidth - sticky.value.offsetWidth
  wsHeight.value = diff + 'px'
  // wrapperHeight.value = wrapper.value.scrollWidth + "px";
  window.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

const translate = computed(() => `${-scrollProgress.value}px`)

const title = computed(() => {
  if (project.value?.collab) {
    return `${t('projects.collabWith')} ${
      useTranslateLanguage<IProjectCollabTranslate>(
        project.value.collab.translate
      ).value?.collab_with
    }`
  }
  return translated.value?.title
})

const details = computed(() =>
  (project.value?.details ?? []).filter(item => item.is_active)
)

const swiperInstance = ref<Swiper | null>(null)

const onSwiper = (swiper: Swiper) => {
  swiperInstance.value = swiper
}

const zoomIsOpen = ref(false)

const openZoom = (slideId: number) => {
  zoomIsOpen.value = true
  const index = details.value.findIndex(detail => detail.id === slideId)
  console.log(index, swiperInstance.value)
  swiperInstance.value?.slideTo(index, 500)
}

watch(zoomIsOpen, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'initial'
  }
})

const collab = computed(() => project.value?.collab)

</script>

<template>
  <main>
    <AppPageHead
      :sub="[
        {
          name: $t('titles.projects'),
          url: '/projects',
        },
      ]"
      :title="title"
      :number="details.length"
    />

    <AppPortCollab v-if="collab" :collab="collab" />

    <div class="project">
      <section v-if="!project?.collab" class="author-quote">
        <div class="author-quote__person">
          <div>
            <img src="assets/img/bartnikas.jpg" alt="Bartnikas Logo">
          </div>
          <div>
            <h3>
              {{ $t("name.first") }} <br>
              {{ $t("name.second") }}
            </h3>
          </div>
        </div>
        <div class="author-quote__text">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              clip-rule="evenodd"
              width="30"
              height="30"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
            >
              <path
                d="m2.699 20c-.411 0-.699-.312-.699-.662 0-.249.145-.516.497-.703 1.788-.947 3.858-4.226 3.858-6.248-3.016.092-4.326-2.582-4.326-4.258 0-2.006 1.738-4.129 4.308-4.129 3.241 0 4.83 2.547 4.83 5.307 0 5.981-6.834 10.693-8.468 10.693zm10.833 0c-.41 0-.699-.312-.699-.662 0-.249.145-.516.497-.703 1.788-.947 3.858-4.226 3.858-6.248-3.015.092-4.326-2.582-4.326-4.258 0-2.006 1.739-4.129 4.308-4.129 3.241 0 4.83 2.547 4.83 5.307 0 5.981-6.833 10.693-8.468 10.693z"
                fill-rule="nonzero"
              />
            </svg>
          </div>
          <div class="author-quote__text__desc">
            <p>{{ translated?.description }}</p>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              clip-rule="evenodd"
              width="30"
              height="30"
              fill-rule="evenodd"
              stroke-linejoin="round"
              stroke-miterlimit="2"
              viewBox="0 0 24 24"
            >
              <path
                d="m2.699 20c-.411 0-.699-.312-.699-.662 0-.249.145-.516.497-.703 1.788-.947 3.858-4.226 3.858-6.248-3.016.092-4.326-2.582-4.326-4.258 0-2.006 1.738-4.129 4.308-4.129 3.241 0 4.83 2.547 4.83 5.307 0 5.981-6.834 10.693-8.468 10.693zm10.833 0c-.41 0-.699-.312-.699-.662 0-.249.145-.516.497-.703 1.788-.947 3.858-4.226 3.858-6.248-3.015.092-4.326-2.582-4.326-4.258 0-2.006 1.739-4.129 4.308-4.129 3.241 0 4.83 2.547 4.83 5.307 0 5.981-6.833 10.693-8.468 10.693z"
                fill-rule="nonzero"
              />
            </svg>
          </div>
        </div>
      </section>

      <section class="port-list">
        <Teleport to="body">
          <Transition name="fade">
            <div v-show="zoomIsOpen" class="zoom__modal">
              <div class="zoom__modal-main">
                <Swiper class="zoom__modal-content" :space-between="20" @swiper="onSwiper">
                  <SwiperSlide v-for="detail in details" :key="detail.id">
                    <NuxtImg
                      loading="lazy"
                      :src="`/baseApiFiles/${detail.image.name}`"
                      class="zoom__modal-nuxtimg"
                    />
                  </SwiperSlide>
                </Swiper>
                <div v-if="swiperInstance" class="zoom__modal-bottom">
                  <IconCorner />
                  <div class="zoom__modal-bottom-info">
                    <div>
                      <h3>{{ details[swiperInstance.activeIndex].image_name }}</h3>
                    </div>
                    <div>
                      <NuxtLinkLocale
                        :to="`/projects/${project.id}/order/${details[swiperInstance.activeIndex].id}`"
                      >
                        <span>{{ $t("projects.request") }}</span>
                        <IconArrow is-arrow30-deg />
                      </NuxtLinkLocale>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="zoom__modal-close"
                @click="zoomIsOpen = false"
              >
                <IconClose />
              </div>
            </div>
          </Transition>
        </Teleport>

        <div
          v-for="detail in details"
          :key="`port-item-${detail.id}`"
          class="port-order"
        >
          <div class="port-order__img">
            <div class="zoom__container" @click="openZoom(detail.id)">
              <div class="zoom__container-icon">
                <IconZoom :style="{ fill: '#fff' }" />
              </div>
              <div class="zoom__container-content">
                <NuxtImg
                  loading="lazy"
                  :src="`/baseApiFiles/${detail.image.name}`"
                />
              </div>
            </div>
          </div>
          <div class="port-order__info">
            <div>
              <h3>{{ detail?.image_name }}</h3>
            </div>
            <div>
              <NuxtLinkLocale
                :to="`/projects/${project.id}/order/${detail.id}`"
              >
                <span>{{ $t("projects.request") }}</span>
                <IconArrow is-arrow30-deg />
              </NuxtLinkLocale>
            </div>
          </div>
        </div>
      </section>
    </div>
    <section v-if="moreProjects?.length" ref="section" class="more">
      <div ref="sticky" class="sticky-wrapper">
        <h2>{{ $t("projects.moreProjects") }}</h2>
        <div ref="wrapper" class="more__projects">
          <div
            v-for="item in translatedMoreProjects"
            :key="item.id"
            class="project-item"
            @click="navigateTo(useLocalePath()(`/projects/${item.id}`))"
          >
            <template v-if="item.details?.[0]">
              <div class="project-item__img">
                <NuxtImg
                  loading="lazy"
                  :src="`/baseApiFiles/${item.details[0].image.name}`"
                />
              </div>
              <div class="project-item__text">
                <h3>{{ item?.translate?.title }}</h3>
                <p v-html="item?.translate?.description" />
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="whitespace" />
    </section>
  </main>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
  z-index: 2;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  position: absolute;
}
.zoom {
  &__container {
    position: relative;
    cursor: pointer;
    &:hover {
      .zoom__container-icon {
        opacity: 1;
      }
    }

    &-icon {
      position: absolute;
      z-index: 7;
      transition: opacity 0.3s ease-out;
      opacity: 0;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      > :deep(svg) {
        width: 42px;
        height: 42px;
        fill: #000;
      }
    }
  }

  &__modal {
    position: fixed;
    inset: 0;
    z-index: 12;
    width: 100vw;
    height: 100vh;
    display: flex;
    background-color: #000;

    &-close {
      z-index: 199;
      right: 0;
      top: 0;
      height: 60px;
      width: 60px;
      position: absolute;
      cursor: pointer;
      padding: 15px;

      > :deep(svg) {
        width: 32px;
        height: 32px;
        fill: rgba(255, 255, 255, 0.1);
      }

      &:hover {
        > :deep(svg) {
          fill: rgba(255, 255, 255);
        }
      }
    }

    &-main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding-top: 20px;
      padding-left: 20px;
      padding-right: 20px;
    }

    &-bottom {
      position: relative;
      display: flex;
      padding-top: 16px;
      flex-direction: column;
      width: 100%;
      align-items: center;

      &-info {
        width: 100%;
        transition: 0.6s;
        opacity: 0;
        position: absolute;
        top: -8px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        > div {
          &:first-child {
            h3 {
              font-size: 28px;
              font-weight: 800;
              color: #fff;
            }
          }
          &:last-child {
            display: flex;
            gap: 30px;
            position: relative;
            transition-duration: 200ms;
            &:hover {
              transform: translateY(-25%);
            }

            > a {
              display: flex;
              gap: 10px;
              span {
                font-size: 28px;
                font-weight: 400;
                color: #fff;
              }
              svg {
                width: 18px;
                fill: #fff;
              }

              &:last-child {
                span {
                  color: #fff;
                }
                svg {
                  fill: #fff;
                }
              }
            }
          }
        }
      }

      > :deep(svg) {
        transition: 0.3s;
        fill: #fff;
        width: 46px;
        height: 46px;
      }
      &:hover {
        > :deep(svg) {
          transform: rotate(-180deg);
          opacity: 0;
        }
        .zoom__modal-bottom-info {
          opacity: 1;
          top: 28px;
        }
      }
    }

    &-arrow {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      > :deep(svg) {
        transition: 0.4s;
        position: relative;
        width: 60px;
        fill: rgba(255, 255, 255, 0.1);
        cursor: pointer;
      }
      &:hover {
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 1) 0%,
          rgba(20, 20, 20, 1) 100%
        );
        > :deep(svg) {
          background-color: transparent;
          fill: rgba(255, 255, 255);
        }
      }
      &_left {
        &:hover {
          background: linear-gradient(
            270deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(20, 20, 20, 1) 100%
          );
        }
      }
    }

    &-content {
      overflow: hidden;
      border-radius: $borderRadiusMain;
      display: flex;
      justify-content: center;
      width: 100%;

      > :deep(picture) {
        object-fit: cover;
        width: 100%;
        height: 100%;
        border-radius: 0;
      }
    }

    &:deep(.zoom__modal-nuxtimg) {
      width: 100%;
      height: auto;
      object-fit: contain;
    }

    // &-nuxtimg {
    //   width: 100%;
    //   height: auto;
    //   object-fit: contain;
    // }
  }
}

@media screen and (max-width: 550px) {
  .zoom__modal-arrow {
    flex: 1;
    > :deep(svg) {
      width: 40px;
      height: 65px;
    }
  }
  .zoom__modal-bottom-info {
    > div {
      &:first-child {
        align-self: flex-start;
        h3 {
          font-size: 26px;
          font-weight: bold;
        }
      }
      &:last-child {
        flex-direction: column-reverse;
        gap: 20px;

        > a {
          span {
            font-size: 20px;
            font-weight: 600;
          }
          svg {
            width: 14px;
          }
        }
      }
    }
  }
}
.port-order {
  &__img {
    img,
    picture {
      width: 100%;
      min-height: 800px;
      max-height: 800px;
      object-fit: cover;
      border-radius: 7px;
    }
  }

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    > div {
      &:first-child {
        h3 {
          font-size: 36px;
          font-weight: bold;
        }
      }
      &:last-child {
        display: flex;
        gap: 30px;
        position: relative;
        transition-duration: 200ms;
        &:hover {
          transform: translateY(-25%);
        }

        > a {
          display: flex;
          gap: 10px;
          position: relative;
          span {
            font-size: 24px;
            font-weight: 400;
          }
          svg {
            width: 18px;
          }

          &:last-child {
            span {
              color: $colorAccentBlue;
              font-weight: 700;
            }
            svg {
              fill: $colorAccentBlue;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .port-order {
    &__img {
      img,
      picture {
        min-height: 320px;
        max-height: 320px;
      }
    }
    &__info {
      margin-top: 16px;
      > div {
        &:first-child {
          align-self: flex-start;
          h3 {
            font-size: 26px;
            font-weight: bold;
          }
        }
        &:last-child {
          flex-direction: column-reverse;
          gap: 20px;

          > a {
            span {
              font-size: 20px;
              font-weight: 600;
            }
            svg {
              width: 14px;
            }
          }
        }
      }
    }
  }
}
.project {
  padding: 2rem;
}

.sticky-wrapper {
  position: sticky;
  top: 100px;
  overflow: hidden;
  margin-right: -2rem;
}

.project-item {
  width: 33rem;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
  flex-shrink: 0;
  cursor: pointer;
  &__img {
    height: 17rem;
    img,
    picture {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__text {
    padding: 2rem;
    h3 {
      font-size: 2.33rem;
      font-weight: 600;
    }
    p {
      font-size: 1.5rem;
      line-height: 1.25em;
      height: 7.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 1rem;
    }
  }
}
.whitespace {
  height: v-bind(wsHeight);
}
.more {
  padding: 2rem;
  padding-top: 4rem;
  // height: v-bind(wrapperHeight);
  h2 {
    font-size: 10vw;
    margin-bottom: 20px;
    font-weight: 600;
    text-transform: uppercase;
  }
  &__projects {
    display: flex;
    gap: 1rem;
    position: sticky;
    top: 100px;
    transform: translateX(v-bind(translate));
    width: fit-content;
  }
}
.author-quote {
  display: flex;
  margin-bottom: 100px;
  padding-inline: 2rem;
  gap: 4rem;

  &__person {
    display: flex;
    align-items: flex-start;
    gap: 40px;

    > div {
      &:first-child {
        width: 150px;
        height: 150px;

        img,
        picture {
          object-fit: cover;
          width: 100%;
          height: 100%;
          border-radius: $borderRadiusMain;
        }
      }

      &:last-child {
        h3 {
          font-size: 34px;
          font-weight: bold;
          line-height: 1.3;
        }
      }
    }
  }

  &__text {
    display: flex;
    gap: 2rem;
    flex-grow: 1;

    > div {
      &:first-child {
        svg {
          transform: rotate(180deg);
        }
      }

      &:nth-child(odd) {
        svg {
          fill: $colorAccentBlue;
          stroke: $colorAccentBlue;
          width: 52px;
          height: 52px;
        }
      }

      &:last-child {
        align-self: flex-end;
      }
    }

    p {
      font-size: 2rem;
      line-height: 1.5;
    }
  }
}

.port-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 120px 15px;
}

.more {
  background-color: #eceae8;
}

@media screen and (max-width: 550px) {
  .project {
    padding: 80px 12px;
  }
  .author-quote {
    flex-direction: column;
    &__text p {
      font-size: 16px;
    }
    &__text svg {
      width: 24px !important;
    }
  }
  .port-list {
    grid-template-columns: 1fr;
    grid-gap: 60px 15px;
  }
}
</style>
