<script lang="ts" setup>
import type { IArticle, IArticleTranslate } from "~/types/admin-api";
const { makeDateCorrect } = useDateFormat();

const props = defineProps<{
  article: IArticle;
}>();

const translated = useTranslateLanguage<IArticleTranslate>(
  props.article.translate
);
</script>

<template>
  <NuxtLinkLocale :to="`/news/${article.id}`" class="interios">
    <div class="interios__img">
      <NuxtImg loading="lazy" :src="`/baseApiFiles/${article.image?.name}`" />
    </div>
    <div class="interios__content">
      <div>
        <IconArrow is-arrow30-deg />
      </div>
      <div>
        <h3>{{ translated?.title }}</h3>
        <p v-html="translated?.description"></p>
        <span>{{ makeDateCorrect(article.created_at) }}</span>
      </div>
    </div>
  </NuxtLinkLocale>
</template>

<style lang="scss" scoped>
.interios {
  width: 100%;
  display: block;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-30px);
  }

  &__img {
    img,
    picture {
      width: 100%;
      height: 100%;
      min-height: 550px;
      max-height: 550px;
      object-fit: cover;
    }
  }

  &__content {
    display: flex;
    gap: 20px;
    margin-top: 20px;

    > div {
      &:first-child {
        svg {
          width: 1.5rem;
          height: 1.5rem;
        }
      }

      &:last-child {
        h3 {
          color: $colorTextDark;
          font-size: 1.8rem;
          font-weight: 400;
          line-height: 1.1;
        }

        p {
          font-size: 1.16rem;
          color: #000;
          margin-top: 1rem;
          line-height: 1.5;
          font-weight: 400;
          letter-spacing: 0.07rem;
        }

        span {
          display: block;
          margin-top: 40px;
          color: $colorTextGrey;
          font-size: 1.08rem;
          font-weight: 400;
        }
      }
    }
  }
}

@media screen and (min-width: 551px) and (max-width: 1000px) {
  .interios {
    &__img {
      img,
      picture {
        width: 100%;
        height: 100%;
        min-height: 550px;
        max-height: 550px;
      }
    }

    &__content {
      > div {
        &:first-child {
          svg {
            width: 1.5rem;
            height: 1.5rem;
            margin-top: 0.5rem;
          }
        }
        &:last-child {
          h3 {
            color: $colorTextDark;
            font-size: 2.5rem;
          }
          p {
            font-size: 1.45rem;
            line-height: 1.2;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .interios {
    &__img {
      img,
      picture {
        min-height: 260px;
        max-height: 260px;
      }
    }

    &__content {
      gap: 10px;
      > div {
        &:first-child {
          svg {
            width: 24px;
            height: 24px;
          }
        }

        &:last-child {
          h3 {
            font-size: 38px;
          }

          p {
            font-size: 22px;
            line-height: 1.4;
          }

          span {
            margin-top: 24px;
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
