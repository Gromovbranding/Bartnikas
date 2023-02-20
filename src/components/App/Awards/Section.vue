<template>
  <section class="awards">
    <AppSectionHeader to-caption=">170" to="/awards"> AWARDS </AppSectionHeader>
    <div class="awards__content">
      <AppAwardsItem v-for="i in 16" :key="`award-item-${i}`" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.awards {
  background-color: $colorBackgroundGrey;
  border-radius: $borderRadiusMain;
  padding: 80px 40px;

  &__content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 70px;

    > div {
      &:nth-child(odd) {
        margin-top: 220px;
      }
    }
  }
}
</style>
