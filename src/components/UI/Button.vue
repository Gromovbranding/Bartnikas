<script lang="ts" setup>
import { RouteLocationRaw } from "vue-router";

interface Props {
  isGrey?: boolean;
  isWhite?: boolean;
  isTextUppercase?: boolean;
  to?: RouteLocationRaw;
}

const props = withDefaults(defineProps<Props>(), {
  isGrey: false,
  isTextUppercase: true,
  isWhite: false,
  to: "",
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
  <NuxtLink v-if="props.to" :to="props.to" :class="classes">
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
  font-weight: 500;
  background-color: $colorAccentBlue;
  transform: translateY(0);
  transition: transform 0.2s ease-in-out;
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

@media screen and (min-width: 551px) and (max-width: 1000px) {
  .btn-default {
    padding: 1.5rem 1rem;
    font-size: 1.7rem;
  }
}

@media screen and (max-width: 550px) {
  .btn-default {
    padding: 1.74rem 2rem;
    font-size: 7vw;
  }
}
</style>
