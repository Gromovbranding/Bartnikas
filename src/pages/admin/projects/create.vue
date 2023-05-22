<!-- eslint-disable camelcase -->
<script lang="ts" setup>
import { UploadUserFile } from "element-plus";
import {
  IProject,
  IProjectImageDetail,
  PartialAdminApiDto,
  PartialFileAdminApiDto,
} from "~/types/admin-api";

const name = ref("Create Project");

useHeadSafe({
  title: name.value,
});

const { fetchPost } = useApi();

type ImageDetail = PartialAdminApiDto<IProjectImageDetail> & {
  [x: string]: PartialAdminApiDto<IProjectImageDetail>;
};

const handleCreate = async (
  body: Omit<PartialAdminApiDto<IProject>, "details"> | null,
  images: UploadUserFile[],
  imageDetails: ImageDetail[]
) => {
  if (!body) return;

  const details = images.map((img) => {
    const { sizes, price, image_name } = imageDetails[img.uid!];

    return {
      image_name,
      price,
      sizes,
      image: img.response as PartialFileAdminApiDto,
    };
  });

  await fetchPost("/projects", { ...body, details });
};
</script>

<template>
  <div>
    <ClientOnly>
      <AdminCardCreateProjects
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
            label: 'Group',
            type: 'text',
            prop: 'group',
          },
        ]"
        :name="name"
        :cb-create="handleCreate"
        back="projects"
      />
    </ClientOnly>
  </div>
</template>
