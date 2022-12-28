<script lang="ts" setup>
interface Props {
  toCaption: string;
}

withDefaults(defineProps<Props>(), {
  toCaption: "",
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
    <a href="">
      View all <span><slot /></span>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.caption {
  padding-left: 35px;
  margin-bottom: 120px;

  h2 {
    font-size: 180px;
    display: flex;

    span {
      font-size: 33px;
      padding-top: 44px;
      font-weight: 400;
    }
  }

  a {
    color: $colorTextGrey;
    font-size: 22px;
    span {
      color: $colorTextGrey;
      text-transform: lowercase;
    }
  }
}
</style>
