<template>
  <div class="checkout">
    <UIButton class="checkout__btn" is-grey @click="$router.go(-1)"
      >back</UIButton
    >
    <AppCheckout class="checkout__form" :amount="1000" currency="USD" />
  </div>
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
  min-height: 100vh;
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
