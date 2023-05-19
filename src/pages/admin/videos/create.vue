<script lang="ts" setup>
import { UploadUserFile } from "element-plus";
import { IVideoCollection, PartialAdminApiDto } from "~/types/admin-api";

const name = ref("Add video");
const { fetchPost } = useApi();

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
    label: "Group",
    type: "text",
    prop: "group",
  },
]);

const handleCreate = async (
  body:
    | (PartialAdminApiDto<IVideoCollection> & { group: string | null })
    | null,
  videos: UploadUserFile[]
) => {
  if (!body || !body.group) return;

  await fetchPost("/video-collection", {
    title: body.title,
    group: {
      name: body.group.toLowerCase(),
    },
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
