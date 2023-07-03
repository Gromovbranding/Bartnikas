<script setup lang="ts">
import { usePublicData } from "@/composables/usePublicData";
const { cart } = usePublicData();
</script>

<template>
  <main>
    <Title> Checkout </Title>
    <AppPageHead title="Checkout" />
    <div class="checkout">
      <UIButton class="checkout__btn" is-grey @click="$router.go(-1)">
        back
      </UIButton>
      <AppCheckout
        v-if="cart.length > 0"
        class="checkout__form"
        :amount="cart.reduce((acc, item) => item.price + acc, 0)"
        currency="eur"
      />
    </div>
  </main>
</template>

<style scoped lang="scss">
.checkout {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  padding-top: 4rem;
  margin-inline: auto;
  max-width: 760px;
  &__form {
    width: 100%;
  }
  &__btn {
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
    margin-right: auto;
    &:hover {
      transform: translateY(-25%);
    }
  }
}
</style>
