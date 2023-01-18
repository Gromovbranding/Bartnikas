<template>
  <main>
    <Title> Video Collection </Title>
    <AppPageHead title="Video Collection" />
    <section id="backstage" class="collection">
      <AppSectionHeader :is-link="false"> BACKSTAGES </AppSectionHeader>
      <div class="grid">
        <AppVideoItem v-for="i in 8" :key="`backstage-item-${i}`" />
      </div>
    </section>
    <section id="exhibition" class="collection">
      <AppSectionHeader :is-link="false"> EXHIBITIONS </AppSectionHeader>
      <div class="grid">
        <AppVideoItem v-for="i in 8" :key="`exhibition-item-${i}`" />
      </div>
    </section>
    <section id="interview" class="collection">
      <AppSectionHeader :is-link="false"> INTERVIEW </AppSectionHeader>
      <div class="grid">
        <AppVideoItem v-for="i in 8" :key="`interview-item-${i}`" />
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
main {
  background-color: $colorBackgroundGreyDarken;
  padding-bottom: 120px;
}
.collection {
  margin-top: 180px;
}

.grid {
  padding: 0 40px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 70px;
}
</style>
