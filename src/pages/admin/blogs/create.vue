<script lang="ts" setup>
import { UploadUserFile } from "element-plus";
import { IBlog } from "~/types/admin-api";

const name = ref("Create Article");
const { fetchPost } = useApi();

useHeadSafe({
  title: name.value,
});

const handleCreate = (body: IBlog | null = null, images: UploadUserFile[]) => {
  if (!body) return;
  const reqImages = images.map((img) => ({
    url: img.response.url,
    name: img.response.name,
  }));
  const { description, title, text } = body;
  fetchPost("/blogs", {
    title,
    description,
    text,
    images: reqImages,
  });
};
</script>

<template>
  <div>
    <ClientOnly>
      <AdminCardCreate
        :form="[
          {
            value: '',
            label: 'Title',
            type: 'text',
            prop: 'title',
          },
          {
            value: '',
            label: 'Description',
            type: 'textarea',
            prop: 'description',
          },
          {
            value: '',
            label: 'Text',
            type: 'textarea',
            prop: 'text',
          },
        ]"
        :name="name"
        back="blogs"
        :cb-create="handleCreate"
      />
    </ClientOnly>
  </div>
</template>
