<script lang="ts" setup>
import { UploadUserFile } from "element-plus";
import {
  // IProjectImageSizes,
  // IFile,
  IProject,
  // IProjectImageDetail,
  // ListUnitSize,
  PartialAdminApiDto,
} from "~/types/admin-api";

interface ImageDetails {
  [key: number]: {
    year: string;
    groups: {
      type: "Gold" | "Silver";
      images: {
        name: string;
        url: string;
      }[];
    };
  };
}

const name = ref("Add Award");

useHeadSafe({
  title: name.value,
});

const { fetchPost } = useApi();

const handleCreate = (
  body: PartialAdminApiDto<IProject>,
  avatar: UploadUserFile[],
  images: UploadUserFile[],
  imageDetails: ImageDetails
) => {
  console.log("avatar", avatar);
  const { title, description } = body;
  const degress: ImageDetails[number][] = [];
  const imagesByYear: {
    [key: string]: any[];
  } = {};
  images.forEach((item) => {
    const img = imageDetails[item.uid!];
    if (img.year in imagesByYear) {
      imagesByYear[img.year].push({
        type: img.groups,
        image: item.response,
      });
      return;
    }
    imagesByYear[img.year] = [
      {
        type: img.groups,
        image: item.response,
      },
    ];
  });
  Object.keys(imagesByYear).forEach((year) => {
    const gold = {
      type: "Gold",
      images: [] as any[],
    };
    const silver = {
      type: "Silver",
      images: [] as any[],
    };
    imagesByYear[year].forEach((item) => {
      if (item.type === "Gold") return gold.images.push(item.image);
      silver.images.push(item.image);
    });
    degress.push({
      year,
      groups: [
        ...(gold.images.length > 0 ? [gold] : []),
        ...(silver.images.length > 0 ? [silver] : []),
      ],
    });
  });
  fetchPost("/awards", {
    title,
    description,
    degress,
    awards_avatar: {
      name: avatar[0].name,
      url: avatar[0].url,
    },
  });
};

// {
//   "awards_avatar": {
//     "name": "string",
//     "url": "string"
//   },
//   "title": "string",
//   "description": "string",
//   "degress": [
//     {
//       "year": "string",
//       "groups": [
//         {
//           "type": "Gold",
//           "images": [
//             {
//               "name": "string",
//               "url": "string"
//             }
//           ]
//         }
//       ]
//     }
//   ]
// }
</script>

<template>
  <div>
    <ClientOnly>
      <AdminCardCreateAwards
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
