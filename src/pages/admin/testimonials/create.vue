<script lang="ts" setup>
import { UploadUserFile } from "element-plus";
import { ITestimonial, PartialAdminApiDto } from "~/types/admin-api";

const name = ref("Add testimonial");
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
    label: "Additional info",
    type: "text",
    prop: "additional_info",
  },
  {
    value: "",
    label: "Youtube url",
    type: "url",
    prop: "url",
  },
]);

const handleCreate = async (
  body: PartialAdminApiDto<ITestimonial> | null,
  videos: UploadUserFile[]
) => {
  if (!body) return;
  const req = { ...body };
  if (videos[0]) req.file = videos[0].response;

  await fetchPost("/testimonials", req);
};
</script>

<template>
  <div>
    <ClientOnly>
      <AdminCardCreate
        :form="form"
        :name="name"
        back="testimonials"
        :cb-create="handleCreate"
        video
      />
    </ClientOnly>
  </div>
</template>
