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
interface Props {
  news?: News[];
}
const props = withDefaults(defineProps<Props>(), {
  news: () => [],
});

const renderedNews = computed(() => {
  return props.news.slice(0, 2);
});
</script>

<template>
  <section class="news">
    <AppSectionHeader to="/media"> News </AppSectionHeader>
    <div class="news__content">
      <AppMediaNews
        v-for="oneNews in renderedNews"
        :key="oneNews.id"
        :news="oneNews"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.news {
  padding: 3rem;

  &__content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 3rem;

    &:deep(.interios) {
      width: calc(50% - 40px);
    }
  }
}

@media screen and (max-width: 1000px) {
  .news {
    &__content {
      flex-direction: column;
      &:deep(.interios) {
        width: 100%;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .news {
    padding: 50px 16px;

    &__content {
      flex-direction: column;
      margin-top: 70px;
      gap: 60px;
      &:deep(.interios) {
        width: 100%;
      }
    }
  }
}
</style>
