<script lang="ts" setup>
const config = useRuntimeConfig();
const blogs = ref([]);

const fetchBlogs = async () => {
  const { data } = await useFetch(`${config.apiBaseUrl}/blogs`);
  blogs.value = data.value;
};

fetchBlogs();
</script>

<template>
  <main>
    <Title> Blog </Title>
    <AppPageHead title="Blog" />
    <section v-if="blogs.length" class="blog">
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
</style>
