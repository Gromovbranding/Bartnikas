<script lang="ts" setup>
import { UploadUserFile } from "element-plus";
import { IArticle } from "~/types/admin-api";

const name = ref("Create Article");
const { fetchPost } = useApi();

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
  if (!body) return;
  const { title, description, is_hot: isHot, text } = body;
  const reqImages = images.map((img) => ({
    url: img.response.url,
    name: img.response.name,
  }));
  fetchPost("/news", {
    title,
    description,
    is_hot: isHot,
    text,
    images: reqImages,
  });
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
