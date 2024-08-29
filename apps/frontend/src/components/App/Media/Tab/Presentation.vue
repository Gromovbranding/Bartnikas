<script setup lang="ts">
import type {
  IMediaPresentation,
  IMediaPresentationTranslate
} from '~/types/admin-api'

const { fetchGet } = useApi()

const { data: presentation } = await useAsyncData<IMediaPresentation[]>(
  'presentation',
  async () => await fetchGet('/media/presentation')
)
const translated = reactive((presentation.value ?? []).map((item) => {
  return {
    ...item,
    translate: reactive(useTranslateLanguage<IMediaPresentationTranslate>(
      item.translate
    ))
  }
}))
</script>

<template>
  <div class="grid">
    <article
      v-for="item in translated"
      :key="'pres' + item.id"
      class="media__presentation"
    >
      <div>
        <NuxtImg loading="lazy" :src="`/baseApiFiles/${item.image.name}`" />
      </div>
      <div>
        <h3>{{ item.translate?.title }}</h3>
        <UIButton
          class="media__presentation__btn"
          :to="useGetFileByUrl(item.pdf.name)"
          download
        >
          {{ $t("media.downloadPDF") }}
        </UIButton>
      </div>
    </article>
  </div>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-gap: 3rem;
  grid-template-columns: 1fr 1fr;
}

.media__presentation {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;

  &__btn {
    font-size: 1.5rem !important;
  }

  > div {
    &:first-child {
      img,
      picture {
        width: 100%;
        object-fit: cover;
        border-radius: $borderRadiusMain;
      }
    }

    &:last-child {
      display: flex;
      justify-content: space-between;
      gap: 15px;
      align-items: center;

      h3 {
        font-size: 1.8rem;
        font-weight: 900;
        line-height: 1.25;
      }

      &:deep(button) {
        font-size: 24px;
        white-space: nowrap;
      }
    }
  }
}

@media screen and (min-width: 551px) and (max-width: 1000px) {
  .grid {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

@media screen and (max-width: 550px) {
  .grid {
    display: flex;
    flex-direction: column;
    grid-gap: 60px;
  }

  .media__presentation {
    > div {
      &:first-child {
        img,
        picture {
        }
      }

      &:last-child {
        display: flex;
        flex-direction: column;
        align-items: stretch;

        h3 {
          font-size: 7vw;
        }

        &:deep(button) {
        }
      }
    }
  }
}
</style>
