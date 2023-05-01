<script lang="ts" setup>
import { UploadUserFile } from "element-plus";

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

const handleCreate = async (body: any = null, images: UploadUserFile[]) => {
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
