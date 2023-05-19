<!-- eslint-disable camelcase -->
<script lang="ts" setup>
import { UploadUserFile } from "element-plus";
import { IArticle, PartialAdminApiDto } from "~/types/admin-api";

const name = ref("Create Article");
const { fetchPost } = useApi();

useHeadSafe({
  title: name.value,
});

const form = reactive([
  {
    value: "",
    label: "Title",
    type: "text",
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

const handleCreate = async (
  body: PartialAdminApiDto<IArticle> | null,
  images: UploadUserFile[]
) => {
  if (!body) return;
  await fetchPost<IArticle>("/news", {
    ...body,
    images: images.map((img) => ({
      name: img.response?.name,
    })),
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
