<script setup lang="ts">
const { cart } = usePublicData();
const { t } = useI18n();

const router = useRouter();

const totalPrice = computed(() =>
  cart.value.reduce((acc, item) => item.price + acc, 0)
);

const removeItem = (id: number) => {
  cart.value = cart.value.filter((item) => item.id !== id);
};

const handleCheckout = () => {
  router.push("/checkout");
};
useHeadSafe({
  title: t("titles.cart"),
  meta: [
    {
      name: "robots",
      content: "noindex,nofollow",
    },
  ],
});
</script>

<template>
  <main>
    <AppPageHead only-logo :title="$t('titles.cart')" />

    <section class="checkout">
      <h1 class="checkout__title_mobile">{{ $t("titles.cart") }}</h1>
      <div class="checkout__list">
        <div v-for="item in cart" :key="item.id" class="checkout__item">
          <div class="checkout__close" @click="removeItem(item.id)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M4.293,18.293,10.586,12,4.293,5.707A1,1,0,0,1,5.707,4.293L12,10.586l6.293-6.293a1,1,0,1,1,1.414,1.414L13.414,12l6.293,6.293a1,1,0,1,1-1.414,1.414L12,13.414,5.707,19.707a1,1,0,0,1-1.414-1.414Z"
              />
            </svg>
          </div>
          <div class="checkout__main-img">
            <NuxtImg loading="lazy" :src="`/baseApiFiles/${item.image.name}`" />
          </div>
          <div class="checkout__info">
            <div class="checkout__header">
              <h3>{{ item.image_name }}</h3>
            </div>
            <div class="checkout__price">
              <AppFormQuanity
                v-model="item.quantity"
                :maxlength="item.quantity"
              />
              <div class="checkout__purchase">
                <b>{{ item.price }} €</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="checkout__total">
        <div>
          <h1 class="checkout__title">{{ $t("titles.cart") }}</h1>
          <div>
            <p>{{ $t("cart.subtotal") }}:</p>
            <b>{{ totalPrice }} €</b>
          </div>
          <UIButton @click="handleCheckout">{{
            $t("titles.checkout")
          }}</UIButton>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.checkout {
  display: flex;
  gap: 4rem;
  padding-bottom: 5rem;

  &__list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__close {
    position: absolute;
    right: 1vw;
    top: 1vw;
    svg {
      cursor: pointer;
      width: 3.7vw;
    }
  }

  &__item {
    position: relative;
    background-color: $colorBackgroundGreyDarken;
    padding: 2vw;
    border-radius: $borderRadiusMain;
    display: flex;
    gap: 3vw;
    height: 28vw;
  }

  &__header {
    margin: auto 0;
    > h3 {
      word-break: break-word;
      font-weight: bold;
      font-size: 2vw;
    }
  }

  &__total {
    width: 70%;

    > div {
      position: sticky;
      top: 51px;
      > button {
        width: 80%;
      }

      > div {
        margin: 120px 0 40px;
        > p {
          font-size: 1.7vw;
          margin-bottom: 20px;
        }
        > b {
          font-size: 2.5vw;
          font-weight: 900;
        }
      }

      > h1 {
        font-size: 12.5rem;
        font-weight: bold;
        letter-spacing: 3px;
      }
    }
  }

  &__price {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    align-items: center;
  }

  &__purchase {
    font-size: 2vw;
    font-weight: bold;
  }

  &__info {
    width: 40%;
    display: flex;
    flex-direction: column;
  }

  &__main-img {
    width: 60%;
    img,
    picture {
      object-fit: cover;
      border-radius: 0.5vw;
      width: 100%;
      height: 100%;
    }
  }

  &__title_mobile {
    display: none;
  }
}

@media screen and (min-width: 551px) and (max-width: 1000px) {
  .checkout {
    flex-direction: column;
    padding: 1rem;
    gap: 2rem;
    &__main-img {
      width: 34rem;
      height: 25.2rem;
    }
    &__item {
      height: auto;
    }
    &__title {
      display: none;
      &_mobile {
        display: block;
        font-size: 11rem;
        font-weight: 600;
      }
    }
    &__total {
      width: 100%;
      display: flex;
      > div {
        margin-left: auto;
        width: 50%;
        > div {
          margin-top: 1rem;
          b {
            font-size: 3rem;
          }
          p {
            font-size: 2.15rem;
          }
        }
      }
      h1 {
        display: none;
      }
    }
    &__purchase {
      font-size: 2.15rem;
    }
    h3 {
      font-size: 2.15rem;
    }
  }
}

@media screen and (max-width: 550px) {
  .checkout {
    flex-direction: column;
    padding: 16px 14px 60px;
    gap: 40px;
    &__list {
    }

    &__close {
      right: 2vw;
      top: 2vw;
      svg {
        width: 12vw;
      }
    }

    &__item {
      flex-direction: column;
      flex-direction: column;
      height: fit-content;
      padding: 15vw 20px 12vw;
      gap: 7.5vw;
    }

    &__header {
      > h3 {
        font-weight: 800;
        font-size: 6.5vw;
      }
    }

    &__total {
      width: 100%;
      > div {
        padding: 16px;
        > button {
          width: 100%;
          letter-spacing: 4px;
        }

        > div {
          margin: 0 0 40px;
          > p {
            font-size: 6.5vw;
          }
          > b {
            font-size: 9.5vw;
          }
        }

        > h1 {
        }
      }
    }

    &__price {
      margin-top: 10vw;
      > * {
        flex: 1;
      }
    }

    &__purchase {
      font-size: 6.5vw;
      font-weight: 800;
      padding-top: 4vw;
    }

    &__info {
      width: 100%;
      padding: 0px 8px;
    }

    &__main-img {
      width: 100%;
      img,
      picture {
        height: 63vw;
      }
    }

    &__title {
      display: none;
      &_mobile {
        display: block;
        font-size: 16vw;
        font-weight: bold;
        letter-spacing: 3px;
      }
    }
  }

  // AppFormQuanity
  :deep(.form) {
    small {
      font-size: 12px;
      font-weight: bold;
      margin-bottom: 20px;
      line-height: 0;
      margin-bottom: 0;
    }
    .form__control {
      > input {
        width: 56px;
        height: 35px;
        font-size: 20px;
        border-radius: 7px;
      }
      > div {
        svg {
          width: 30px;
        }
      }
    }
  }
}
</style>
