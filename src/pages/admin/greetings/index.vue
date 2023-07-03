<!-- eslint-disable camelcase -->
<script lang="ts" setup>
import { UploadUserFile } from "element-plus";
import { IGreetingIndex, PartialAdminApiDto } from "~/types/admin-api";

definePageMeta({
  layout: "admin",
});

const name = ref("Greetings");
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
]);

const handleCreate = async (
  body: PartialAdminApiDto<IGreetingIndex> | null,
  videos: UploadUserFile[]
) => {
  if (!body) return;
  await fetchPost("/greeting-index", {
    ...body,
    is_active: true,
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
        :cb-create="handleCreate"
        video
      />
    </ClientOnly>
  </div>
</template>
