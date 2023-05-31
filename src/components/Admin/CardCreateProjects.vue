<script setup lang="ts">
import { FormInstance, UploadUserFile } from "element-plus";

interface IForm {
  value: string | boolean;
  label: string;
  type: "text" | "textarea" | "checkbox" | "select";
  prop: string;
  options?: {
    label: string;
    value: string | number;
  }[];
}

interface ICreateFormFormatted {
  [x: string]: string | boolean;
}

interface ImageDetails {
  [key: number]: {
    image_name: string;
    price: number;
    sizes: {
      width: number;
      height: number;
      unit: "cm";
    }[];
  };
}

const collab = ref({
  collab_with: "",
  description: "",
  title: "",
  press_release: [
    {
      title: "",
      text: "",
      file: {
        name: "",
      },
    },
  ],
  video: {
    name: "",
  },
});

const props = defineProps<{
  name: string;
  back: string;
  video?: boolean;
  cbCreate: (
    body: ICreateFormFormatted,
    images: UploadUserFile[],
    details: ImageDetails,
    clb: typeof collab.value
  ) => Promise<void>;
  form: IForm[];
}>();

const formModel = ref<IForm[]>([]);
const filesModel = ref<UploadUserFile[]>([]);
const formRef = ref<FormInstance>();
const projectImages = ref<ImageDetails>({});

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

      await props.cbCreate(
        formattedFormModel,
        filesModel.value,
        projectImages.value,
        collab.value
      );
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

const isCollab = computed(() => {
  return !!props.form.find((item) => item.prop === "is_collab" && item.value);
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
          <ElSelect v-else-if="item.type === 'select'" v-model="item.value">
            <ElOption
              v-for="option in item.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </ElSelect>
          <ElInput v-else v-model="item.value" :rows="5" :type="item.type" />
        </ElFormItem>

        <AdminFormCollab v-if="isCollab" v-model="collab" />

        <ElFormItem required label="Project images">
          <AdminUploadProjectImage
            :image-details="projectImages"
            :list="filesModel"
            @uploadFile="handleUpload"
          />
        </ElFormItem>

        <ElFormItem>
          <ElButton
            type="primary"
            :disabled="!filesModel.length"
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
