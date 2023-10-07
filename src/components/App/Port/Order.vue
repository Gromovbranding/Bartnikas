<script lang="ts" setup>
import { IProjectImageDetail } from "~/types/admin-api";

defineProps<{
  detail: IProjectImageDetail;
  projectId: number;
}>();
</script>

<template>
  <div class="port-order">
    <div class="port-order__img">
      <AppPortZoom :detail="detail" :project-id="projectId">
        <img :src="useGetFileByUrl(detail.image.name)" alt="" />
      </AppPortZoom>
    </div>
    <div class="port-order__info">
      <div>
        <h3>{{ detail.image_name }}</h3>
      </div>
      <div>
        <!-- <NuxtLink>
          <span>Interior</span>
          <IconArrow is-arrow30-deg />
        </NuxtLink> -->
        <NuxtLink :to="`/projects/${projectId}/order/${detail.id}`">
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
    img {
      width: 100%;
      height: 700px;
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
        position: relative;
        transition-duration: 200ms;
        &:hover {
          transform: translateY(-25%);
        }

        > a {
          display: flex;
          gap: 10px;
          position: relative;
          span {
            font-size: 24px;
            font-weight: 400;
          }
          svg {
            width: 18px;
          }

          &:last-child {
            span {
              color: $colorAccentBlue;
              font-weight: 700;
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

@media screen and (max-width: 1200px) {
  .port-order {
    &__img {
      img {
        height: 550px;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .port-order {
    &__img {
      img {
        height: 222px;
      }
    }
    &__info {
      margin-top: 16px;
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
