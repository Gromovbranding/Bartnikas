<script setup lang="ts">
import type { IArticleTranslate } from '~/types/admin-api'

const route = useRoute()
const { makeDateCorrect } = useDateFormat()
const { t } = useI18n()

const { getArticleById } = usePublicData()

const { data: article } = await useAsyncData(
  'article',
  async () => await getArticleById(route.params.id as string)
)

const translated = computed(() => ({
  bio: useTranslateLanguage<IArticleTranslate>(article.value!.translate).value,
  prev: {
    ...article.value!.prev,
    translate: useTranslateLanguage<IArticleTranslate>(
      article.value!.prev?.translate
    ).value
  },
  next: {
    ...article.value!.next,
    translate: useTranslateLanguage<IArticleTranslate>(
      article.value!.next?.translate
    ).value
  }
}))

useHeadSafe({
  title: `${t('titles.article')} ${translated.value.bio?.title}`,
  meta: [
    {
      name: 'description',
      content: translated.value.bio?.description ?? 'My Desc'
    }

  ]
})
</script>

<template>
  <main>
    <AppPageHead only-logo back />

    <article class="article">
      <div class="article__headline">
        <h1>{{ translated.bio?.title }}</h1>
        <time> {{ makeDateCorrect(article?.created_at) }} </time>
      </div>
      <div class="article__img">
        <img
          src="https://static.tildacdn.com/tild3565-3534-4961-b036-643938396163/noroot.png"
          alt=""
        >
      </div>
      <div class="article__content">
        <p v-html="translated.bio?.description" />
      </div>
    </article>

    <AppMediaNextPrev
      slug="media"
      :next="{
        title: translated?.next?.translate?.title,
        id: translated?.next?.id,
      }"
      :prev="{
        title: translated?.prev?.translate?.title,
        id: translated?.prev?.id,
      }"
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

    h1 {
      font-size: 40px;
      font-weight: bold;
    }

    time {
      color: #5c5c5c;
      font-size: 24px;
    }
  }

  &__img {
    margin-top: 25px;
    margin-bottom: 60px;
    img,
    picture {
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
      img,
      picture {
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
