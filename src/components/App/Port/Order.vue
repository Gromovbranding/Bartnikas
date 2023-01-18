<template>
  <div class="port-order">
    <div class="port-order__img">
      <img
        src="https://static.tildacdn.com/tild3731-3032-4536-b165-626635373937/CF001765_1.jpg"
        alt=""
      />
    </div>
    <div class="port-order__info">
      <div>
        <h3>Name Photo</h3>
      </div>
      <div>
        <NuxtLink>
          <span>Interior</span>
          <IconArrow is-arrow30-deg />
        </NuxtLink>
        <NuxtLink>
          <span>Order</span>
          <IconArrow is-arrow30-deg />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.port-order {
  &__img {
    max-height: 700px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 7px;
    }
  }

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    > div {
      padding: 0 30px;
      &:first-child {
        h3 {
          font-size: 36px;
          font-weight: bold;
        }
      }
      &:last-child {
        display: flex;
        gap: 30px;

        > a {
          display: flex;
          gap: 10px;
          span {
            font-size: 24px;
            font-weight: 500;
          }
          svg {
            width: 18px;
          }

          &:last-child {
            span {
              color: $colorAccentBlue;
            }
            svg {
              fill: $colorAccentBlue;
            }
          }
        }
      }
    }
  }
}
</style>
