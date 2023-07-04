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

definePageMeta({
  layout: "admin",
});

interface ImageDetails {
  [key: number]: {
    year: number;
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

const form = reactive([
  {
    value: "",
    label: "Title",
    type: "text",
    prop: "title",
    required: true,
  },
  {
    value: "",
    label: "Description",
    type: "textarea",
    prop: "description",
    required: true,
  },
]);

const { fetchPost } = useApi();

const handleCreate = async (
  body: PartialAdminApiDto<IProject>,
  avatar: UploadUserFile[],
  images: UploadUserFile[],
  imageDetails: ImageDetails
) => {
  const { title, description } = body;
  const degress: ImageDetails[number][] = [];
  const imagesByYear: {
    [key: number]: any[];
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
      year: Number(year),
      groups: [
        ...(gold.images.length > 0 ? [gold] : []),
        ...(silver.images.length > 0 ? [silver] : []),
      ],
    });
  });
  const res = await fetchPost("/awards", {
    title,
    description,
    degress,
    awards_avatar: {
      name: avatar[0].name,
      url: avatar[0].url,
    },
  });
  if (res.id) navigateTo("/admin/awards");
};

function reset() {
  form.forEach((item) => (item.value = ""));
}
</script>

<template>
  <div>
    <ClientOnly>
      <AdminCardCreateAwards
        :form="form"
        :name="name"
        :cb-create="handleCreate"
        back="awards"
        @reset="reset"
      />
    </ClientOnly>
  </div>
</template>
