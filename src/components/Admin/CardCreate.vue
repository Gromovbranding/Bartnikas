<script setup lang="ts">
import { FormInstance, UploadUserFile } from "element-plus";

interface IForm {
  value: string;
  label: string;
  type: string;
  prop: string;
}

const props = defineProps<{
  name: string;
  back: string;
  cbCreate: (body: any, images: UploadUserFile[]) => Promise<void>;
  form: IForm[];
}>();

// const rules = reactive<FormRules>({
//   title: [
//     {
//       required: true,
//       message: "Please input Title",
//       trigger: "change",
//     },
//   ],
//   desc: [
//     {
//       required: true,
//       message: "Please input Desc",
//       trigger: "change",
//     },
//   ],
//   text: [
//     {
//       required: true,
//       message: "Please input Text",
//       trigger: "change",
//     },
//   ],
//   is_hot: [
//     {
//       type: "boolean",
//       trigger: "change",
//     },
//   ],
// });

const formModel = ref<IForm[]>([]);
const filesModel = ref<UploadUserFile[]>([]);
const formRef = ref<FormInstance>();

onMounted(() => {
  formModel.value = props.form;
});

const create = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  await formEl.validate(async (isValid) => {
    if (isValid) {
      const formattedFormModel: { [x: string]: string } = {};

      formModel.value.forEach((item) => {
        formattedFormModel[item.prop] = item.value;
      });

      await props.cbCreate(formattedFormModel, filesModel.value);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const handleUpload = (files: UploadUserFile[]) => {
  filesModel.value = files;
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
      <ElForm ref="formRef" status-icon :model="formModel" label-width="120px">
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
          <AdminUploadImage :list="filesModel" @uploadFile="handleUpload" />
        </ElFormItem>

        <ElFormItem>
          <ElButton type="primary" @click="create(formRef)"> Create </ElButton>
          <ElButton @click="resetForm(formRef)">Clear</ElButton>
        </ElFormItem>
      </ElForm>
    </ClientOnly>
  </ElCard>
</template>
