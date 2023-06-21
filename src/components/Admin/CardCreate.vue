<script setup lang="ts">
import { FormInstance, UploadUserFile } from "element-plus";

interface IForm {
  value: string | boolean;
  label: string;
  type: "text" | "textarea" | "checkbox" | "select";
  prop: string;
  options?: {
    value: string | number;
    label: string;
  }[];
}

interface ICreateFormFormatted {
  [x: string]: string | boolean;
}

const props = defineProps<{
  name: string;
  back?: string;
  video?: boolean;
  cbCreate: (
    body: ICreateFormFormatted,
    images: UploadUserFile[]
  ) => Promise<void>;
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
      const formattedFormModel: ICreateFormFormatted = {};

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

const isDisabled = computed(() => {
  if (props.video) return false;
  const filesReady = filesModel.value.every((item) => item.percentage === 100);
  return !(filesReady && filesModel.value.length > 0);
});
</script>

<template>
  <ElCard>
    <template #header>
      <div class="card-header">
        <span style="text-transform: capitalize"> {{ name }} </span>
        <ElButton
          v-if="back"
          type="default"
          plain
          @click="navigateTo(`/admin/${back}`)"
        >
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
          <ElSelect
            v-else-if="item.type === 'select'"
            v-model="item.value"
            clearable
            placeholder="Select"
          >
            <ElOption
              v-for="option in item.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </ElSelect>
          <ElInput v-else v-model="item.value" :rows="5" :type="item.type" />
        </ElFormItem>

        <ElFormItem v-if="video" label="Video">
          <AdminUploadVideo :list="filesModel" @uploadFile="handleUpload" />
        </ElFormItem>
        <ElFormItem v-else required label="Images">
          <AdminUploadImage :list="filesModel" @uploadFile="handleUpload" />
        </ElFormItem>

        <ElFormItem>
          <ElButton
            type="primary"
            :disabled="isDisabled"
            @click="create(formRef)"
          >
            Create
          </ElButton>
          <ElButton @click="resetForm(formRef)">Clear</ElButton>
        </ElFormItem>
      </ElForm>
    </ClientOnly>
  </ElCard>
</template>
