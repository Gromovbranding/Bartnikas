<script lang="ts" setup>
interface Props {
  isGrey?: boolean;
  isTextUppercase?: boolean;
}

withDefaults(defineProps<Props>(), {
  isGrey: false,
  isTextUppercase: true,
});
</script>

<template>
  <button
    :class="[
      'btn-default',
      {
        'btn-default--grey': isGrey,
        'btn-default--uppercase': isTextUppercase,
      },
    ]"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.btn-default {
  padding: 30px;
  border-radius: 50px;
  cursor: pointer;
  border: none;
  font-size: 36px;
  color: #fff;
  background-color: $colorAccentBlue;
  transform: translateY(0);
  transition: transform 0.5s ease-in-out;
  font-weight: bold;
  text-align: center;

  &--grey {
    background-color: $colorBackgroundGreyDarken;
    color: #000;
  }

  &--uppercase {
    text-transform: uppercase;
  }
}
</style>
