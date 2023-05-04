<script lang="ts" setup>
const name = ref("Create Article");

useHeadSafe({
  title: name.value,
});

const form = reactive([
  {
    value: "",
    label: "Title",
    type: "input",
    prop: "title",
  },
  {
    value: "",
    label: "Description",
    type: "textarea",
    prop: "description",
  },
  {
    value: "",
    label: "text",
    type: "textarea",
    prop: "text",
  },
]);

const handleCreate = async () =>
  // body: IArticle | null = null,
  // images: UploadUserFile[]
  {};
</script>

<template>
  <div>
    <ClientOnly>
      <AdminCardCreate
        :form="form"
        :name="name"
        back="news"
        :cb-create="handleCreate"
      />
    </ClientOnly>
  </div>
</template>
