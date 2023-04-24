<script lang="ts" setup>
import { UploadUserFile } from "element-plus";

const name = ref("Create Article");

useHeadSafe({
  title: name.value,
});

const { fetchUploadImages } = useApi();

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
    prop: "desc",
  },
  {
    value: "",
    label: "text",
    type: "textarea",
    prop: "text",
  },
]);

const handleCreate = async (body: any, images: UploadUserFile[]) => {
  const ids = await fetchUploadImages(images);
  console.log(body, ids);
  // await fetchPost("/news", {
  //   ...body,
  //   images: ids,
  // });
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
