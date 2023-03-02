<template>
  <form class="form" @submit.prevent>
    <small>Quantity:</small>
    <div class="form__control">
      <input type="number" value="1" />
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path
            clip-rule="evenodd"
            d="M19.3536 15.3536C19.1583 15.5488 18.8417 15.5488 18.6464 15.3536L12 8.70711L5.35355 15.3536C5.15829 15.5488 4.84171 15.5488 4.64645 15.3536C4.45118 15.1583 4.45118 14.8417 4.64645 14.6464L11.6464 7.64645C11.8417 7.45118 12.1583 7.45118 12.3536 7.64645L19.3536 14.6464C19.5488 14.8417 19.5488 15.1583 19.3536 15.3536Z"
            fill="black"
            fill-rule="evenodd"
          />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path
            clip-rule="evenodd"
            d="M19.3536 15.3536C19.1583 15.5488 18.8417 15.5488 18.6464 15.3536L12 8.70711L5.35355 15.3536C5.15829 15.5488 4.84171 15.5488 4.64645 15.3536C4.45118 15.1583 4.45118 14.8417 4.64645 14.6464L11.6464 7.64645C11.8417 7.45118 12.1583 7.45118 12.3536 7.64645L19.3536 14.6464C19.5488 14.8417 19.5488 15.1583 19.3536 15.3536Z"
            fill="black"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.form {
  small {
    font-size: 13px;
    font-weight: bold;
  }
  .form__control {
    display: flex;
    align-items: center;
    gap: 10px;
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
  }
}

@media screen and (max-width: 479px) {
  .form {
    small {
      font-size: 22px;
      font-weight: bold;
      line-height: 32px;
      margin-bottom: 20px;
    }
    .form__control {
      > input {
        width: 70px;
        height: 40px;
        font-size: 20px;
        border-radius: 5px;
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
