<script lang="ts" setup>
definePageMeta({
  layout: "admin",
});

const {
  GreetingsData: { form, headTitle, navigateBack, rules, handleCreate },
} = useAdmin();

useHeadSafe({
  title: headTitle.create,
});
</script>

<template>
  <AdminTemplateCardCreateOrEdit
    :rule-form="form"
    :rules-form="rules"
    :head-title="headTitle.create"
    :navigate-back="navigateBack"
    type="create"
    @create="handleCreate"
  >
    <AdminTemplateFormGreetings />
  </AdminTemplateCardCreateOrEdit>
</template>
