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
  padding: 40px;

  &__content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 40px;

    &:deep(.interios) {
      width: calc(50% - 40px);
    }
  }
}

@media screen and (max-width: 549px) {
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
