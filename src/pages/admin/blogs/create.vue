<script lang="ts" setup>
import { UploadUserFile } from "element-plus";
import { IBlog, PartialAdminApiDto } from "~/types/admin-api";

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
    value: "",
    label: "Text",
    type: "textarea",
    prop: "text",
    required: true,
  },
]);

const handleCreate = async (
  body: PartialAdminApiDto<IBlog> | null,
  images: UploadUserFile[]
) => {
  if (!body) return;
  const res = await fetchPost<IBlog>("/blogs", {
    ...body,
    images: images.map((img) => ({
      name: img.response?.name,
    })),
  });
  if (res.id) navigateTo("/admin/blogs");
};

function reset() {
  form.forEach((item) => (item.value = ""));
}
</script>

<template>
  <div>
    <ClientOnly>
      <AdminCardCreate
        :form="form"
        :name="name"
        back="blogs"
        :cb-create="handleCreate"
        @reset="reset"
      />
    </ClientOnly>
  </div>
</template>
