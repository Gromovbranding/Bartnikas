<script lang="ts" setup>
import { UploadUserFile } from "element-plus";
import { Close, Delete } from "@element-plus/icons-vue";
import {
  IProject,
  IProjectPressRelease,
  PartialAdminApiDto,
} from "@/types/admin-api";
import { AdminTemplateForm, AdminUploadFile } from "#components";

definePageMeta({
  layout: "admin",
});

const { projects } = useAdmin();
const { titles, formRules, navigateBack, methods } = projects();

useHeadSafe({
  title: titles.create,
});

const formRef = ref<InstanceType<typeof AdminTemplateForm> | null>(null);
const uploadRef = ref<InstanceType<typeof AdminUploadFile> | null>(null);

const form = reactive<PartialAdminApiDto<IProject>>({
  title: "",
  description: "",
  collab: {
    collab_with: "",
    description: "",
    press_release: [],
    title: "",
    video: null,
  },
  details: [],
  group: null,
});

interface IPressRelease extends PartialAdminApiDto<IProjectPressRelease> {
  id: number;
}

interface ImageDetails {
  [key: number]: {
    sizes: {
      width: number;
      height: number;
      unit: "cm";
    }[];
    is_active: boolean;
    price: number;
    image_name: string;
    image: {
      name: string;
    };
  };
}

const formReleases = ref<IPressRelease[]>([]);
const imageFiles = ref<UploadUserFile[]>([]);

const projectImages = ref<ImageDetails>({});

const isCollab = ref(false);

const handleResetForm = () => {
  formRef.value?.resetForm();
};

const addPressRelease = () => {
  formReleases.value.push({
    title: "",
    text: "",
    file: null,
    id: Date.now(),
  });
};

const removePressRelease = (pressRelease: IPressRelease) => {
  formReleases.value = formReleases.value.filter(
    (item) => item.id !== pressRelease.id
  );
};

const handleCreate = async () => {
  if (await formRef.value?.validate()) {
    try {
      if (!isCollab.value) {
        form.collab = null;
      }
      const file = await uploadRef.value!.uploadToServer();
      if (Array.isArray(file)) {
        // file[0].name
      }

      await methods.handleCreate(toValue(form));

      await refreshNuxtData();

      await navigateTo(navigateBack.value);
    } catch (exc) {
      console.error(exc);
    }
  }
};

const onClickDelete = (e: Event) => {
  const btn = e.target as HTMLButtonElement;
  btn.dispatchEvent(
    new KeyboardEvent("keydown", { key: "backspace", bubbles: true })
  );
};

watch(
  () => imageFiles.value,
  (val) => {
    val.forEach((item) => {
      if (projectImages.value[item.uid]) return;
      projectImages.value[item.uid] = {
        sizes: [{ width: 100, height: 100, unit: "cm" }],
        is_active: true,
        price: 100,
        image_name: item.name,
        image: {
          name: item.name,
        },
      };
    });
  }
);
</script>

