<template>
  <main>
    <Title> Projects </Title>
    <AppPageHead title="Projects" />
    <section class="projects">
      <AppPortItem />
      <AppPortItem direction="row-reverse" />
      <AppPortItem />
      <AppPortItem direction="row-reverse" />
    </section>
  </main>
</template>

<style lang="scss" scoped>
.projects {
  margin-bottom: 30px;
}
</style>
