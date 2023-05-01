<script lang="ts" setup>
import { UploadUserFile } from "element-plus";

const name = ref("Create Project");

useHeadSafe({
  title: name.value,
});

const { fetchPostCreateByRouteWithImages } = useApi();

const handleCreate = async (body: any = null, images: UploadUserFile[]) => {
  await fetchPostCreateByRouteWithImages("/projects", body, images);
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
        ]"
        :name="name"
        :cb-create="handleCreate"
        back="projects"
      />
    </ClientOnly>
  </div>
</template>
