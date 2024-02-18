<script lang="ts" setup>
const { t } = useI18n()

const mediaTabs = ref([
  {
    component: shallowRef(resolveComponent('AppMediaTabLastest')),
    label: t('media.latestNews')
  },
  {
    component: shallowRef(resolveComponent('AppMediaTabExhibitions')),
    label: t('media.exhibitions')
  },
  {
    component: shallowRef(resolveComponent('AppMediaTabPublications')),
    label: t('media.publications')
  },
  {
    component: shallowRef(resolveComponent('AppMediaTabKit')),
    label: t('media.mediaKit')
  },
  {
    component: shallowRef(resolveComponent('AppMediaTabPresentation')),
    label: t('media.presentation')
  }
  // {
  //   component: shallowRef(resolveComponent("AppMediaTabCV")),
  //   label: "CV",
  // },
])

const selectedTab = ref(mediaTabs.value[0])

useHeadSafe({
  title: t('titles.media'),
  meta: [
    {
      name: 'description',
      content: 'My Media'
    }
  ]
})
</script>
<template>
  <main>
    <AppPageHead :title="$t('titles.media')" />

    <section class="media">
      <div class="media__menu">
        <UIButton
          v-for="tab in mediaTabs"
          :key="`media-tab-${tab.label}`"
          style="transform: translate(0) !important"
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
    position: relative;
    flex: 1 1 100%;
  }
}

@media screen and (min-width: 551px) and (max-width: 1000px) {
  .media {
    padding: 4rem 2rem;
    &__menu {
      flex-basis: 15rem;
      gap: 1rem;
    }
  }
}

@media screen and (max-width: 550px) {
  .media {
    flex-direction: column;
    padding: 0px 16px 80px;
    &__menu {
      position: relative;
      flex: 1;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 0;
      row-gap: 16px;
      :deep(.btn-default) {
        width: calc(50% - 3.3vw);
        font-size: 5.6vw;
        padding: 20px 0;
      }
    }

    &__content {
    }
  }
}
</style>
