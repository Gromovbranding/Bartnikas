<script setup lang="ts">
import { UploadUserFile } from "element-plus";

const { fetchPost } = useApi();

const props = defineProps<{
  refresh: Function;
}>();

const images = ref<any[]>([]);

const form = reactive([
  {
    value: "",
    label: "Awards",
    type: "text",
    prop: "awards",
    required: true,
  },
  {
    value: "",
    label: "Title",
    type: "text",
    prop: "title",
    required: true,
  },
]);

const isDisabled = computed(() => {
  const filesReady = images.value.length > 0;
  const fieldsReady = form.every((item) => {
    if (!item.required) return true;
    return !!item.value;
  });
  return !(filesReady && fieldsReady);
});

const handleCreate = async () => {
  await fetchPost("/media/exhibition", {
    awards: form[0].value,
    title: form[1].value,
    image: {
      name: images.value[0].name,
    },
  });
  props.refresh();
  images.value = [];
};

// {
//   "awards": "string",
//   "title": "string",
//   "image": {
//     "name": "string"
//   }
// }

const handleUpload = (files: UploadUserFile[]) => {
  images.value = files;
};

const rules = computed(() => {
  const result = {};
  form.forEach((item) => {
    if (!item.required) return;
    result[item.prop] = { validator: () => {} };
  });
  return result;
});
</script>

<template>
  <ElForm
    ref="formRef"
    :model="form"
    status-icon
    label-width="120px"
    :rules="rules"
  >
    <h1>Exhibition</h1>
    <ElFormItem
      v-for="item in form"
      :key="item.prop"
      :label="item.label"
      :prop="item.prop"
      :required="item.required"
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
