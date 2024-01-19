<script setup lang="ts">
const { getAllVideoCollection } = usePublicData();

const { t } = useI18n();
const { data: videos } = useAsyncData(
  "video-collection",
  async () => await getAllVideoCollection()
);

const groups = computed(() =>
  videos.value?.map((item) => item.project?.group).filter((group) => group)
);

function getGroupVideos(group: any) {
  return (videos.value ?? []).filter((video) => video.project?.group === group);
}

useHeadSafe({
  title: t("titles.videoCollection"),
  meta: [
    {
      name: "description",
      content: "My Video Collection",
    },
  ],
});
</script>

<template>
  <main>
    <AppPageHead :title="$t('titles.videoCollection')" />
    <section class="filter">
      <UIButton
        v-for="group in groups"
        :key="'group_link-' + group"
        style="font-weight: 700"
        :to="{ hash: `#${group}` }"
        is-white
      >
        {{ group }}
      </UIButton>
    </section>
    <div class="collection">
      <section
        v-for="group in groups"
        :id="String(group)"
        :key="'group-' + group"
        class="collection__item"
      >
        <h2 class="collection__caption">{{ group }}</h2>
        <div class="grid">
          <AppVideoItem
            v-for="item in getGroupVideos(group)"
            :key="`backstage-item-${item.id}`"
            :item="item"
          />
        </div>
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  background-color: $colorBackgroundGreyDarken;
}
.collection {
  padding: 80px 40px;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  &__caption {
    font-size: 10rem;
    display: flex;
    text-transform: uppercase;
    font-weight: bold;
    line-height: 1em;
    margin-bottom: 15px;
  }
  &__select {
    display: flex;
    align-items: center;
    gap: 25px;
    margin-bottom: 50px;

    span {
      font-size: 32px;
      font-weight: 400;
    }
  }
}

.filter {
  position: sticky;
  top: 10px;
  padding: 20px 40px;
  background-color: $colorAccentBlue;
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
  border-bottom-left-radius: $borderRadiusMain;
  border-bottom-right-radius: $borderRadiusMain;
  transform: translateY(-10px);
  z-index: 8;

  > :deep(.btn-default) {
    padding: 2rem 4rem;
    font-weight: 400;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3rem;
}

@media screen and (min-width: 551px) and (max-width: 1000px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }
  .filter {
    > :deep(.btn-default) {
      padding: 2rem 4rem;
      font-weight: 400;
    }
  }
}

@media screen and (max-width: 550px) {
  main {
  }
  .collection {
    padding: 80px 16px;
    &__select {
      span {
      }
    }
  }

  .filter {
    align-items: flex-start;
    padding: 20px 16px;
    gap: 0;
    justify-content: space-between;
    flex-wrap: wrap;
    row-gap: 20px;
    > :deep(.btn-default) {
      width: calc(50% - 6px);
      padding: 18px 0;
      font-size: 5vw;
    }
  }

  .grid {
    display: flex;
    flex-direction: column;
  }

  // AppSectionHeader
  :deep(.caption) {
    h2 {
      font-size: 12vw;
    }
  }
}
</style>
