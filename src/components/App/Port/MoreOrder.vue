<script lang="ts" setup>
interface Props {
  name?: string;
  img?: string;
  orderId?: number;
}

withDefaults(defineProps<Props>(), {
  name: "Name Photo",
  img: "https://static.tildacdn.com/tild3466-6266-4637-b833-653534343535/CF005211.jpg",
  orderId: 1,
});
</script>

<template>
  <div class="more-order">
    <div class="more-order__img">
      <img :src="img" alt="" />
    </div>
    <div class="more-order__info">
      <div>
        <h3>{{ name }}</h3>
      </div>
      <div>
        <NuxtLink>
          <span>Interior</span>
          <IconArrow is-arrow30-deg />
        </NuxtLink>
        <NuxtLink :to="`/projects/order/${orderId}`">
          <span>Order</span>
          <IconArrow is-arrow30-deg />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.more-order {
  &__img {
    img {
      width: 100%;
      max-height: 556px;
      object-fit: cover;
      border-radius: 7px;
    }
  }

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 22px;
    padding: 0px 22px;

    > div {
      &:first-child {
        h3 {
          color: #000000;
          font-size: 28px;
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
            font-size: 22px;
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
