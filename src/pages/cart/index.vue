<template>
  <main>
    <Title>Cart</Title>
    <AppPageHead only-logo title="Cart" />

    <section class="checkout">
      <h1 class="checkout__title_mobile">CART</h1>
      <div class="checkout__list">
        <div class="checkout__item">
          <div class="checkout__close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M4.293,18.293,10.586,12,4.293,5.707A1,1,0,0,1,5.707,4.293L12,10.586l6.293-6.293a1,1,0,1,1,1.414,1.414L13.414,12l6.293,6.293a1,1,0,1,1-1.414,1.414L12,13.414,5.707,19.707a1,1,0,0,1-1.414-1.414Z"
              />
            </svg>
          </div>
          <div class="checkout__main-img">
            <img
              src="https://static.tildacdn.com/tild6434-3637-4636-a265-643838306339/wealth.png"
              alt=""
            />
          </div>
          <div class="checkout__info">
            <div class="checkout__header">
              <h3>Name Photo</h3>
            </div>
            <div class="checkout__price">
              <AppFormQuanity />
              <div class="checkout__purchase">
                <b>8 000 $</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="checkout__total">
        <div>
          <h1 class="checkout__title">CART</h1>
          <div>
            <p>Subtotal:</p>
            <b>8 000 $</b>
          </div>
          <UIButton>CHECKOUT</UIButton>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.checkout {
  display: flex;
  gap: 85px;
  padding: 80px 40px;

  &__list {
    width: 100%;
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
        font-size: 12vw;
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
    img {
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

@media screen and (max-width: 479px) {
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
      img {
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
