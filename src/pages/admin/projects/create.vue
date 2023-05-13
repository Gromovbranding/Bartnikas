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
  // const details: PartialAdminApiDto<IProjectImageDetail>[] = [];

  // images.forEach((item) => {
  //   const image = item.response as IFile;
  //   const sizes = [
  //     {
  //       width: 100,
  //       height: 100,
  //       unit: ListUnitSize.cm,
  //     },
  //   ] as PartialAdminApiDto<IProjectImageSizes>[];

  //   details.push({
  //     price: 100,
  //     image_name: "image name photo",
  //     sizes,
  //     image,
  //   } as PartialAdminApiDto<IProjectImageDetail>);
  // });

  // body.details = details;
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

  // await fetchPost("files", body);
  fetchPost("/projects", { title, description, details });
};

// {
//   "title": "string",
//   "description": "string",
//   "details": [
//     {
//       "sizes": [
//         {
//           "width": 0,
//           "height": 0,
//           "unit": "cm"
//         }
//       ],
//       "price": 0,
//       "image_name": "string",
//       "image": {
//         "name": "string",
//         "url": "string"
//       }
//     }
//   ]
// }
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
