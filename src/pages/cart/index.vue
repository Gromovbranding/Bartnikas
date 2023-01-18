<template>
  <main>
    <Title>Cart</Title>
    <AppPageHead only-logo back />
    <section class="checkout">
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
              <div class="checkout__quantity">
                <small>Quantity</small>
                <form @submit.prevent>
                  <input type="number" value="1" />
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        clip-rule="evenodd"
                        d="M19.3536 15.3536C19.1583 15.5488 18.8417 15.5488 18.6464 15.3536L12 8.70711L5.35355 15.3536C5.15829 15.5488 4.84171 15.5488 4.64645 15.3536C4.45118 15.1583 4.45118 14.8417 4.64645 14.6464L11.6464 7.64645C11.8417 7.45118 12.1583 7.45118 12.3536 7.64645L19.3536 14.6464C19.5488 14.8417 19.5488 15.1583 19.3536 15.3536Z"
                        fill="black"
                        fill-rule="evenodd"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        clip-rule="evenodd"
                        d="M19.3536 15.3536C19.1583 15.5488 18.8417 15.5488 18.6464 15.3536L12 8.70711L5.35355 15.3536C5.15829 15.5488 4.84171 15.5488 4.64645 15.3536C4.45118 15.1583 4.45118 14.8417 4.64645 14.6464L11.6464 7.64645C11.8417 7.45118 12.1583 7.45118 12.3536 7.64645L19.3536 14.6464C19.5488 14.8417 19.5488 15.1583 19.3536 15.3536Z"
                        fill="black"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </div>
                </form>
              </div>
              <div class="checkout__purchase">
                <b>8 000 $</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="checkout__total">
        <div>
          <h1>CART</h1>
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
  margin: 60px 0;

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

  &__quantity {
    small {
      display: block;
      font-size: 0.7vw;
      font-weight: bold;
    }
    form {
      display: flex;
      align-items: center;
      gap: 10px;
      > div {
        display: flex;
        flex-direction: column;

        svg {
          cursor: pointer;
          width: 1.4vw;
          &:last-child {
            transform: rotate(180deg);
          }
        }
      }
      > input {
        font-size: 1vw;
        font-weight: bold;
        outline: none;
        width: 3.4vw;
        height: 2vw;
        text-align: center;
        padding: 8px;
        background: transparent;
        border-radius: 0.5vw;
        border: 1px solid #000;
        -moz-appearance: textfield;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }
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
}
</style>
