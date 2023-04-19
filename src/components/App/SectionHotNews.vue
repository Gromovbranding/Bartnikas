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
    <AppSectionHeader :is-link="false" white> HOT NEWS </AppSectionHeader>
    <UIMarquee>{{ title }}</UIMarquee>
    <NuxtLink :to="`/news/${news?.id}`" class="upper-slide hot-news__content">
      <img :src="news.images[0]?.url" alt="" />
      <div>
        <IconArrow is-arrow30-deg />
      </div>
    </NuxtLink>
  </section>
</template>

<style lang="scss" scoped>
.hot-news {
  margin-top: 40px;
  padding: 80px 40px;
  background: $colorAccentBlue;
  overflow-x: hidden;

  &__content {
    display: block;
    width: 100%;
    margin-top: 120px;
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
        width: 128px;
        height: 128px;
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

@media screen and (max-width: 479px) {
  .hot-news {
    margin-top: 0;
    padding: 60px 16px 50px;
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
