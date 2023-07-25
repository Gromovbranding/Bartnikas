<script lang="ts" setup>
import { ITermsStatic } from "types/admin-api";

const { getTermsStatic } = usePublicData();

const { data: termsStatic } = useAsyncData<ITermsStatic[]>(
  "termsStatic",
  async () => await getTermsStatic()
);

useHeadSafe({
  title: "Terms & Conditions",
  meta: [
    {
      name: "description",
      content: "My Terms & Conditions",
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
    <AppPageHead title="Terms & Conditions" bg-color="grey" />
    <AppSectionTermCollection :list="termsStatic" />
  </main>
</template>
