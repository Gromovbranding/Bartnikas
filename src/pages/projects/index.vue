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
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
