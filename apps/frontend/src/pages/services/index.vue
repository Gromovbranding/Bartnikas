<script setup lang="ts">

const { t } = useI18n()

const breadcrumbLinks = ref([
  {
    href: '/',
    text: t('titles.home')
  },
  {
    href: '/services',
    text: t('titles.services')
  }
])
</script>

<template>
  <main class="services-page">
    <Title>{{ $t('titles.services') }}</Title>
    <AppBreadCrumb class="services-page__breadcrumb" :links="breadcrumbLinks" />
    <AppChooseFormatSection class="services-page__choose-format" />
    <AppSpecialSection />
  </main>
</template>

<style scoped lang="scss">
.services-page {
  padding-top: 2.083rem;

  &__breadcrumb {
    font-size: 1.25rem;
    padding: 0 3.385rem;
    margin-bottom: 2.604rem;
  }

  &__choose-format {
    padding-top: 0;
  }
}

@media screen and (max-width: 1000px) {
  .services-page {
    padding-top: 5rem;
  }
}

@media screen and (max-width: 550px) {
  .services-page {
    padding-top: 7.532rem;

    &__breadcrumb {
      font-size: 1.221rem;
      padding: 0 1.628rem;
      margin-bottom: 1.425rem;
    }
  }
}
</style>
