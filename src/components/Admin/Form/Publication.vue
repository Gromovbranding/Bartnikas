<script setup lang="ts">
const { fetchPost } = useApi();

const props = defineProps<{
  refresh: Function;
}>();

const images = ref<any[]>([]);

const form = reactive([
  {
    value: "",
    label: "Program",
    type: "text",
    prop: "program",
    required: true,
  },
  {
    value: "",
    label: "Subtitle",
    type: "text",
    prop: "subtitle",
    required: true,
  },
  {
    value: "",
    label: "URL",
    type: "text",
    prop: "url",
    required: true,
  },
]);

const isDisabled = computed(() => {
  const filesReady =
    images.value.every((item) => item.percentage === 100) &&
    images.value.length > 0;
  const fieldsReady = form.every((item) => {
    if (!item.required) return true;
    return !!item.value;
  });
  return !(filesReady && fieldsReady);
});

const rules = computed(() => {
  const result = {};
  form.forEach((item) => {
    if (!item.required) return;
    result[item.prop] = { validator: () => {} };
  });
  return result;
});

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
</script>

<template>
  <ElForm
    ref="formRef"
    :model="form"
    status-icon
    label-width="120px"
    :rules="rules"
  >
    <h1>Publication</h1>
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
      <AdminUploadFile v-model="images" />
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" :disabled="isDisabled" @click="handleCreate">
        Create
      </ElButton>
    </ElFormItem>
  </ElForm>
</template>
