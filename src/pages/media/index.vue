<script lang="ts" setup>
import {
  LazyAppMediaTabLastest,
  LazyAppMediaTabKit,
  LazyAppMediaTabPresentation,
  LazyAppMediaTabCV,
  LazyAppMediaTabPublications,
  LazyAppMediaTabExhibitions,
} from "#components";

interface ITab {
  component: string;
  label: string;
}

const mediaTabs = ref<ITab[]>([
  {
    component: LazyAppMediaTabLastest,
    label: "Lastest News",
  },
  {
    component: LazyAppMediaTabKit,
    label: "Media Kit",
  },
  {
    component: LazyAppMediaTabPresentation,
    label: "Presentation",
  },
  {
    component: LazyAppMediaTabCV,
    label: "CV",
  },
  {
    component: LazyAppMediaTabPublications,
    label: "Publications",
  },
  {
    component: LazyAppMediaTabExhibitions,
    label: "Exhibitions",
  },
]);

const selectedTab = ref<ITab>(mediaTabs.value[0] as ITab);
</script>
<template>
  <main>
    <Title> Media </Title>
    <AppPageHead title="Media" />
    <section class="media">
      <div class="media__menu">
        <UIButton
          v-for="tab in mediaTabs"
          :key="`media-tab-${tab.label}`"
          :is-text-uppercase="false"
          :is-grey="tab.label !== selectedTab.label"
          @click="selectedTab = tab"
        >
          {{ tab.label }}
        </UIButton>
      </div>
      <div class="media__content">
        <Transition name="fade">
          <component :is="selectedTab.component" :key="selectedTab.component" />
        </Transition>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
  z-index: 2;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  position: absolute;
}
.media {
  margin: 80px 0;
  padding: 0 40px;
  display: flex;
  gap: 80px;
  position: relative;
  height: 100%;

  &__menu {
    display: flex;
    flex-direction: column;
    gap: 25px;
    flex: 0 0 380px;
    position: sticky;
    top: 40px;
    height: max-content;
  }

  &__content {
    overflow: hidden;
    position: relative;
    flex: 1 1 100%;
  }
}
</style>
