<script lang="ts" setup>
import { UploadUserFile } from "element-plus";
import {
  // IProjectImageSizes,
  // IFile,
  IProject,
  // IProjectImageDetail,
  ListUnitSize,
  PartialAdminApiDto,
} from "~/types/admin-api";

interface ImageDetails {
  [key: number]: {
    name: string;
    price: number;
    sizes: {
      width: number;
      height: number;
      unit: ListUnitSize;
    }[];
  };
}

const name = ref("Create Project");

useHeadSafe({
  title: name.value,
});

const { fetchPost } = useApi();

const handleCreate = (
  body: PartialAdminApiDto<IProject>,
  images: UploadUserFile[],
  imageDetails: ImageDetails
) => {
  const details: any[] = [];
  const { description, title } = body;
  images.forEach((img) => {
    const { sizes, price, name } = imageDetails[img.uid!];
    details.push({
      image_name: name,
      price,
      sizes,
      image: img.response,
    });
  });
  fetchPost("/projects", { title, description, details });
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
        ]"
        :name="name"
        :cb-create="handleCreate"
        back="projects"
      />
    </ClientOnly>
  </div>
</template>
