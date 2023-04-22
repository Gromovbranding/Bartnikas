<script setup lang="ts">
import { FormInstance, FormRules, UploadUserFile } from "element-plus";

const props = defineProps<{
  name: string;
  back: string;
  cbCreate: (body: any, images: UploadUserFile[]) => Promise<void>;
  form: {
    [x: string]: {
      value: string | boolean | number;
      label: string;
      type: string;
    };
  };
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

const formModel = reactive(props.form);
const filesModel = reactive<UploadUserFile[]>([]);
const formRef = ref<FormInstance>();

const create = async () => {
  const isValid = formRef.value?.validate();
  if (isValid) {
    const formattedFormModel: typeof formModel = {};

    Object.keys(formModel).forEach((prop) => {
      formattedFormModel[prop] = formModel[prop].value;
    });

    await props.cbCreate(formattedFormModel, filesModel);
  }
};
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
      <ElForm
        ref="formRef"
        :model="formModel"
        :rules="rules"
        label-width="120px"
      >
        <ElFormItem
          v-for="(item, prop) in formModel"
          :key="prop"
          :label="item.label"
          :prop="prop"
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
          <ElButton type="primary" @click="create"> Create </ElButton>
          <ElButton>Clear</ElButton>
        </ElFormItem>
      </ElForm>
    </ClientOnly>
  </ElCard>
</template>
