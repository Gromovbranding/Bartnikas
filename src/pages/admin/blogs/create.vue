<script lang="ts" setup>
import { UploadUserFile } from "element-plus";

const name = ref("Create Article");

useHeadSafe({
  title: name.value,
});

const { fetchPostCreateByRouteWithImages } = useApi();

const handleCreate = async (body: any = null, images: UploadUserFile[]) => {
  await fetchPostCreateByRouteWithImages("/blogs", body, images);
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
