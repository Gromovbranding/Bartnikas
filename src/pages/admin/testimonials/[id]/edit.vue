<script lang="ts" setup>
definePageMeta({
  layout: "admin",
  validate(route) {
    return /^\d+$/.test(route.params.id as string);
  },
});

const route = useRoute();

const {
  TestimonialsData: { form, headTitle, navigateBack, rules, getFetchersByID },
} = useAdmin();

useHeadSafe({
  title: headTitle.edit,
});

const {
  data: { entitiy },
} = await getFetchersByID(Number(route.params.id));

form.value = entitiy.value!;
</script>

<template>
  <AdminTemplateCardCreateOrEdit
    :rule-form="form"
    :rules-form="rules"
    :head-title="headTitle.edit"
    :navigate-back="navigateBack"
    type="update"
  >
    <AdminTemplateFormTestimonials />
  </AdminTemplateCardCreateOrEdit>
</template>
