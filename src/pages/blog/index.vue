<script lang="ts" setup>
const { fetchGet } = useApi();

const blogs = ref([]);

const fetchBlogs = async () => {
  const { data } = await fetchGet("/blogs");
  blogs.value = data.value as [];
};

fetchBlogs();
</script>

<template>
  <main>
    <Title> Blog </Title>
    <AppPageHead title="Blog" />
    <section v-if="blogs?.length" class="blog">
      <AppMediaItem v-for="blog in blogs" :key="blog.id" :blog="blog" />
    </section>
  </main>
</template>

<style lang="scss" scoped>
.blog {
  display: grid;
  grid-template-columns: repeat(2, minmax(450px, 100%));
  grid-gap: 180px 80px;
  padding: 80px 40px;
}

@media screen and (max-width: 479px) {
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
