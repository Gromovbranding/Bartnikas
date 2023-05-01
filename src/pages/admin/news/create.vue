<script lang="ts" setup>
import { UploadUserFile } from "element-plus";
import { IArticle } from "~/types/admin-api";

const name = ref("Create Article");

useHeadSafe({
  title: name.value,
});

const { fetchPostCreateByRouteWithImages } = useApi();

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

const handleCreate = async (
  body: IArticle | null = null,
  images: UploadUserFile[]
) => {
  await fetchPostCreateByRouteWithImages("/news", body, images);
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
