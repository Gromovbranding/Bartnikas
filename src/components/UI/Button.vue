<script lang="ts" setup>
import { RouteLocationRaw } from "vue-router";

interface Props {
  isGrey?: boolean;
  isWhite?: boolean;
  isTextUppercase?: boolean;
  href?: RouteLocationRaw;
}

const props = withDefaults(defineProps<Props>(), {
  isGrey: false,
  isTextUppercase: true,
  isWhite: false,
  href: "",
});

const classes = computed(() => {
  return [
    "btn-default",
    {
      "btn-default--grey": props.isGrey,
      "btn-default--white": props.isWhite,
      "btn-default--uppercase": props.isTextUppercase,
    },
  ];
});
</script>

<template>
  <NuxtLink v-if="href" :to="href" :class="classes">
    <slot />
  </NuxtLink>
  <button v-else :class="classes">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.btn-default {
  display: block;
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

  &:hover {
    transform: translateY(-20px);
  }

  &--grey {
    background-color: $colorBackgroundGreyDarken;
    color: #000;
  }

  &--white {
    background-color: #fff;
    color: $colorAccentBlue;
  }

  &--uppercase {
    text-transform: uppercase;
  }
}
</style>
