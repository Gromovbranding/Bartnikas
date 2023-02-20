<script lang="ts" setup>
import MarqueeText from "vue-marquee-text-component";
</script>
<template>
  <ClientOnly>
    <MarqueeText class="marquee-text">
      <slot />
    </MarqueeText>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.marquee-text {
  font-size: 64px;
  font-weight: bold;
  color: #fff;
}
</style>
