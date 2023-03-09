<script lang="ts" setup>
interface ProjectImageFile {
  id?: number;
  name?: string;
  url?: string;
}
interface ProjectImage {
  id?: number;
  name?: string;
  files?: ProjectImageFile[];
}
interface Props {
  projectId?: number;
  projectImage?: ProjectImage;
}

withDefaults(defineProps<Props>(), {
  projectId: null,
  projectImage: null,
});

const defaultImg =
  "https://static.tildacdn.com/tild3731-3032-4536-b165-626635373937/CF001765_1.jpg";
</script>

<template>
  <div class="port-order">
    <div class="port-order__img">
      <AppPortZoom
        :project-id="projectId"
        :project-image-name="projectImage?.name"
        :project-image-id="projectImage?.id"
      >
        <img :src="projectImage?.files[0]?.url ?? defaultImg" alt="" />
      </AppPortZoom>
    </div>
    <div class="port-order__info">
      <div>
        <h3>{{ projectImage?.name }}</h3>
      </div>
      <div>
        <NuxtLink>
          <span>Interior</span>
          <IconArrow is-arrow30-deg />
        </NuxtLink>
        <NuxtLink :to="`/projects/${projectId}/order/${projectImage?.id}`">
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
      height: 530px;
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

@media screen and (max-width: 479px) {
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
