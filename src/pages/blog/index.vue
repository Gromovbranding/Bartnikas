<script lang="ts" setup>
import { IBlog } from "~/types/admin-api";

const { fetchGet } = useApi();

const { data: blogs } = useAsyncData<IBlog[]>(
  "blogs",
  async () => await fetchGet("/blogs")
);
</script>

<template>
  <main>
    <Title> Blog </Title>
    <AppPageHead title="Blog" />
    <section v-if="blogs?.length ?? 0" class="blog">
      <AppMediaItem v-for="blog in blogs" :key="blog.id" :blog="blog" />
    </section>
  </main>
</template>

<style lang="scss" scoped>
.blog {
  display: grid;
  grid-template-columns: repeat(2, minmax(450px, 100%));
  grid-gap: 4rem;
  padding: 4rem 2rem;
}

@media screen and (max-width: 550px) {
  .blog {
    padding: 50px 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 40px;
    &:deep(.interios) {
      width: 100%;
    }
  }
}
</style>
