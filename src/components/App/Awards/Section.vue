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
    grid-template-columns: repeat(4, min-content);
    column-gap: 1rem;
    justify-content: space-between;

    > div {
      &:nth-child(odd) {
        margin-top: 9rem;
      }
    }
  }
}

@media screen and (max-width: 549px) {
  .awards {
    padding: 50px 16px;
    &__content {
      display: flex;
      flex-direction: column;
      gap: 100px;
      margin-top: 60px;
      padding: 0 26px 140px;
      > div {
        &:nth-child(odd) {
          margin-top: 0;
        }
        &:nth-child(even) {
          align-self: flex-end;
        }
      }
    }
  }
}
</style>
