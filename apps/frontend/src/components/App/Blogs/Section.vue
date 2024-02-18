<script setup lang="ts">
import type { IBlog } from '~/types/admin-api'

const { getAllBlogs } = usePublicData()

const { data: blogs } = await useAsyncData<IBlog[]>(
  'blogs',
  async () => await getAllBlogs()
)
</script>

<template>
  <section class="blog">
    <AppBlogsItem
      v-for="blog in blogs"
      :key="`blog-item-${blog.id}`"
      :blog="blog"
    />
  </section>
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
