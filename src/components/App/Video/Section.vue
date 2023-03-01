<template>
  <section class="video-collections">
    <AppSectionHeader to="/video-collection">
      Video Collection
    </AppSectionHeader>
    <div class="video-collections__content">
      <AppVideoItem />
      <AppVideoItem />
      <AppVideoItem />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.video-collections {
  margin-top: -3px;
  padding: 80px 40px;

  background-color: $colorBackgroundGrey;

  &__content {
    display: grid;
    grid-template-columns: repeat(3, minmax(min-content, 100%));
    column-gap: 45px;
  }
}
</style>
