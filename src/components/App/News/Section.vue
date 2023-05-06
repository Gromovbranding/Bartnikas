<script lang="ts" setup>
import { IArticle } from "~/types/admin-api";
const { getAllNews } = usePublicData();

const { data: news } = useAsyncData<IArticle[]>(
  "news",
  async () => await getAllNews()
);
</script>

<template>
  <section class="news">
    <AppSectionHeader to="/media">News</AppSectionHeader>
    <div class="news__content">
      <AppNewsItem
        v-for="item in news"
        :key="`news-item-${item.id}`"
        :article="item"
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
