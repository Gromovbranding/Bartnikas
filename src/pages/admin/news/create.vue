<script lang="ts" setup>
import { UploadUserFile } from "element-plus";
import { IArticle, PartialAdminApiDto } from "~/types/admin-api";

definePageMeta({
  layout: "admin",
});

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
    required: true,
  },
  {
    value: "",
    label: "Description",
    type: "textarea",
    prop: "description",
    required: true,
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
    required: true,
  },
]);

const handleCreate = async (
  body: PartialAdminApiDto<IArticle> | null,
  images: UploadUserFile[]
) => {
  if (!body) return;
  const res = await fetchPost<IArticle>("/news", {
    ...body,
    images: images.map((img) => ({
      name: img.response?.name,
    })),
  });
  if (res.id) navigateTo("/admin/news");
};

function reset() {
  form.forEach((item) => {
    if (item.type === "checkbox") return (item.value = false);
    item.value = "";
  });
}
</script>

<template>
  <div>
    <ClientOnly>
      <AdminCardCreate
        :form="form"
        :name="name"
        back="news"
        :cb-create="handleCreate"
        @reset="reset"
      />
    </ClientOnly>
  </div>
</template>
