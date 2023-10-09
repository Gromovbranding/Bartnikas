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
const uploadProjectImagesRef = ref<InstanceType<typeof AdminUploadFile> | null>(
  null
);

const uploadCollabVideoRef = ref<InstanceType<typeof AdminUploadFile> | null>(
  null
);

const uploadPressReleaseRefs = ref<
  InstanceType<typeof AdminUploadFile>[] | null
>([]);

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

interface ImageDetails {
  [key: number]: {
    sizes: {
      width: number;
      height: number;
      unit: "cm";
      quantity: number;
    }[];
    is_active: boolean;
    price: number;
    image_name: string;
    image: {
      name: string;
    };
  };
}

const imageFiles = ref<UploadUserFile[]>([]);
const isUploading = ref(false);

const projectImages = ref<ImageDetails>({});

const isCollab = ref(false);

const handleResetForm = () => {
  formRef.value?.resetForm();
};

const addPressRelease = () => {
  if (!form?.collab?.press_release) {
    form.collab.press_release = [];
  }

  form.collab.press_release.push({
    title: "",
    text: "",
    file: null,
    id: Date.now(),
  });
};

const removePressRelease = (
  pressRelease: PartialAdminApiDto<IProjectPressRelease>
) => {
  form.collab.press_release = form.collab.press_release.filter(
    (item) => item.id !== pressRelease.id
  );
};

const imagesToDetails = (imgs: { uid: number; name: string }[]) => {
  form.details = imgs.map((item) => {
    const deets = projectImages.value[item.uid];
    deets.image = {
      name: item.name,
    };
    return deets;
  });
};

const handleCreate = async () => {
  if (await formRef.value?.validate()) {
    try {
      const arr = [];
      isUploading.value = true;

      for await (const file of imageFiles.value) {
        arr.push(await uploadProjectImagesRef.value!.uploadToServer(file));
      }

      imagesToDetails(arr);

      await methods.handleCreate({
        ...toValue(form),
        collab: !isCollab.value
          ? null
          : {
              ...form.collab,
              press_release: await Promise.all(
                (form.collab?.press_release ?? []).map(async (item, idx) => {
                  const file = await uploadPressReleaseRefs.value[
                    idx
                  ]!.uploadToServer();

                  return {
                    ...item,
                    file,
                  };
                })
              ),
              video: await uploadCollabVideoRef.value!.uploadToServer(),
            },
      });

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
        sizes: [{ width: 100, height: 100, unit: "cm", quantity: 1 }],
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
        <AdminEditorInput v-model="form.description" />
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
          <AdminEditorInput v-model="form.collab.description" />
        </ElFormItem>

        <ElFormItem required label="Video" prop="collab.video">
          <AdminUploadFile
            ref="uploadCollabVideoRef"
            v-model="form.collab.video"
            file-type="video"
          />
        </ElFormItem>

        <ElFormItem>
          <h2>Press Releases</h2>
        </ElFormItem>
        <template
          v-for="(press_release, idx) in form.collab.press_release"
          :key="press_release.id"
        >
          <ElFormItem>
            <h2>Press release {{ idx + 1 }}</h2>
            <ElButton type="danger" @click="removePressRelease(press_release)">
              <ElIcon>
                <ElIconDelete />
              </ElIcon>
            </ElButton>
          </ElFormItem>

          <ElFormItem
            label="Title"
            :prop="`collab.press_release.${idx}.title`"
            :rules="{
              required: true,
              message: 'Field is required',
              trigger: 'blur',
            }"
          >
            <ElInput v-model="press_release.title" />
          </ElFormItem>

          <ElFormItem
            label="Text"
            :prop="`collab.press_release.${idx}.text`"
            :rules="{
              required: true,
              message: 'Field  is required',
              trigger: 'blur',
            }"
          >
            <AdminEditorInput v-model="press_release.text" />
          </ElFormItem>

          <ElFormItem
            :rules="{
              required: true,
              message: 'File is required',
              trigger: 'change',
            }"
            label="File"
            :prop="`collab.press_release.${idx}.file`"
          >
            <AdminUploadFile
              ref="uploadPressReleaseRefs"
              v-model="press_release.file"
              file-type="files"
            />
          </ElFormItem>
        </template>

        <ElFormItem>
          <ElButton type="default" @click="addPressRelease">
            Add press release
          </ElButton>
        </ElFormItem>
      </template>

      <ElFormItem label="Project Images" prop="details">
        <AdminUploadFile
          ref="uploadProjectImagesRef"
          v-model="imageFiles"
          :single="false"
        >
          <template #default="{ file }: { file: UploadUserFile }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
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
                <ElFormItem required label="Price, €" label-width="70">
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
                <label
                  >Quantity
                  <el-input-number
                    v-model="item.quantity"
                    :min="0"
                    size="small"
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
                    quantity: 1,
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
        <ElButton type="primary" :loading="isUploading" @click="handleCreate">
          Create
        </ElButton>
        <ElButton :loading="isUploading" @click="handleResetForm">
          Clear
        </ElButton>
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
