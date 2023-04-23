<script lang="ts" setup>
const { fetchGet } = useApi();
const { makeDateCorrect } = useDateFormat();

const route = useRoute();
const blogId = route.params.id;

const { data: blog } = useAsyncData(
  "blog",
  async () => await fetchGet(`/blogs/${blogId}`)
);

const date = computed(() => {
  return makeDateCorrect(blog.value.date);
});

const imageCover = computed(() => {
  if (!blog?.value?.images?.length || !blog?.value?.images[0]?.url) {
    return "https://static.tildacdn.com/tild6633-3138-4831-b566-343130343938/20210401_-_Art_0152.jpg";
  }

  return blog.value.images[0].url;
});
</script>

<template>
  <main>
    <Title> Article of blog </Title>
    <AppPageHead only-logo back />

    <article class="article">
      <div class="article__headline">
        <time> {{ date }} </time>
        <h1>{{ blog.title }}</h1>
      </div>
      <div class="article__img">
        <img :src="imageCover" alt="" />
      </div>
      <div class="article__text">
        <p>{{ blog?.text }}</p>
      </div>
    </article>

    <AppMediaNextPrev :prev="blog?.prev" :next="blog?.next" slug="blog" />
  </main>
</template>

<style lang="scss" scoped>
.article {
  display: grid;
  grid-template-columns: 40% 1fr;
  grid-gap: 50px 120px;
  padding: 80px 40px;

  &__headline {
    grid-column-start: 2;
    max-width: 770px;

    > h1 {
      margin-top: 30px;
      font-size: 40px;
      font-weight: bold;
      line-height: 1.4;
    }

    > time {
      color: $colorTextGrey2;
      font-size: 22px;
      font-weight: 400;
    }
  }

  &__img {
    grid-column-start: 1;
    border-radius: $borderRadiusMain;
    img {
      width: 100%;
      position: sticky;
      top: 50px;
      border-radius: $borderRadiusMain;
      object-fit: cover;
    }
  }

  &__text {
    max-width: 750px;
    grid-column-start: 2;
    > p {
      line-height: 1.45;
      font-weight: 400;
      font-size: 27px;
      &:first-child {
        margin-bottom: 100px;
      }
      &:not(:first-child) {
        margin-bottom: 40px;
      }
    }
  }
}

@media screen and (max-width: 549px) {
  .article {
    display: flex;
    flex-direction: column;
    padding: 4px 16px;
    gap: 0;
    &__headline {
      flex-direction: column;
      align-items: flex-start;
      > h1 {
        font-size: 8vw;
        line-height: 1.4;
      }

      > time {
        font-size: 4.5vw;
      }
    }

    &__img {
      margin: 50px 0 30px;
      img {
        max-height: 280px;
      }
    }

    &__text {
      flex-direction: column;
      padding: 0;
      gap: 30px;
      > p {
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
