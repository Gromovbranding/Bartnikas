<script lang="ts" setup>
import { UploadUserFile } from "element-plus";

const name = ref("Create Article");

useHeadSafe({
  title: name.value,
});

const { fetchPost } = useApi();

const handleCreate = async (body: any, images: UploadUserFile[]) => {
  console.log(images);
  await fetchPost("/blogs", {
    ...body,
    images: [],
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
            type: 'input',
            prop: 'title',
          },
          {
            value: '',
            label: 'Description',
            type: 'textarea',
            prop: 'desc',
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
