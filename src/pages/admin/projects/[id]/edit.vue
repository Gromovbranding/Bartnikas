<script lang="ts" setup>
import type { UploadUserFile } from "element-plus";

definePageMeta({
  validate(route) {
    return /^\d+$/.test(route.params.id as string);
  },
});

const { fetchGet } = useApi();
const route = useRoute();

const { data: entity } = useAsyncData(
  "entity",
  async () => await fetchGet(`/projects/${route.params.id}`)
);

const rules = reactive({
  title: [
    {
      required: true,
      message: "Please input Title",
      trigger: "change",
    },
  ],
  desc: [
    {
      required: true,
      message: "Please input Desc",
      trigger: "change",
    },
  ],
});

const fileList = ref<UploadUserFile[]>(entity.value?.project_images ?? []);

const form = reactive({
  title: entity.value?.title ?? "",
  desc: entity.value?.desc ?? "",
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

        <ElFormItem label="Description" prop="desc">
          <ElInput v-model="form.desc" :rows="5" type="textarea" />
        </ElFormItem>

        <!-- Project Images -->
        <ElFormItem required label="Project Images">
          <AdminUploadImage v-model="fileList" />
        </ElFormItem>

        <ElFormItem>
          <ElButton type="primary"> Save </ElButton>
          <ElButton>Delete</ElButton>
        </ElFormItem>
      </ElForm>
    </ClientOnly>
  </ElCard>
</template>
