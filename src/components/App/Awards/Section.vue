<template>
  <section class="awards">
    <AppSectionHeader to-caption=">170" to="/awards"> AWARDS </AppSectionHeader>
    <div class="awards__content">
      <AppAwardsItem v-for="i in 4" :key="`award-item-${i}`" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.awards {
  background-color: $colorBackgroundGrey;
  border-radius: $borderRadiusMain;
  padding: 80px 40px;

  &__content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    > div:nth-child(even) {
      padding-bottom: 300px;
    }
  }
}
</style>
