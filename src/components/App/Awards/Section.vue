<script setup lang="ts">
import type { IAwards } from "~/types/admin-api";

const { type: typeScreen } = useBreakpoints();
const { fetchGet } = useApi();

const awardsToShow = ref(0);

const { data: awards } = useAsyncData<IAwards[]>(
  "awards",
  async () => await fetchGet("/awards")
);

onMounted(() => {
  awardsToShow.value = typeScreen.value === "xs" ? 5 : 16;
});

const list = computed(() => (awards.value ?? []).slice(0, awardsToShow.value));
</script>

<template>
  <section v-if="(awards ?? []).length > 0" class="awards">
    <AppSectionHeader :to-caption="`>${awards?.length}`" to="/awards">
      AWARDS
    </AppSectionHeader>
    <div class="awards__content">
      <AppAwardsItem v-for="i in list" :key="`award-item-${i}`" :award="i" />
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
