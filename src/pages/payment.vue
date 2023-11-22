<script lang="ts" setup>
import type { ITermsStatic } from "@/types/admin-api";

const { getDeliveryStatic } = usePublicData();

const { data: deliveryStatic } = useAsyncData<ITermsStatic[]>(
  "deliveryStatic",
  async () => await getDeliveryStatic()
);

useHeadSafe({
  title: "Payment & Delivery",
  meta: [
    {
      name: "description",
      content: "My Payment & Delivery",
    },
    {
      name: "robots",
      content: "index,follow",
    },
  ],
});
</script>

<template>
  <main>
    <AppPageHead title="Payment & Delivery" bg-color="grey" />
    <AppSectionTermCollection :list="deliveryStatic" />
  </main>
</template>
