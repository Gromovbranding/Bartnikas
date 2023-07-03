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
  layout: "admin",
  validate(route) {
    return /^\d+$/.test(route.params.id as string);
  },
});

const { fetchGet, fetchPatch, fetchDelete } = useApi();
const route = useRoute();

const collabForm = JSON.stringify({
  collab_with: "",
  description: "",
  title: "",
  press_release: [
    {
      title: "",
      text: "",
      file: {
        name: "",
      },
    },
  ],
  video: {
    name: "",
  },
});

const { data: entity, refresh } = await useAsyncData<IProject>(
  "project",
  async () => await fetchGet(`/projects/${route.params.id}`)
);

useHeadSafe({
  title: `Edit project ${entity.value?.title}`,
});

const { data: projectGroups } = await useAsyncData<string[]>(
  "groups",
  async () => await fetchGet("/projects/group/all")
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
    is_active: item.is_active,
  }))
);

const fileList = ref<any[]>(
  (entity.value?.details ?? []).map((item, idx) => ({
    ...item.image,
    uid: idx + 1,
  }))
);

const isCollab = ref(!!entity.value?.collab);

const form = reactive({
  title: entity.value?.title ?? "",
  description: entity.value?.description ?? "",
  group: entity.value?.group ?? "",
  collab: entity.value?.collab ?? JSON.parse(collabForm),
  newgroup: "",
});

const handleUpload = (files: UploadUserFile[]) => {
  fileList.value = files;
};

const handlePatch = async () => {
  const details = fileList.value.map((item) => {
    const { sizes, image_name, price, is_active } =
      projectImages.value[item.uid - 1];

    return {
      image_name,
      price,
      sizes,
      is_active,
      image: (item.response
        ? item.response
        : {
            name: item.name,
          }) as PartialFileAdminApiDto,
    };
  });
  const collab = isCollab.value ? form.collab : null;
  const group = form.group === "__new" ? form.newgroup : form.group;

  await fetchPatch(`/projects/${route.params.id}`, {
    ...form,
    group,
    collab,
    details,
  });
  navigateTo("/admin/projects");

  await refresh();
};

const handleDelete = async () => {
  try {
    await fetchDelete(`/projects/${entity.value?.id}`);
    await navigateTo("/admin/projects");
  } catch (exc) {
    console.error(exc);
  }
};

const groupOptions = computed(() => {
  const arr =
    projectGroups.value?.map((item) => ({
      value: item,
      label: item,
    })) ?? [];
  arr.push({
    value: "__new",
    label: "New group",
  });
  return arr;
});

onMounted(() => {
  form.group = groupOptions.value[0].value;
});
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
          <ElSelect v-model="form.group">
            <ElOption
              v-for="option in groupOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </ElSelect>
        </ElFormItem>

        <ElFormItem
          v-if="form.group === 'new'"
          label="New group"
          prop="newgroup"
        >
          <ElInput v-model="form.newgroup" :rows="5" type="text" />
        </ElFormItem>

        <ElFormItem label="Is collab" prop="is_collab">
          <ElCheckbox v-model="isCollab" />
        </ElFormItem>

        <AdminFormCollab v-if="isCollab" v-model="form.collab" />

        <ElFormItem required label="Project Images">
          <AdminUploadProjectImage
            :image-details="projectImages"
            :list="fileList"
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
