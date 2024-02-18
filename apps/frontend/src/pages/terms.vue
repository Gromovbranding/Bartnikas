<script lang="ts" setup>
import type { ITermsStatic } from '@/types/admin-api'

const { t } = useI18n()
const { getTermsStatic } = usePublicData()

const { data: termsStatic } = await useAsyncData<ITermsStatic[]>(
  'termsStatic',
  async () => await getTermsStatic()
)

useHeadSafe({
  title: t('titles.termsConditions'),
  meta: [
    {
      name: 'description',
      content: 'My Terms & Conditions'
    }

  ]
})
</script>

<template>
  <main>
    <AppPageHead :title="$t('titles.termsConditions')" bg-color="grey" />
    <AppSectionTermCollection :list="termsStatic" />
  </main>
</template>
