<script lang="ts" setup>
import { UploadUserFile } from "element-plus";
import {
  IProjectImageSizes,
  IFile,
  IProject,
  IProjectImageDetail,
  ListUnitSize,
  PartialAdminApiDto,
} from "~/types/admin-api";

const name = ref("Create Project");

useHeadSafe({
  title: name.value,
});

const { fetchPost } = useApi();

const handleCreate = async (
  body: PartialAdminApiDto<IProject>,
  images: UploadUserFile[]
) => {
  const details: PartialAdminApiDto<IProjectImageDetail>[] = [];

  images.forEach((item) => {
    const image = item.response as IFile;
    const sizes = [
      {
        width: 100,
        height: 100,
        unit: ListUnitSize.cm,
      },
    ] as PartialAdminApiDto<IProjectImageSizes>[];

    details.push({
      price: 100,
      image_name: "image name photo",
      sizes,
      image,
    } as PartialAdminApiDto<IProjectImageDetail>);
  });

  body.details = details;

  await fetchPost("files", body);
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
