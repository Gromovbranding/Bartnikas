<script lang="ts" setup>
const name = ref("Create Article");

useHeadSafe({
  title: name.value,
});

const form = reactive([
  {
    value: "",
    prop: "title",
    label: "Title",
    type: "input",
  },
  {
    value: "",
    prop: "desc",
    label: "Description",
    type: "textarea",
  },
  {
    value: "",
    prop: "text",
    label: "text",
    type: "textarea",
  },
  {
    value: false,
    prop: "is_hot",
    label: "Is Hot",
    type: "checkbox",
  },
]);
</script>

<template>
  <div>
    <ClientOnly>
      <AdminCardCreate :form="form" :name="name" back="news" />
    </ClientOnly>
  </div>
</template>
