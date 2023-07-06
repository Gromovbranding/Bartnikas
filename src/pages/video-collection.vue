<script setup lang="ts">
const { getAllVideoCollection } = usePublicData();

const { data: videos } = useAsyncData(
  "video-collection",
  async () => await getAllVideoCollection()
);

const groups = computed(() =>
  videos.value?.map((item) => item.project?.group).filter((group) => group)
);

function getGroupVideos(group: any) {
  if (!videos.value) return [];
  return videos.value.filter((video) => video.project?.group === group);
}
</script>

<template>
  <main>
    <Title> Video Collection </Title>
    <AppPageHead title="Video Collection" />
    <section class="filter">
      <UIButton
        v-for="group in groups"
        :key="'group_link-' + group"
        :to="{ hash: `#${group}` }"
        is-white
      >
        {{ group }}
      </UIButton>
      <!-- <UIButton :to="{ hash: '#backstage' }" is-white> BACKSTAGES </UIButton>
      <UIButton :to="{ hash: '#exhibition' }" is-white> EXHIBITIONS </UIButton>
      <UIButton :to="{ hash: '#interview' }" is-white> INTERVIEW </UIButton> -->
    </section>
    <div class="collection">
      <section
        v-for="group in groups"
        :id="String(group)"
        :key="'group-' + group"
        class="collection__item"
      >
        <AppSectionHeader :is-link="false">{{ group }}</AppSectionHeader>
        <!-- <div class="collection__select">
          <span>Project:</span>
          <UISelect
            :list="[
              {
                label: 'xPalienko',
                value: 'xPalienko',
              },
              {
                label: 'xPalienko2',
                value: 'xPalienko2',
              },
              {
                label: 'xPalienko3',
                value: 'xPalienko3',
              },
            ]"
          />
        </div> -->
        <div class="grid">
          <AppVideoItem
            v-for="item in getGroupVideos(group)"
            :key="`backstage-item-${item.id}`"
            :item="item"
          />
        </div>
      </section>
      <!-- <section id="exhibition" class="collection__item">
        <AppSectionHeader :is-link="false"> EXHIBITIONS </AppSectionHeader>
        <div class="grid">
          <AppVideoItem v-for="i in 8" :key="`exhibition-item-${i}`" />
        </div>
      </section>
      <section id="interview" class="collection__item">
        <AppSectionHeader :is-link="false"> INTERVIEW </AppSectionHeader>
        <div class="grid">
          <AppVideoItem v-for="i in 8" :key="`interview-item-${i}`" />
        </div>
      </section> -->
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
      font-weight: 500;
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
