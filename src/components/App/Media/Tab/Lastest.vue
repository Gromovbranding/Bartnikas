<script lang="ts" setup>
const config = useRuntimeConfig();
const news = ref([]);

const fetchNews = async () => {
  const { data } = await useFetch(`${config.apiBaseUrl}/news`);
  news.value = data.value;
};

fetchNews();

const sortedNews = computed(() => {
  return news?.value?.sort((a: any, b: any) => b?.id - a?.id);
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

@media screen and (max-width: 479px) {
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
