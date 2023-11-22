<script lang="ts" setup>
interface Props {
  projectId?: number;
  name?: string;
  url?: string;
  id?: number;
}

defineProps<Props>();
</script>

<template>
  <div class="more-order">
    <div class="more-order__img">
      <img :src="url" alt="" />
    </div>
    <div class="more-order__info">
      <div>
        <h3>{{ name }}</h3>
      </div>
      <div>
        <!-- <NuxtLink>
          <span>Interior</span>
          <IconArrow is-arrow30-deg />
        </NuxtLink> -->
        <NuxtLink :to="`/projects/${projectId}/order/${id}`">
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
    img,
    picture {
      width: 100%;
      min-height: 556px;
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
            font-weight: 400;
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

@media screen and (max-width: 550px) {
  .more-order {
    &__img {
      img,
      picture {
        width: 100%;
        min-height: 222px;
        max-height: 222px;
      }
    }
    &__info {
      margin-top: 16px;
      padding: 0;
      > div {
        padding: 0 30px;
        &:first-child {
          align-self: flex-start;
          padding: 0 20px;
          h3 {
            font-size: 26px;
            font-weight: bold;
          }
        }
        &:last-child {
          flex-direction: column-reverse;
          gap: 20px;

          > a {
            span {
              font-size: 20px;
              font-weight: 600;
            }
            svg {
              width: 14px;
            }
          }
        }
      }
    }
  }
}
</style>
