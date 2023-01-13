<script lang="ts" setup>
interface Props {
  toCaption?: string;
  isLink?: boolean;
  to?: string;
}

withDefaults(defineProps<Props>(), {
  toCaption: "",
  isLink: true,
  to: "/",
});
</script>

<template>
  <div class="caption">
    <h2>
      <slot />
      <span>
        {{ toCaption }}
      </span>
    </h2>
    <NuxtLink v-if="isLink" :to="to">
      View all
      <span>
        <slot />
      </span>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.caption {
  padding-left: 35px;
  margin-bottom: 90px;

  h2 {
    font-size: 13vw;
    display: flex;
    text-transform: uppercase;
    font-weight: bold;

    span {
      font-size: 33px;
      padding-top: 44px;
    }
  }

  a {
    display: block;
    color: $colorTextGrey;
    font-size: 32px;
    margin-top: 30px;
    font-weight: 300;

    span {
      color: $colorTextGrey;
      text-transform: lowercase;
    }
  }
}
</style>
