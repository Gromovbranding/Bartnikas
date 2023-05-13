<script lang="ts" setup>
import { UploadUserFile } from "element-plus";
import { IProject } from "~/types/admin-api";

interface ImageDetails {
  [key: number]: {
    name: string;
    price: number;
    sizes: {
      width: number;
      height: number;
      unit: "cm";
    }[];
  };
}

definePageMeta({
  validate(route) {
    return /^\d+$/.test(route.params.id as string);
  },
});

const { fetchGet, fetchPatch } = useApi();
const route = useRoute();

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

const projectImages = ref<ImageDetails>({});
const fileList = ref<any[]>([]);

const form = reactive({
  title: "",
  description: "",
});

getProject();

const handleUpload = (files: UploadUserFile[]) => {
  fileList.value = files;
};

function getProject() {
  const { data: entity } = useAsyncData<IProject>(
    "projects",
    async () => await fetchGet(`/projects/${route.params.id}`)
  );
  form.title = entity.value?.title || "";
  form.description = entity.value?.description || "";
  entity.value?.details.forEach((item, idx) => {
    fileList.value.push({
      ...item.image,
      uid: idx + 1,
    });
    projectImages.value[idx + 1] = {
      name: item.image_name,
      price: item.price,
      sizes: item.sizes,
    };
  });
}

function onSave() {
  const { description, title } = form;
  const details: any[] = [];
  fileList.value.forEach((item) => {
    const { sizes, name, price } = projectImages.value[item.uid];
    const image = item.response
      ? item.response
      : {
          name: item.name,
          url: item.url,
        };
    details.push({
      sizes,
      price,
      image_name: name,
      image,
    });
  });
  fetchPatch(`/projects/${route.params.id}`, {
    title,
    description,
    details,
  });
}
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

        <ElFormItem required label="Project Images">
          <AdminUploadProjectImage
            :image-details="projectImages"
            :list="fileList"
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
