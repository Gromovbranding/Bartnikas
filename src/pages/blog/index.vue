<template>
  <Title> Blog </Title>
  <AppPageHeadline title="Blog" />
  <section class="blog">
    <AppInterios />
    <AppInterios />
    <AppInterios />
    <AppInterios />
    <AppInterios />
    <AppInterios />
  </section>
</template>

<style lang="scss" scoped>
.blog {
  padding: 80px 40px;
  display: grid;
  grid-template-columns: repeat(2, minmax(450px, 100%));
  grid-gap: 180px 80px;
}
</style>
