<script setup lang="ts">
const { getAllVideoCollection } = usePublicData();

const { data: videos } = useAsyncData(
  "video-collection",
  async () => await getAllVideoCollection()
);

const latestVideos = computed(() => videos.value?.slice(-3) || []);
</script>

<template>
  <section class="video-collections">
    <AppSectionHeader to="/video-collection">
      {{ $t("titles.videoCollection") }}
    </AppSectionHeader>
    <div class="video-collections__content">
      <AppVideoItem v-for="item in latestVideos" :key="item.id" :item="item" />
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

@media screen and (max-width: 550px) {
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
