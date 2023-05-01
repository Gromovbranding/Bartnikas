<script lang="ts" setup>
import { UploadUserFile } from "element-plus";

const name = ref("Create Project");

useHeadSafe({
  title: name.value,
});

const { fetchPost } = useApi();

const handleCreate = async (body: any, images: UploadUserFile[]) => {
  const formData = new FormData();
  formData.append("file", images[0].raw);

  const imagesSaved = await fetchPost("/files", formData);

  await fetchPost("/projects", {
    ...body,
    images: [imagesSaved],
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
        ]"
        :name="name"
        :cb-create="handleCreate"
        back="projects"
      />
    </ClientOnly>
  </div>
</template>
