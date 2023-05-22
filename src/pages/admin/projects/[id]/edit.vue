<!-- eslint-disable camelcase -->
<script lang="ts" setup>
import { UploadUserFile } from "element-plus";
import {
  IProject,
  IProjectImageDetail,
  PartialAdminApiDto,
  PartialFileAdminApiDto,
} from "@/types/admin-api";

definePageMeta({
  validate(route) {
    return /^\d+$/.test(route.params.id as string);
  },
});

const { fetchGet, fetchPatch } = useApi();
const route = useRoute();

const { data: entity, refresh } = await useAsyncData<IProject>(
  "project",
  async () => await fetchGet(`/projects/${route.params.id}`)
);

const rules = reactive({
  title: [
    {
      required: true,
      message: "Please input title",
      trigger: "change",
    },
  ],
  description: [
    {
      required: true,
      message: "Please input description",
      trigger: "change",
    },
  ],
});

const projectImages = ref<
  Omit<PartialAdminApiDto<IProjectImageDetail>, "image">[]
>(
  (entity.value?.details ?? []).map((item) => ({
    image_name: item.image_name,
    sizes: item.sizes,
    price: item.price,
  }))
);

const fileList = ref<any[]>(
  (entity.value?.details ?? []).map((item, idx) => ({
    ...item.image,
    uid: idx + 1,
  }))
);

const form = reactive({
  title: entity.value?.title ?? "",
  description: entity.value?.description ?? "",
  group: entity.value?.group ?? "",
});

const handleUpload = (files: UploadUserFile[]) => {
  fileList.value = files;
};

const handlePatch = async () => {
  const details = fileList.value.map((item) => {
    const { sizes, image_name, price } = projectImages.value[item.uid - 1];

    return {
      image_name,
      price,
      sizes,
      image: (item.response
        ? item.response
        : {
            name: item.name,
          }) as PartialFileAdminApiDto,
    };
  });

  await fetchPatch(`/projects/${route.params.id}`, {
    ...form,
    details,
  });

  await refresh();
};

// function getProject() {
//   const { data } = useAsyncData<IProject>(
//     "projects",
//     async () => await fetchGet(`/projects/${route.params.id}`)
//   );
//   projectImages.value = (entity.value?.details ?? []).map((item) => ({
//     image_name: item.image_name,
//     sizes: item.sizes,
//     price: item.price,
//   }))
//   fileList.value = (entity.value?.details ?? []).map((item, idx) => ({
//     ...item.image,
//     uid: idx + 1,
//   }))
//   form.description = data.value?.description || ''
//   form.group = data.value?.group || ''
//   form.title = data.value?.title || ''
// }

// onMounted(() => {
//   getProject()
// })
</script>

<template>
  <ElCard>
    <template #header>
      <div class="card-header">
        <span> Project {{ form.title }} </span>
        <ElButton type="default" plain @click="navigateTo('/admin/projects')">
          Back
        </ElButton>
      </div>
    </template>

    <ClientOnly>
      <ElForm :model="form" :rules="rules" label-width="120px">
        <ElFormItem label="Title" prop="title">
          <ElInput v-model="form.title" />
        </ElFormItem>

        <ElFormItem label="Description" prop="description">
          <ElInput v-model="form.description" :rows="5" type="textarea" />
        </ElFormItem>

        <ElFormItem label="Group" prop="group">
          <ElInput v-model="form.group" :rows="5" type="text" />
        </ElFormItem>

        <ElFormItem required label="Project Images">
          <AdminUploadProjectImage
            :image-details="projectImages"
            :list="fileList"
            @uploadFile="handleUpload"
          />
        </ElFormItem>

        <ElFormItem>
          <ElButton type="primary" @click="handlePatch"> Save </ElButton>
          <ElButton>Delete</ElButton>
        </ElFormItem>
      </ElForm>
    </ClientOnly>
  </ElCard>
</template>
