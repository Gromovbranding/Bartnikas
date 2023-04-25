<script lang="ts" setup>
import { UploadUserFile } from "element-plus";

const name = ref("Create Project");

useHeadSafe({
  title: name.value,
});

// const { fetchPost, fetchUploadImages } = useApi();

const handleCreate = async (body: any, images: UploadUserFile[]) => {
  await console.log(body, images);
  // const ids = await fetchUploadImages(images);
  // await fetchPost("/projects", body);
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
        ]"
        :name="name"
        :cb-create="handleCreate"
        back="projects"
      />
    </ClientOnly>
  </div>
</template>
