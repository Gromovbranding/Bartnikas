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
  padding: 40px;

  background-color: $colorBackgroundGrey;

  &__content {
    display: grid;
    grid-template-columns: repeat(3, minmax(min-content, 100%));
    column-gap: 45px;
  }
}

@media screen and (max-width: 549px) {
  .video-collections {
    padding: 60px 16px;
    &__content {
      display: flex;
      flex-direction: column;
      gap: 60px;
      padding: 0 12px;
    }
  }

  :deep(.caption) {
    h2 {
      font-size: 11vw;
      line-height: 1.3;
    }
    a {
      font-size: 26px;
    }
  }
}
</style>
