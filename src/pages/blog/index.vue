<template>
  <main>
    <Title> Blog </Title>
    <AppPageHead title="Blog" />
    <section class="blog">
      <AppMediaItem to="/blog/1" />
      <AppMediaItem to="/blog/1" />
      <AppMediaItem to="/blog/1" />
      <AppMediaItem to="/blog/1" />
      <AppMediaItem to="/blog/1" />
      <AppMediaItem to="/blog/1" />
    </section>
  </main>
</template>

<style lang="scss" scoped>
.blog {
  padding: 80px 40px;
  display: grid;
  grid-template-columns: repeat(2, minmax(450px, 100%));
  grid-gap: 180px 80px;
}
</style>
