<script lang="ts" setup>
import type { UploadUserFile } from "element-plus";

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
  text: [
    {
      required: true,
      message: "Please input Text",
      trigger: "change",
    },
  ],
  is_hot: [
    {
      trigger: "change",
    },
  ],
});

const fileList = ref<UploadUserFile[]>([]);

const form = reactive({
  title: "",
  desc: "",
  text: "",
  is_hot: false,
});
</script>

<template>
  <ElCard>
    <template #header>
      <div class="card-header">
        <span> Article: "{{ form.title }}" </span>
        <ElButton type="default" plain @click="navigateTo('/admin/news')">
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

        <ElFormItem label="Text" prop="text">
          <ElInput v-model="form.text" :rows="5" type="textarea" />
        </ElFormItem>

        <ElFormItem label="Activity type">
          <ElCheckbox v-model="form.is_hot" label="Is Hot" size="large" />
        </ElFormItem>

        <!-- Project Images -->
        <ElFormItem required label="Images">
          <AdminUploadImage v-model="fileList" />
        </ElFormItem>

        <ElFormItem>
          <ElButton type="primary"> Save </ElButton>
          <ElButton>Clear</ElButton>
        </ElFormItem>
      </ElForm>
    </ClientOnly>
  </ElCard>
</template>
