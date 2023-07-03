<script lang="ts" setup>
import type { FormRules, UploadUserFile } from "element-plus";
import { IFile, ITestimonial } from "@/types/admin-api";

definePageMeta({
  layout: "admin",
  validate(route) {
    return /^\d+$/.test(route.params.id as string);
  },
});

const { fetchGet, fetchPatch, fetchDelete } = useApi();
const route = useRoute();

const { data: entity, refresh } = await useAsyncData<ITestimonial>(
  "testimonial",
  async () => await fetchGet(`/testimonials/${route.params.id}`)
);

useHeadSafe({
  title: `Edit testimonial ${entity.value?.title}`,
});

const rules = reactive<FormRules>({
  title: [
    {
      required: true,
      message: "Please input Title",
      trigger: "change",
    },
  ],
  additional_info: [
    {
      required: true,
      message: "Please input Info",
      trigger: "change",
    },
  ],
});

const fileList = ref<(IFile | UploadUserFile)[]>(
  [entity.value?.file].filter(Boolean)
);

const form = reactive({
  title: entity.value?.title ?? "",
  additional_info: entity.value?.additional_info ?? "",
  url: entity.value?.url ?? "",
});

const handleUpload = (files: UploadUserFile[]) => {
  fileList.value = files;
};

const handleDelete = async () => {
  try {
    await fetchDelete(`/testimonials/${entity.value?.id}`);
    await navigateTo("/admin/testimonials");
  } catch (exc) {
    console.error(exc);
  }
};

const handlePatch = async () => {
  const req = { ...form };
  const video = fileList.value.map((item) => ({
    name: item.response?.name ?? item.name,
  }))[0];
  if (video) req.file = video;
  await fetchPatch(`/testimonials/${route.params.id}`, req);

  await refresh();
};
</script>

<template>
  <ElCard>
    <template #header>
      <div class="card-header">
        <span>Edit testimonial</span>
        <ElButton
          type="default"
          plain
          @click="navigateTo('/admin/testimonials')"
        >
          Back
        </ElButton>
      </div>
    </template>

    <ClientOnly>
      <ElForm :model="form" :rules="rules" label-width="120px">
        <ElFormItem label="Title" prop="title">
          <ElInput v-model="form.title" />
        </ElFormItem>

        <ElFormItem label="Info" prop="additional_info">
          <ElInput v-model="form.additional_info" :rows="5" type="text" />
        </ElFormItem>

        <ElFormItem label="Youtube url" prop="url">
          <ElInput
            v-model="form.url"
            :rows="5"
            type="url"
            placeholder="https://www.youtube.com/watch?v=xc28wyQ-LAw"
          />
        </ElFormItem>

        <ElFormItem label="Video">
          <AdminUploadVideo
            :list="fileList"
            single
            @uploadFile="handleUpload"
          />
        </ElFormItem>

        <ElFormItem>
          <ElButton type="primary" @click="handlePatch"> Save </ElButton>
          <ElButton @click="handleDelete">Delete</ElButton>
        </ElFormItem>
      </ElForm>
    </ClientOnly>
  </ElCard>
</template>
