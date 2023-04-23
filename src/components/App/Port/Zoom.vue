<script lang="ts" setup>
interface Props {
  projectId?: number;
  projectImageId?: number;
  projectImageName?: string;
}

withDefaults(defineProps<Props>(), {
  projectId: null,
  projectImageId: null,
  projectImageName: "Name Photo",
});

const isVisible = ref(false);
</script>

<template>
  <div class="zoom__container" @click="isVisible = true">
    <div class="zoom__container-icon">
      <IconZoom :style="{ fill: '#fff' }" />
    </div>
    <div class="zoom__container-content">
      <slot />
    </div>
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isVisible" class="zoom__modal">
        <div class="zoom__modal-arrow zoom__modal-arrow_left">
          <IconCornerWide left />
        </div>
        <div class="zoom__modal-main">
          <div class="zoom__modal-content">
            <slot />
          </div>
          <div class="zoom__modal-bottom">
            <IconCorner />
            <div class="zoom__modal-bottom-info">
              <div>
                <h3>{{ projectImageName }}</h3>
              </div>
              <div>
                <NuxtLink>
                  <span>Interior</span>
                  <IconArrow is-arrow30-deg />
                </NuxtLink>
                <NuxtLink
                  :to="`/projects/${projectId}/order/${projectImageId}`"
                >
                  <span>Order</span>
                  <IconArrow is-arrow30-deg />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <div class="zoom__modal-arrow">
          <IconCornerWide />
        </div>
        <div class="zoom__modal-close" @click.stop="isVisible = false">
          <IconClose />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
  z-index: 2;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  position: absolute;
}
.zoom {
  &__container {
    position: relative;
    cursor: pointer;
    &:hover {
      .zoom__container-icon {
        opacity: 1;
      }
    }

    &-icon {
      position: absolute;
      z-index: 7;
      transition: opacity 0.3s ease-out;
      opacity: 0;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      > :deep(svg) {
        width: 42px;
        height: 42px;
        fill: #000;
      }
    }
  }

  &__modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 12;
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #000;

    &-close {
      z-index: 199;
      right: 50px;
      top: 9px;
      height: 60px;
      width: 60px;
      position: absolute;
      cursor: pointer;
      padding: 15px;

      > :deep(svg) {
        width: 32px;
        height: 32px;
        fill: rgba(255, 255, 255, 0.1);
      }

      &:hover {
        > :deep(svg) {
          fill: rgba(255, 255, 255);
        }
      }
    }

    &-main {
      flex: 5;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      padding-top: 15px;
    }

    &-bottom {
      position: relative;
      flex: 2;
      display: flex;
      padding-top: 16px;
      flex-direction: column;
      width: 100%;
      align-items: center;

      &-info {
        width: 100%;
        transition: 0.6s;
        opacity: 0;
        position: absolute;
        top: -8px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        > div {
          padding: 0 30px;
          &:first-child {
            h3 {
              font-size: 28px;
              font-weight: 800;
              color: #fff;
            }
          }
          &:last-child {
            display: flex;
            gap: 30px;

            > a {
              display: flex;
              gap: 10px;
              span {
                font-size: 28px;
                font-weight: 400;
                color: #fff;
              }
              svg {
                width: 18px;
                fill: #fff;
              }

              &:last-child {
                span {
                  color: #fff;
                }
                svg {
                  fill: #fff;
                }
              }
            }
          }
        }
      }

      > :deep(svg) {
        transition: 0.3s;
        fill: #fff;
        width: 46px;
        height: 46px;
      }
      &:hover {
        > :deep(svg) {
          transform: rotate(-180deg);
          opacity: 0;
        }
        .zoom__modal-bottom-info {
          opacity: 1;
          top: 28px;
        }
      }
    }

    &-arrow {
      position: relative;
      flex: 2;
      display: flex;
      justify-content: center;
      > :deep(svg) {
        transition: 0.4s;
        position: relative;
        top: 33%;
        width: 120px;
        fill: rgba(255, 255, 255, 0.1);
        cursor: pointer;
      }
      &:hover {
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 1) 0%,
          rgba(20, 20, 20, 1) 100%
        );
        > :deep(svg) {
          background-color: transparent;
          fill: rgba(255, 255, 255);
        }
      }
      &_left {
        &:hover {
          background: linear-gradient(
            270deg,
            rgba(0, 0, 0, 1) 0%,
            rgba(20, 20, 20, 1) 100%
          );
        }
      }
    }

    &-content {
      flex: 9;
      width: 100%;
      overflow: hidden;
      border-radius: $borderRadiusMain;
      > :deep(img) {
        object-fit: cover;
        width: 100%;
        height: 100%;
        border-radius: 0;
      }
    }
  }
}

@media screen and (max-width: 549px) {
  .zoom__modal-arrow {
    flex: 1;
    > :deep(svg) {
      top: 19%;
      width: 40px;
    }
  }
  .zoom__modal-main {
    padding-top: 100px;
    flex: 10;
  }
  .zoom__modal-close {
    right: 24px;
    top: 30px;
  }
  .zoom__modal-bottom {
    flex: 11;
  }
  .zoom__modal-bottom-info {
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
</style>