<template>
  <AdminTemplateCardWithForm
    :title="titles.create"
    :navigate-back="navigateBack"
  >
    <AdminTemplateForm ref="formRef" :model="form" :rules="formRules">
      <ElFormItem label="Title" prop="title">
        <ElInput v-model="form.title" />
      </ElFormItem>

      <ElFormItem label="Description" prop="description">
        <ElInput v-model="form.description" />
      </ElFormItem>

      <ElFormItem label="Group" prop="group">
        <ElInput v-model="form.group" />
      </ElFormItem>

      <ElFormItem label="Is Collab ?">
        <ElCheckbox v-model="isCollab" size="large" />
      </ElFormItem>

      <template v-if="isCollab">
        <ElFormItem>
          <h2>Collab</h2>
        </ElFormItem>

        <ElFormItem label="Collab with" prop="collab.collab_with">
          <ElInput v-model="form.collab.collab_with" />
        </ElFormItem>

        <ElFormItem label="Collab Titile" prop="collab.title">
          <ElInput v-model="form.collab.title" />
        </ElFormItem>

        <ElFormItem label="Collab Description" prop="collab.description">
          <ElInput v-model="form.collab.description" />
        </ElFormItem>

        <ElFormItem required label="Video" prop="video">
          <AdminUploadFile v-model="form.collab.video" file-type="video" />
        </ElFormItem>

        <ElFormItem>
          <h2>Press Releases</h2>
        </ElFormItem>
        <template
          v-for="(press_release, idx) in formReleases"
          :key="press_release.id"
        >
          <ElFormItem>
            <h2>Press release {{ idx }}</h2>
            <ElButton type="danger" @click="removePressRelease(press_release)">
              <ElIcon>
                <ElIconDelete />
              </ElIcon>
            </ElButton>
          </ElFormItem>

          <ElFormItem
            label="Title"
            :prop="`collab.press_realease.${idx}.title`"
            :rules="{
              required: true,
              message: 'Title is required',
              trigger: 'blur',
            }"
          >
            <ElInput v-model="press_release.title" />
          </ElFormItem>

          <ElFormItem
            label="Text"
            :prop="`collab.press_realease.${idx}.text`"
            :rules="{
              required: true,
              message: 'Text  is required',
              trigger: 'blur',
            }"
          >
            <ElInput v-model="press_release.text" />
          </ElFormItem>

          <ElFormItem
            :rules="{
              required: true,
              message: 'File is required',
              trigger: 'change',
            }"
            label="File"
            :prop="`collab.press_realease.${idx}.file`"
          >
            <AdminUploadFile v-model="press_release.file" file-type="files" />
          </ElFormItem>
        </template>

        <ElFormItem>
          <ElButton type="default" @click="addPressRelease">
            Add press release
          </ElButton>
        </ElFormItem>
      </template>

      <ElFormItem label="Project Images" prop="details">
        <AdminUploadFile ref="uploadRef" v-model="imageFiles" :single="false">
          <template #default="{ file }: { file: UploadUserFile }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
              @click="handlePictureCardPreview(file)"
            />
            <div v-if="projectImages[file.uid!]" class="img" @keydown.stop>
              <div class="img__details">
                <label
                  >Is active:
                  <input
                    v-model="projectImages[file.uid!].is_active"
                    type="checkbox"
                /></label>
                <ElFormItem required label="Name" label-width="60">
                  <ElInput
                    v-model="projectImages[file.uid!].image_name"
                    size="small"
                  />
                </ElFormItem>
                <ElFormItem required label="Price, $" label-width="70">
                  <el-input-number
                    v-model="projectImages[file.uid!].price"
                    :min="1"
                    size="small"
                  />
                </ElFormItem>
              </div>
              <h3>Sizes</h3>
              <div
                v-for="(item, idx) in projectImages[file.uid!].sizes"
                :key="idx"
                class="img__sizes"
              >
                <label
                  >Width, cm
                  <el-input-number v-model="item.width" :min="1" size="small"
                /></label>
                <label
                  >Height, cm
                  <el-input-number v-model="item.height" :min="1" size="small"
                /></label>
                <el-button
                  v-if="idx !== 0"
                  type="danger"
                  :icon="Delete"
                  circle
                  @click="projectImages[file.uid!].sizes.splice(idx, 1)"
                >
                </el-button>
              </div>
              <el-button
                type="primary"
                @click="
                  projectImages[file.uid!].sizes.push({
                    width: 100,
                    height: 100,
                    unit: 'cm',
                  })
                "
              >
                add
              </el-button>
            </div>
            <el-button
              type="danger"
              :icon="Close"
              circle
              @click="onClickDelete"
            ></el-button>
          </template>
        </AdminUploadFile>
      </ElFormItem>

      <ElFormItem>
        <ElButton type="primary" @click="handleCreate"> Create </ElButton>
        <ElButton @click="handleResetForm"> Clear </ElButton>
      </ElFormItem>
    </AdminTemplateForm>
  </AdminTemplateCardWithForm>
</template>

<style scoped lang="scss">
.img {
  flex-grow: 1;
  margin-left: 1rem;
  h3 {
    font-size: 1.5rem;
  }
  &__details {
    display: flex;
    gap: 1rem;
  }
  &__sizes {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  button {
    padding-inline: 0.5rem;
  }
}
</style>
