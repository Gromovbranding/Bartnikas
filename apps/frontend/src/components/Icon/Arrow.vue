<script lang="ts" setup>
interface Props {
  isArrow30Deg: boolean;
}

withDefaults(defineProps<Props>(), {
  isArrow30Deg: false
})
</script>

<template>
  <svg
    v-if="isArrow30Deg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 29.71 29.82"
  >
    <g id="Слой_2" data-name="Слой 2">
      <g id="Слой_1-2" data-name="Слой 1">
        <polygon
          points="29.71 29.82 27.71 29.82 27.71 2 0.33 2 0.33 0 29.71 0 29.71 29.82"
        />
        <rect
          x="-5.07"
          y="14.17"
          width="39.44"
          height="2"
          transform="translate(-6.43 14.8) rotate(-45)"
        />
      </g>
    </g>
  </svg>
</template>
