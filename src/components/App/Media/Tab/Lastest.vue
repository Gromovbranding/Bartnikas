<script lang="ts" setup>
interface NewsImage {
  id?: number;
  name?: string;
  url?: string;
}
interface News {
  id?: number;
  title?: string;
  desc?: string;
  text?: string;
  date?: Date;
  images?: NewsImage[];
}

const { fetchGet } = useApi();

const { data: news } = await useAsyncData(
  "news",
  async () => await fetchGet<News[]>("/news")
);

const sortedNews = computed(() => {
  if (!news.value?.length) return [];
  return news.value.sort((a: any, b: any) => b?.id - a?.id);
});
</script>

<template>
  <div class="grid">
    <AppMediaNews
      v-for="oneNews in sortedNews"
      :key="oneNews.id"
      :news="oneNews"
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
  }
}
</style>
