<script setup lang="ts">
import { FormInstance, UploadUserFile } from "element-plus";
import { IAwards } from "~/types/admin-api";

interface IForm {
  value: string | boolean;
  label: string;
  type: "text" | "textarea" | "checkbox";
  prop: string;
}

interface ICreateFormFormatted {
  [x: string]: string | boolean;
}

interface ImageDetails {
  [key: number]: {
    year: number;
    groups: {
      type: "Gold" | "Silver";
      images: {
        name: string;
        url: string;
      }[];
    }[];
  };
}

const props = defineProps<{
  name: string;
  back: string;
  video?: boolean;
  cbCreate: (
    body: ICreateFormFormatted,
    avatar: UploadUserFile[],
    images: UploadUserFile[],
    details: ImageDetails
  ) => Promise<void>;
  form: IForm[];
  edit?: IAwards;
}>();

const emit = defineEmits<{
  (e: "reset"): void;
}>();

const formModel = ref<IForm[]>([]);
const filesModel = ref<UploadUserFile[]>([]);
const avatarModel = ref<UploadUserFile[]>([]);
const formRef = ref<FormInstance>();
const awardImages = ref<ImageDetails>({});

onMounted(() => {
  formModel.value = props.form;
  // if (!props.edit) return
  // avatarModel.value = [{
  //   name: props.edit.awards_avatar.name,
  //   uid: props.edit.awards_avatar.id
  // }]
  // filesModel.value = props.edit.degress.flatMap(item => {
  //   const gold = item.groups.filter(grp => grp.type === 'Gold')
  //   const silver = item.groups.filter(grp => grp.type === 'Silver')
  //   return [
  //     gold.flatMap(goldItem => goldItem.images.map(img => {
  //       awardImages.value[img.id] = {
  //         groups: 'Gold',
  //         year: item.year
  //       }
  //       return ({ uid: img.id, name: img.name })
  //     })),
  //     silver.flatMap(silverItem => silverItem.images.map(img => {
  //       awardImages.value[img.id] = {
  //         groups: 'Gold',
  //         year: item.year
  //       }
  //       return ({ uid: img.id, name: img.name })
  //     })),
  //   ].flatMap(item => item)
  // })
});

const create = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  // await formEl.validate(async (isValid) => {
  //   if (isValid) {
  const formattedFormModel: ICreateFormFormatted = {};

  formModel.value.forEach((item) => {
    formattedFormModel[item.prop] = item.value;
  });

  await props.cbCreate(
    formattedFormModel,
    avatarModel.value,
    filesModel.value,
    awardImages.value
  );
  //   }
  // });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  emit("reset");
  formEl.resetFields();
};

const handleUpload = (files: UploadUserFile[]) => {
  filesModel.value = files;
};

const handleAvatarUpload = (files: UploadUserFile[]) => {
  avatarModel.value = files;
};

const isDisabled = computed(() => {
  const filesReady =
    filesModel.value.every((item) => item.percentage === 100) &&
    filesModel.value.length > 0;
  const fieldsReady = props.form.every((item) => {
    if (!item.required) return true;
    return !!item.value;
  });
  return !(filesReady && fieldsReady);
});

const rules = computed(() => {
  const result = {};
  props.form.forEach((item) => {
    if (!item.required) return;
    result[item.prop] = { validator: () => {} };
  });
  return result;
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
      <ElForm
        ref="formRef"
        status-icon
        :model="formModel"
        label-width="120px"
        :rules="rules"
      >
        <ElFormItem
          v-for="item in formModel"
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :required="item.required"
        >
          <ElCheckbox
            v-if="item.type === 'checkbox'"
            v-model="item.value"
            size="large"
          />
          <ElInput v-else v-model="item.value" :rows="5" :type="item.type" />
        </ElFormItem>

        <ElFormItem required label="Award Avatar">
          <AdminUploadImage
            :list="avatarModel"
            single
            @uploadFile="handleAvatarUpload"
          />
        </ElFormItem>

        <ElFormItem required label="Images">
          <AdminUploadAwardImage
            :image-details="awardImages"
            :list="filesModel"
            @uploadFile="handleUpload"
          />
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
