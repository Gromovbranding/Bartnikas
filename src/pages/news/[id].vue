<script lang="ts" setup>
import { IArticle } from "~/types/admin-api";

const { fetchGet } = useApi();
const { makeDateCorrect } = useDateFormat();

const route = useRoute();
const newsId = route.params.id;

const { data: news } = useAsyncData<
  IArticle & { next: IArticle; prev: IArticle }
>("news", async () => await fetchGet(`/news/${newsId}`));

const date = computed(() => {
  return makeDateCorrect(news.value?.created_at);
});
</script>

<template>
  <main>
    <Title>{{ news?.title }}</Title>
    <AppPageHead only-logo back />

    <article class="article">
      <div class="article__headline">
        <h1>{{ news?.title }}</h1>
        <time> {{ date }} </time>
      </div>
      <div class="article__img">
        <img :src="news?.images?.[0].url" alt="" />
      </div>
      <div class="article__content">
        <p>{{ news?.description }}</p>
        <p>{{ news?.text }}</p>
      </div>
    </article>

    <AppMediaNextPrev :prev="news?.prev" :next="news?.next" slug="news" />
  </main>
</template>

<style lang="scss" scoped>
.article {
  width: 100%;
  padding: 80px 40px;

  &__headline {
    display: flex;
    align-items: center;
    gap: 15px;
    justify-content: space-between;

    > h1 {
      font-size: 40px;
      font-weight: bold;
    }

    > time {
      color: #8a8a8a;
      font-size: 24px;
    }
  }

  &__img {
    margin-top: 25px;
    margin-bottom: 60px;
    img {
      width: 100%;
      border-radius: $borderRadiusMain;
      object-fit: cover;
      max-height: 700px;
    }
  }

  &__content {
    display: flex;
    padding: 0 90px;
    gap: 90px;
    p {
      flex: 1 1 50%;
      &:first-child {
        font-size: 28px;
        font-weight: 400;
        line-height: 1.6;
      }

      &:last-child {
        font-size: 23px;
        font-weight: 400;
        line-height: 1.5;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .article {
    padding: 4px 16px;
    &__headline {
      flex-direction: column;
      align-items: flex-start;
      padding: 0 12px;
      > h1 {
        font-size: 8vw;
        line-height: 1.3;
      }

      > time {
        font-size: 4.5vw;
      }
    }

    &__img {
      margin-bottom: 20px;
      img {
        max-height: 230px;
      }
    }

    &__content {
      flex-direction: column;
      padding: 0;
      gap: 30px;
      p {
        &:first-child {
          font-size: 5vw;
          line-height: 1.5;
        }

        &:last-child {
          font-size: 4.5vw;
        }
      }
    }
  }
}
</style>
