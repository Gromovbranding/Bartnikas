<script lang="ts" setup>
import { UploadUserFile } from "element-plus";
import { ITestimonial, PartialAdminApiDto } from "~/types/admin-api";

definePageMeta({
  layout: "admin",
});

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
    required: true,
  },
  {
    value: "",
    label: "Additional info",
    type: "text",
    prop: "additional_info",
    required: true,
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
  if (videos[0]) {
    req.url = null;
    req.file = videos[0].response;
  }

  const res = await fetchPost("/testimonials", req);
  if (res.id) navigateTo("/admin/testimonials");
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
        :file-required="false"
      />
    </ClientOnly>
  </div>
</template>
