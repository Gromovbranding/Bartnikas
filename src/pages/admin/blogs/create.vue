<script lang="ts" setup>
definePageMeta({
  layout: "admin",
});

const {
  BlogsData: { form, headTitle, navigateBack, rules },
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
    <AdminTemplateFormBlogs />
  </AdminTemplateCardCreateOrEdit>
</template>
