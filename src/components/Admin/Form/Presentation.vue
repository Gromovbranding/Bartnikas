<script setup lang="ts">
const { fetchPost } = useApi();

const props = defineProps<{
  refresh: Function;
}>();

const formRef = ref<HTMLFormElement | null>(null);
const lists = reactive({
  files: [] as any[],
  images: [] as any[],
});

const form = reactive([
  {
    value: "",
    label: "Title",
    type: "text",
    prop: "title",
    required: true,
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
    <h1>Presentation</h1>
    <ElFormItem
      v-for="item in form"
      :key="item.prop"
      :label="item.label"
      :prop="item.prop"
      :required="item.required"
    >
      <ElInput v-model="item.value" :rows="5" :type="item.type" />
    </ElFormItem>
    <ElFormItem required label="File">
      <AdminUploadFile v-model="lists.files" file-type="files" />
    </ElFormItem>
    <ElFormItem required label="Image">
      <AdminUploadFile v-model="lists.images" file-type="image" />
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" @click="handleCreate"> Create </ElButton>
    </ElFormItem>
  </ElForm>
</template>
