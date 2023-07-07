<script lang="ts" setup>
definePageMeta({
  layout: "admin",
});

const {
  ProjectsData: { form, headTitle, navigateBack, rules },
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
  >
    <AdminTemplateFormProjects />
  </AdminTemplateCardCreateOrEdit>
</template>
