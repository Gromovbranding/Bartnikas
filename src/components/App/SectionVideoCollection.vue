<template>
  <section class="video-collections">
    <AppSectionHeader to="/video-collection">
      Video Collection
    </AppSectionHeader>
    <div class="video-collections__content">
      <AppVideoCollection />
      <AppVideoCollection />
      <AppVideoCollection />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.video-collections {
  margin-top: 120px;
  padding: 40px 40px 120px 40px;

  background-color: $colorBackgroundGrey;

  &__content {
    display: grid;
    grid-template-columns: repeat(3, minmax(min-content, 100%));
    column-gap: 45px;
  }
}
</style>
