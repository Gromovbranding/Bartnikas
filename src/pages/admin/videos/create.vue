<script lang="ts" setup>
import { UploadUserFile } from "element-plus";
import {
  IProject,
  IVideoCollection,
  PartialAdminApiDto,
} from "~/types/admin-api";

const name = ref("Add video");
const { fetchPost, fetchGet } = useApi();

const { data: projects } = await useAsyncData<IProject[]>(
  "projects",
  async () => await fetchGet("/projects")
);

useHeadSafe({
  title: name.value,
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
    label: "Project",
    type: "select",
    options: (projects.value || []).map((item) => ({
      value: item.id,
      label: item.title,
    })),
    prop: "project",
  },
]);

const handleCreate = async (
  body:
    | (PartialAdminApiDto<IVideoCollection> & { project: string | number })
    | null,
  videos: UploadUserFile[]
) => {
  if (!body) return;
  const project =
    projects.value?.find((item) => item.id === body.project) ?? null;

  await fetchPost("/video-collection", {
    title: body.title,
    project,
    video: videos[0].response,
  });
};
</script>

<template>
  <div>
    <ClientOnly>
      <AdminCardCreate
        :form="form"
        :name="name"
        back="videos"
        :cb-create="handleCreate"
        video
      />
    </ClientOnly>
  </div>
</template>
