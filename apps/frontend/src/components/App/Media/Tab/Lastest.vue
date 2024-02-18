<script lang="ts" setup>
import type { IArticle } from '~/types/admin-api'

const { getAllNews } = usePublicData()

const { data: news } = await useAsyncData<IArticle[]>(
  'news',
  async () => await getAllNews()
)

const sortedNews = computed(() => {
  return (news.value ?? []).sort(
    (a: IArticle, b: IArticle) =>
      +new Date(b?.created_at) - +new Date(a?.created_at)
  )
})
</script>

<template>
  <div class="grid">
    <AppNewsItem
      v-for="item in sortedNews"
      :key="`latest-news-item-${item.id}`"
      :article="item"
    />
  </div>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-gap: 120px 80px;
  grid-template-columns: 1fr 1fr;
  :deep(img) {
    min-height: 420px;
    max-height: 420px;
  }

  :deep(picture) {
    min-height: 420px;
    max-height: 420px;
  }
}

@media screen and (min-width: 551px) and (max-width: 1000px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
}

@media screen and (max-width: 550px) {
  .grid {
    display: flex;
    flex-direction: column;
    grid-gap: 60px;
    :deep(img) {
      min-height: 420px;
      max-height: 420px;
    }

    :deep(picture) {
      min-height: 420px;
      max-height: 420px;
    }
  }
}
</style>
