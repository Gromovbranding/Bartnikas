<template>
  <div class="grid">
    <AppMediaItemmedia />
    <AppMediaItemmedia />
    <AppMediaItemmedia />
    <AppMediaItemmedia />
  </div>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-gap: 120px 80px;
  grid-template-columns: 1fr 1fr;
}
</style>
