<script lang="ts" setup>
import { UploadUserFile } from "element-plus";
import { IArticle } from "~/types/admin-api";

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
    value: false,
    label: "Is Hot",
    type: "checkbox",
    prop: "is_hot",
  },
  {
    value: "",
    label: "text",
    type: "textarea",
    prop: "text",
  },
]);

const handleCreate = (
  body: IArticle | null = null,
  images: UploadUserFile[]
) => {
  console.log(body, images);
};
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
