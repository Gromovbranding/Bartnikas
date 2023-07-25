<script lang="ts" setup>
import { ITermsStatic } from "types/admin-api";

const { getTermsStatic } = usePublicData();

const { data: termsStatic } = useAsyncData<ITermsStatic[]>(
  "termsStatic",
  async () => await getTermsStatic()
);
</script>

<template>
  <main>
    <Title> Terms & Conditions </Title>
    <AppPageHead title="Terms & Conditions" bg-color="grey" />
    <AppSectionTermCollection :list="termsStatic" />
  </main>
</template>
