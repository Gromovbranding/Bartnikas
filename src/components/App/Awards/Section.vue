<script setup lang="ts">
const { type: typeScreen } = useBreakpoints();

const awards = ref(0);

onMounted(() => {
  awards.value = typeScreen.value === "xs" ? 5 : 16;
});
</script>

<template>
  <section class="awards">
    <AppSectionHeader to-caption=">170" to="/awards"> AWARDS </AppSectionHeader>
    <div class="awards__content">
      <AppAwardsItem v-for="i in awards" :key="`award-item-${i}`" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.awards {
  background-color: $colorBackgroundGrey;
  border-radius: $borderRadiusMain;
  padding: 6rem 3rem;

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

@media screen and (max-width: 1000px) {
  .awards {
    &__content {
      grid-template-columns: repeat(2, 1fr);
      justify-content: space-around;
    }
  }
}

@media screen and (max-width: 550px) {
  .awards {
    padding: 50px 16px;
    &__content {
      display: flex;
      flex-direction: column;
      gap: 100px;
      margin-top: 60px;
      padding: 0 0 10rem;
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
