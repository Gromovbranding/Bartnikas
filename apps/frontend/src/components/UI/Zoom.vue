<script lang="ts" setup>
interface Props {
  zoomIconPosition?:
    | 'center-center'
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left';
  zoomIconFill?: string;
}

withDefaults(defineProps<Props>(), {
  zoomIconPosition: 'top-right',
  zoomIconFill: '#000'
})

const isVisible = ref(false)
</script>

<template>
  <div class="zoom__container" @click="isVisible = true">
    <div
      :class="[
        `zoom__container-icon zoom__container-icon--${zoomIconPosition}`,
      ]"
    >
      <IconZoom :style="{ fill: zoomIconFill }" />
    </div>
    <div class="zoom__container-content">
      <slot />
    </div>
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isVisible" class="zoom__modal">
        <div class="zoom__modal-close" @click.stop="isVisible = false">
          <IconClose />
        </div>
        <div class="zoom__modal-content">
          <slot />
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

      &--center {
        &-center {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      &--top {
        &-right {
          top: 20px;
          right: 25px;
        }

        &-left {
          top: 20px;
          left: 25px;
        }
      }

      &--bottom {
        &-right {
          bottom: 20px;
          right: 25px;
        }

        &-left {
          bottom: 20px;
          left: 25px;
        }
      }

      > :deep(svg) {
        width: 32px;
        height: 32px;
        fill: #000;
      }
    }
  }

  &__modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 8;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: change-color(
      $color: $colorBackgroundGreyDarken,
      $alpha: 0.8
    );

    &-close {
      position: absolute;
      top: 20px;
      background-color: #fff;
      border-radius: 50%;
      cursor: pointer;

      padding: 15px;
      > :deep(svg) {
        width: 28px;
        height: 28px;
        fill: #000;
      }
    }

    &-content {
      width: max-content;
      padding: 40px;
      max-height: 850px;
      overflow: hidden;
      border-radius: $borderRadiusMain;
      > :deep(img) {
        object-fit: cover;
        width: 100%;
      }

      > :deep(picture) {
        object-fit: cover;
        width: 100%;
      }
    }
  }
}
</style>
