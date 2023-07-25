<script lang="ts" setup>
const { makeDateCorrect } = useDateFormat();

const route = useRoute();

const { getArticleById } = usePublicData();

const { data: article } = useAsyncData(
  "article",
  async () => await getArticleById(route.params.id as string)
);

useHeadSafe({
  title: `Article ${article.value?.title}`,
  meta: [
    {
      name: "description",
      content: article.value?.description ?? "My Desc",
    },
    {
      name: "robots",
      content: "index,follow",
    },
  ],
});
</script>

<template>
  <main>
    <AppPageHead only-logo back />

    <article class="article">
      <div class="article__headline">
        <h1>{{ article?.title }}</h1>
        <time> {{ makeDateCorrect(article?.created_at) }} </time>
      </div>
      <div class="article__img">
        <img :src="article?.image?.url" alt="" />
      </div>
      <div class="article__content">
        <p>{{ article?.description }}</p>
        <p>{{ article?.text }}</p>
      </div>
    </article>

    <AppMediaNextPrev
      :next="{
        title: article?.next?.title,
        id: article?.next?.id,
      }"
      :prev="{
        title: article?.prev?.title,
        id: article?.prev?.id,
      }"
      slug="news"
    />
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
