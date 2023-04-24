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
  images: NewsImage[];
}
interface Props {
  news: News;
}

const props = defineProps<Props>();

const { makeDateCorrect } = useDateFormat();

const title = computed(() => {
  if (!props.news?.title || !props.news?.date) return "";
  return ` — ${makeDateCorrect(props.news.date.toString())} — ${
    props.news.title
  }`.repeat(3);
});
</script>

<template>
  <section class="hot-news">
    <div class="hot-news__wrapper">
      <AppSectionHeader :is-link="false" white style="margin-bottom: 0">
        HOT NEWS
      </AppSectionHeader>
      <div class="hot-news__ticker">
        <UIMarquee
          ><span>{{ title }}</span></UIMarquee
        >
      </div>
      <NuxtLink :to="`/news/${news?.id}`" class="upper-slide hot-news__content">
        <img :src="news.images[0]?.url" alt="" />
        <div>
          <IconArrow is-arrow30-deg />
        </div>
      </NuxtLink>
    </div>
    <div class="hot-news__ticker hot-news__ticker--bottom">
      <UIMarquee
        ><span>{{ title }}</span></UIMarquee
      >
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hot-news {
  &__wrapper {
    padding: 3rem 3rem 5rem;
    overflow-x: hidden;
    border-radius: 10px;
    background: $colorAccentBlue;
  }
  &__ticker {
    margin-bottom: 3rem;
    overflow-x: hidden;
    &--bottom {
      border-radius: 10px;
      background: $colorAccentBlue;
      margin-block: 2rem;
      padding: 2rem 0;
    }
    span {
      font-size: 3.3rem;
      color: #fff;
      display: block;
      overflow: hidden;
    }
  }

  &__content {
    display: block;
    width: 100%;
    position: relative;
    img {
      width: 100%;
      max-height: 100vh;
      object-fit: cover;
      border-radius: $borderRadiusMain;
    }
    > div {
      position: absolute;
      top: 15px;
      right: 15px;

      &:deep(svg) {
        width: 6.66rem;
        height: 6.66rem;
        fill: #fff;
      }
    }
  }

  :deep(.marquee-text-wrap) {
    position: relative;
    left: -40px;
    width: calc(100% + 80px);
  }
}

@media screen and (max-width: 550px) {
  .hot-news {
    margin-top: 0;
    padding: 0;
    &__wrapper {
      padding: 3rem 1rem;
    }
    &__content {
      margin-top: 32px;
      img {
        min-height: 230px;
        max-height: 230px;
      }
      > div {
        &:deep(svg) {
          width: 40px;
          height: 40px;
        }
      }
    }

    :deep(.marquee-text-wrap) {
      font-size: 28px;
    }
  }
}
</style>
