<script lang="ts" setup>
const name = ref("Create Article");

useHeadSafe({
  title: name.value,
});

const form = reactive({
  title: {
    value: "",
    label: "Title",
    type: "input",
  },
  desc: {
    value: "",
    label: "Description",
    type: "textarea",
  },
  text: {
    value: "",
    label: "text",
    type: "textarea",
  },
  is_hot: {
    value: false,
    label: "Is Hot",
    type: "checkbox",
  },
});
</script>

<template>
  <div>
    <ClientOnly>
      <AdminCardCreate :form="form" :name="name" back="news" />
    </ClientOnly>
  </div>
</template>
