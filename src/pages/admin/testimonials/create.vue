<script lang="ts" setup>
import { UploadUserFile } from "element-plus";
import { ITestimonial } from "~/types/admin-api";

const name = ref("Add testimonial");
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
    label: "Additional info",
    type: "input",
    prop: "additional_info",
  },
]);

const handleCreate = (
  body: ITestimonial | null = null,
  videos: UploadUserFile[]
) => {
  if (!body) return;
  const { title, additional_info: info } = body;
  fetchPost("/testimonials", {
    title,
    additional_info: info,
    file: videos[0].response,
  });
};

// {
//   "title": "string",
//   "additional_info": "string",
//   "file": {
//     "name": "string",
//     "url": "string"
//   }
// }
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
