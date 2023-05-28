<script setup lang="ts">
import { UploadUserFile } from "element-plus";

const { fetchPost } = useApi();

const props = defineProps<{
  refresh: Function;
}>();

const images = ref<any[]>([]);
const isDisabled = computed(() => !images.value.length);

const form = reactive([
  {
    value: "",
    label: "Program",
    type: "text",
    prop: "program",
  },
  {
    value: "",
    label: "Subtitle",
    type: "text",
    prop: "subtitle",
  },
  {
    value: "",
    label: "URL",
    type: "text",
    prop: "url",
  },
]);

const handleCreate = async () => {
  await fetchPost("/media/publication", {
    program: form[0].value,
    subtitle: form[1].value,
    url: form[2].value,
    image: {
      name: images.value[0].name,
    },
  });
  props.refresh();
  images.value = [];
};

const handleUpload = (files: UploadUserFile[]) => {
  images.value = files;
};
</script>

<template>
  <ElForm ref="formRef" :model="form" status-icon label-width="120px">
    <h1>Publication</h1>
    <ElFormItem
      v-for="item in form"
      :key="item.prop"
      :label="item.label"
      :prop="item.prop"
    >
      <ElInput v-model="item.value" :rows="5" :type="item.type" />
    </ElFormItem>
    <ElFormItem required label="Image">
      <AdminUploadImage :list="images" single @uploadFile="handleUpload" />
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" :disabled="isDisabled" @click="handleCreate">
        Create
      </ElButton>
    </ElFormItem>
  </ElForm>
</template>
