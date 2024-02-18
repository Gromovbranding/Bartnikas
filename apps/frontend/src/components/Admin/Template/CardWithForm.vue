<script setup lang="ts">
defineProps<{
  navigateBack: string;
  title: string;
}>()
</script>

<template>
  <ElCard>
    <template #header>
      <div class="card-header">
        <span style="text-transform: capitalize">
          {{ title }}
        </span>
        <ElButton
          v-if="navigateBack"
          type="default"
          plain
          @click="navigateTo(navigateBack)"
        >
          Back
        </ElButton>
      </div>
    </template>

    <ClientOnly>
      <slot />
    </ClientOnly>
  </ElCard>
</template>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
