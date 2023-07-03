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

const handleCreate = async (
  body: PartialAdminApiDto<IBlog> | null,
  images: UploadUserFile[]
) => {
  if (!body) return;
  await fetchPost<IBlog>("/blogs", {
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
