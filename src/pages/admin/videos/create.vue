<script lang="ts" setup>
import { UploadUserFile } from "element-plus";
import { IVideoCollection } from "~/types/admin-api";

const name = ref("Add video");
const { fetchPost } = useApi();

useHeadSafe({
  title: name.value,
});

const form = reactive([
  {
    value: "",
    label: "Title",
    type: "input",
    prop: "title",
  },
  {
    value: "",
    label: "Group",
    type: "input",
    prop: "group",
  },
]);

const handleCreate = (
  body: IVideoCollection | null = null,
  videos: UploadUserFile[]
) => {
  if (!body) return;
  const group = body.group as string;
  fetchPost("/video-collection", {
    title: body.title,
    group: {
      name: group.toLowerCase(),
    },
    video: videos[0].response,
  });
};

// {
//   "title": "string",
//   "video": {
//     "name": "string",
//     "url": "string"
//   },
//   "group": {
//     "name": "string"
//   }
// }
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
