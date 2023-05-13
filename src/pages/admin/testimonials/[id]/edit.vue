<script lang="ts" setup>
import type { FormRules } from "element-plus";
import { ITestimonial } from "~/types/admin-api";

definePageMeta({
  validate(route) {
    return /^\d+$/.test(route.params.id as string);
  },
});

const { fetchGet, fetchPatch } = useApi();
const route = useRoute();

const { data: entity } = useAsyncData<ITestimonial>(
  "testimonial",
  async () => await fetchGet(`/testimonials/${route.params.id}`)
);

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

const fileList = ref<any[]>([]);

const form = reactive({
  title: entity.value?.title ?? "",
  additional_info: entity.value?.additional_info ?? "",
});

getTestimonial();

const handleUpload = (files: any[]) => {
  fileList.value = files;
};

function getTestimonial() {
  const { data: entity } = useAsyncData<ITestimonial>(
    "testimonial",
    async () => await fetchGet(`/testimonials/${route.params.id}`)
  );
  form.title = entity.value?.title || "";
  form.additional_info = entity.value?.additional_info || "";
  fileList.value = [entity.value?.file] || [];
}

function onSave() {
  const file = fileList.value.map((item) => ({
    name: item.response?.name || item.name,
    url: item.response?.url || item.url,
  }));
  const { title, additional_info: info } = form;
  fetchPatch(`/testimonials/${route.params.id}`, {
    title,
    additional_info: info,
    file: file[0],
  });
}

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
          <ElInput v-model="form.additional_info" :rows="5" type="textarea" />
        </ElFormItem>

        <ElFormItem required label="Images">
          <AdminUploadVideo
            :list="fileList"
            single
            @uploadFile="handleUpload"
          />
        </ElFormItem>

        <ElFormItem>
          <ElButton type="primary" @click="onSave"> Save </ElButton>
          <ElButton>Delete</ElButton>
        </ElFormItem>
      </ElForm>
    </ClientOnly>
  </ElCard>
</template>
