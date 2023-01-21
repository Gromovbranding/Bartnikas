<script lang="ts" setup>
const mediaTabs = ref([
  {
    component: shallowRef(resolveComponent("AppMediaTabLastest")),
    label: "Lastest News",
  },
  {
    component: shallowRef(resolveComponent("AppMediaTabKit")),
    label: "Media Kit",
  },
  {
    component: shallowRef(resolveComponent("AppMediaTabPresentation")),
    label: "Presentation",
  },
  {
    component: shallowRef(resolveComponent("AppMediaTabCV")),
    label: "CV",
  },
  {
    component: shallowRef(resolveComponent("AppMediaTabPublications")),
    label: "Publications",
  },
  {
    component: shallowRef(resolveComponent("AppMediaTabExhibitions")),
    label: "Exhibitions",
  },
]);

const selectedTab = ref(mediaTabs.value[0]);
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
          <component
            :is="selectedTab.component"
            :key="JSON.stringify(selectedTab.component)"
          />
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
  display: flex;
  gap: 80px;
  position: relative;
  padding: 80px 40px;
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
