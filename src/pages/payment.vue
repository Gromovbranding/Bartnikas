<script lang="ts" setup>
import { ITermsStatic } from "types/admin-api";

const { getDeliveryStatic } = usePublicData();

const { data: deliveryStatic } = useAsyncData<ITermsStatic[]>(
  "deliveryStatic",
  async () => await getDeliveryStatic()
);
</script>

<template>
  <main>
    <Title> Payment & Delivery </Title>
    <AppPageHead title="Payment & Delivery" bg-color="grey" />
    <AppSectionTermCollection :list="deliveryStatic" />
  </main>
</template>
