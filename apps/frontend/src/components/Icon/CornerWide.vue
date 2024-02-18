<script lang="ts" setup>
interface Props {
  left?: boolean;
}

withDefaults(defineProps<Props>(), {
  left: false
})
</script>

<template>
  <svg
    id="Layer_1"
    :class="{ left }"
    fill="#000000"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 50.6 174.47"
    xml:space="preserve"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0" />
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      <path
        class="cls-1"
        d="M47,174.47a2.47,2.47,0,0,1-2.21-1.34L0,87.76,45.89,1.33A2.5,2.5,0,1,1,50.3,3.67L5.65,87.78l43.59,83a2.5,2.5,0,0,1-1.05,3.38A2.54,2.54,0,0,1,47,174.47Z"
      />
    </g>
  </svg>
  <!-- <svg xmlns="http://www.w3.org/2000/svg" :class="{ left }"  viewBox="0 0 330.002 330.002"> <g id="Layer_2" data-name="Layer 2"> <g id="Layer_1-2" data-name="Layer 1"> <path class="cls-1" d="M47,174.47a2.47,2.47,0,0,1-2.21-1.34L0,87.76,45.89,1.33A2.5,2.5,0,1,1,50.3,3.67L5.65,87.78l43.59,83a2.5,2.5,0,0,1-1.05,3.38A2.54,2.54,0,0,1,47,174.47Z"></path> </g> </g> </svg> -->
</template>

<style lang="scss" scoped>
svg {
  transform: rotateY(180deg);
  height: fit-content;
  height: 120px;
}
.left {
  transform: rotateY(0deg);
}
</style>
