<script setup lang="ts">
import { UploadUserFile } from "element-plus";

const { fetchPost } = useApi();

const props = defineProps<{
  refresh: Function;
}>();

const formRef = ref<HTMLFormElement | null>(null);
const lists = reactive({
  files: [] as any[],
  images: [] as any[],
});

const isDisabled = computed(
  () => !(!!lists.files.length && !!lists.images.length)
);

const form = reactive([
  {
    value: "",
    label: "Title",
    type: "text",
    prop: "title",
  },
]);

const handleCreate = async () => {
  await fetchPost("/media/presentation", {
    title: form[0].value,
    image: {
      name: lists.images[0].name,
    },
    pdf: {
      name: lists.files[0].name,
    },
  });
  if (formRef.value) formRef.value.reset();
  props.refresh();
  lists.images = [];
  lists.files = [];
};

// {
//   "title": "string",
//   "pdf": {
//     "name": "string"
//   },
//   "image": {
//     "name": "string"
//   }
// }

const handleUpload = (files: UploadUserFile[], field: string) => {
  lists[field] = files;
};
</script>

<template>
  <ElForm ref="formRef" :model="form" status-icon label-width="120px">
    <h1>Presentation</h1>
    <ElFormItem
      v-for="item in form"
      :key="item.prop"
      :label="item.label"
      :prop="item.prop"
    >
      <ElInput v-model="item.value" :rows="5" :type="item.type" />
    </ElFormItem>
    <ElFormItem required label="File">
      <AdminUploadFile
        filetype="pdf"
        :list="lists.files"
        @uploadFile="handleUpload($event, 'files')"
      />
    </ElFormItem>
    <ElFormItem required label="Image">
      <AdminUploadImage
        :list="lists.images"
        single
        @uploadFile="handleUpload($event, 'images')"
      />
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" :disabled="isDisabled" @click="handleCreate">
        Create
      </ElButton>
    </ElFormItem>
  </ElForm>
</template>
