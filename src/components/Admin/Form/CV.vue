<script setup lang="ts">
const { fetchPost } = useApi();

const props = defineProps<{
  refresh: Function;
}>();

const images = ref<any[]>([]);
const isDisabled = computed(() => !images.value.length);

const handleCreate = async () => {
  await fetchPost("/media/cv", {
    images: images.value,
  });
  props.refresh();
  images.value = [];
};
</script>

<template>
  <ElForm ref="formRef" status-icon label-width="120px">
    <h1>CV</h1>
    <ElFormItem required label="Images">
      <AdminUploadFile v-model="images" :single="false" />
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" :disabled="isDisabled" @click="handleCreate">
        Create
      </ElButton>
    </ElFormItem>
  </ElForm>
</template>
