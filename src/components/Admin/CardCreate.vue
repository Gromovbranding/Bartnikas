<script setup lang="ts">
import { FormRules, UploadUserFile } from "element-plus";

const props = defineProps<{
  name: string;
  back: string;
  form: {
    value: string | boolean | number;
    prop: string;
    label: string;
    type: string;
  }[];
}>();

const rules = reactive<FormRules>({
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
      type: "boolean",
      trigger: "change",
    },
  ],
});

const formModel = reactive({});
const filesModel = reactive<UploadUserFile[]>([]);

onBeforeMount(() => {
  props.form.forEach((item) => {
    formModel[item.prop] = item;
  });
});
</script>

<template>
  <ElCard>
    <template #header>
      <div class="card-header">
        <span style="text-transform: capitalize"> {{ name }} </span>
        <ElButton type="default" plain @click="navigateTo(`/admin/${back}`)">
          Back
        </ElButton>
      </div>
    </template>

    <ClientOnly>
      <ElForm :model="formModel" :rules="rules" label-width="120px">
        <ElFormItem
          v-for="item in formModel"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
        >
          <ElCheckbox
            v-if="item.type === 'checkbox'"
            v-model="item.value"
            size="large"
          />
          <ElInput v-else v-model="item.value" :rows="5" :type="item.type" />
        </ElFormItem>

        <ElFormItem required label="Images">
          <AdminUploadImage v-model="filesModel" />
        </ElFormItem>

        <ElFormItem>
          <ElButton type="primary"> Create </ElButton>
          <ElButton>Clear</ElButton>
        </ElFormItem>
      </ElForm>
    </ClientOnly>
  </ElCard>
</template>
