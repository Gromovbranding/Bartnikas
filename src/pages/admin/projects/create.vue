<script lang="ts" setup>
import { UploadUserFile } from "element-plus";

const name = ref("Create Project");

useHeadSafe({
  title: name.value,
});

// const { fetchPost } = useApi();

const create = async (body: any, images: UploadUserFile[]) => {
  await console.log(body, images);
  // return;
  // const response = await fetchPost<{ id: string }>("/projects", body);
  // await fetchPost(`${response.id}/image`, images);
};
</script>

<template>
  <div>
    <ClientOnly>
      <AdminCardCreate
        :form="{
          title: {
            value: '',
            label: 'Title',
            type: 'input',
          },
          desc: {
            value: '',
            label: 'Description',
            type: 'textarea',
          },
        }"
        :name="name"
        back="projects"
        :cb-create="create"
      />
    </ClientOnly>
  </div>
</template>
