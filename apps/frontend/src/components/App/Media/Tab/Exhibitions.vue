<script setup lang="ts">
import type {
  IMediaExhibition,
  IMediaExhibitionTranslate
} from '~/types/admin-api'

const { fetchGet } = useApi()

const { data: exhibition } = await useAsyncData<IMediaExhibition[]>(
  'exhibition',
  async () => await fetchGet('/media/exhibition')
)

const translated = reactive((exhibition.value ?? []).map((item) => {
  return {
    ...item,
    translate: reactive(useTranslateLanguage<IMediaExhibitionTranslate>(item.translate))
  }
}))
</script>

<template>
  <div class="grid">
    <div
      v-for="item in translated"
      :key="'exh' + item.id"
      class="media__exhibitions"
    >
      <NuxtImg loading="lazy" :src="`/baseApiFiles/${item.image.name}`" />
      <div>
        <h3>{{ item?.translate?.title }}</h3>
        <p>
          {{ item?.translate?.awards }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-gap: 5rem 2.5rem;
  grid-template-columns: 1fr 1fr;
}
.media__exhibitions {
  display: flex;
  flex-direction: column;
  width: 100%;
  img,
  picture {
    width: 100%;
    border-radius: $borderRadiusMain;
    object-fit: cover;
    max-height: 350px;
  }
  > div {
    padding: 0 30px;
    h3 {
      margin-top: 30px;
      margin-bottom: 15px;
      font-size: 32px;
      font-weight: bold;
    }
    p {
      font-size: 26px;
      font-weight: 400;
      line-height: 1.5;
    }
  }
}

@media screen and (min-width: 551px) and (max-width: 1000px) {
  .media__exhibitions {
    > div {
      padding: 0;
      h3 {
        font-size: 1.74rem;
      }
      p {
        font-size: 1.55rem;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .grid {
    display: flex;
    flex-direction: column;
    grid-gap: 50px;
    margin-top: 30px;
  }
  .media__exhibitions {
    img,
    picture {
      max-height: 240px;
    }
    > div {
      padding: 0 16px;
      h3 {
        margin-bottom: 5px;
        font-size: 22px;
        font-weight: 800;
      }
      p {
        font-size: 22px;
      }
    }
  }
}
</style>
