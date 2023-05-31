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

const { fetchPost, fetchGet } = useApi();

const { data: projectGroups } = await useAsyncData<string[]>(
  "groups",
  async () => await fetchGet("/projects/group/all")
);

type ImageDetail = PartialAdminApiDto<IProjectImageDetail> & {
  [x: string]: PartialAdminApiDto<IProjectImageDetail>;
};

const handleCreate = async (
  body: Omit<PartialAdminApiDto<IProject>, "details"> | null,
  images: UploadUserFile[],
  imageDetails: ImageDetail[],
  clb: any
) => {
  if (!body) return;

  const details = images.map((img) => {
    const { sizes, price, image_name } = imageDetails[img.uid! - 1];

    return {
      image_name,
      price,
      sizes,
      image: img.response as PartialFileAdminApiDto,
    };
  });
  const group = body.group === "__new" ? body.newgroup : body.group;
  const collab = body.is_collab ? clb : null;

  await fetchPost("/projects", { ...body, collab, group, details });
  navigateTo("/admin/projects");
};

const groupOptions = computed(() => {
  const arr =
    projectGroups.value?.map((item) => ({
      value: item,
      label: item,
    })) ?? [];
  arr.push({
    value: "__new",
    label: "New group",
  });
  return arr;
});

const form = reactive([
  {
    value: "",
    label: "Title",
    type: "text",
    prop: "title",
  },
  {
    value: "",
    label: "Description",
    type: "textarea",
    prop: "description",
  },
  {
    value: "__new",
    label: "Group",
    type: "select",
    prop: "group",
    options: groupOptions,
  },
  {
    value: "",
    label: "New group",
    type: "text",
    prop: "newgroup",
  },
  {
    value: false,
    label: "Is collab",
    type: "checkbox",
    prop: "is_collab",
  },
]);

onMounted(() => {
  form[2].value = groupOptions.value[0].value;
});

watch(
  () => form[2].value,
  (val) => {
    const idx = form.findIndex((item) => item.prop === "newgroup");
    if (val === "__new" && idx < 0) {
      return form.splice(3, 0, {
        value: "",
        label: "New group",
        type: "text",
        prop: "newgroup",
      });
    }
    form.splice(idx, 1);
  }
);
</script>

<template>
  <div>
    <ClientOnly>
      <AdminCardCreateProjects
        :form="form"
        :name="name"
        :cb-create="handleCreate"
        back="projects"
      />
    </ClientOnly>
  </div>
</template>
