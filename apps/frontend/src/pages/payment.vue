<script lang="ts" setup>
import type { ITermsStatic } from '@/types/admin-api'

const { getDeliveryStatic } = usePublicData()
const { t } = useI18n()

const { data: deliveryStatic } = await useAsyncData<ITermsStatic[]>(
  'deliveryStatic',
  async () => await getDeliveryStatic()
)

useHeadSafe({
  title: t('titles.paymentDelivery'),
  meta: [
    {
      name: 'description',
      content: 'My Payment & Delivery'
    }

  ]
})
</script>

<template>
  <main>
    <AppPageHead :title="$t('titles.paymentDylivery')" bg-color="grey" />
    <AppSectionTermCollection :list="deliveryStatic" />
  </main>
</template>
