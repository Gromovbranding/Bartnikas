<script lang="ts" setup>
import type { UploadUserFile } from "element-plus";
import { Close, Delete } from "@element-plus/icons-vue";
import draggable from "vuedraggable";
import {
  ListUnitSize,
  type IProject,
  type IProjectImageDetail,
  type IProjectPressRelease,
  type PartialAdminApiDto,
  type PartialFileAdminApiDto,
  type IProjectCollabTranslate,
  type IProjectTranslate,
  type IProjectPressReleaseTranslate,
} from "@/types/admin-api";
import { AdminTemplateForm, AdminUploadFile } from "#components";

definePageMeta({
  layout: "admin",
  validate(route) {
    return /^\d+$/.test(route.params.id as string);
  },
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

const route = useRoute();
const id = Number(route.params.id);
const imageFiles = ref<UploadUserFile[]>([]);

const projectImages = ref<
  PartialAdminApiDto<(IProjectImageDetail & { uid?: number })[]>
>([]);

const { projects, currentIndexLocale, initTranslateLocale } = useAdmin();
const { formRules, navigateBack, titles, methods } = projects();

const model = await methods.handleGetModel(id);

useHeadSafe({
  title: titles.edit,
});

const form = reactive<IProject>({
  ...model,
  collab: {
    translate: initTranslateLocale<IProjectCollabTranslate>(
      model.collab?.translate ?? { collab_with: "", description: "", title: "" }
    ),
    ...(model.collab ?? {}),
  },
  translate: initTranslateLocale<IProjectTranslate>(model.translate),
});

const isCollab = ref(!!toValue(model.collab));

const addPressRelease = () => {
  if (!form?.collab?.press_release) {
    form.collab.press_release = [];
  }

  form.collab.press_release.push({
    translate: initTranslateLocale<IProjectPressReleaseTranslate>({
      text: "",
      title: "",
    }),
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

const handleDelete = async () => {
  await methods.handleDelete(id);
  await navigateTo(navigateBack.value);
};
const handleUpdate = async () => {
  if (await formRef.value?.validate()) {
    try {
      projectImages.value = projectImages.value.map((item, idx) => ({
        ...item,
        order: idx + 1,
      }));

      const arr: {
        file: PartialFileAdminApiDto;
        uid?: number;
      }[] = [];

      for await (const file of imageFiles.value) {
        const uploadedFile = await uploadProjectImagesRef.value!.uploadToServer(
          file
        );
        arr.push({
          file: uploadedFile,
          uid: file.uid,
        });
      }

      projectImages.value = projectImages.value.map((item) => {
        const uploadedFile = arr.find(
          (uploadedFile) => uploadedFile.uid === item?.uid
        );

        if (uploadedFile) {
          return {
            ...item,
            image: {
              name: uploadedFile.file.name,
            },
          };
        }

        return item;
      });

      await methods.handlePatch(id, {
        ...toValue(form),
        details: toValue(projectImages.value),
        collab: !isCollab.value
          ? null
          : {
              ...form.collab,
              press_release: await Promise.all(
                (form.collab?.press_release ?? []).map(async (item, idx) => {
                  const file = await uploadPressReleaseRefs.value![
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
    } catch (exc) {
      console.error(exc);
    }
  }
};

const handleProjectDetailDelete = (
  item: PartialAdminApiDto<IProjectImageDetail & { uid?: number }>
) => {
  projectImages.value = projectImages.value.filter(
    (projectItem) => projectItem.uid !== item?.uid
  );

  imageFiles.value = imageFiles.value.filter((s) => s.uid !== item?.uid);
};

onMounted(() => {
  projectImages.value = form.details
    .toSorted((a, b) => a.order - b.order)
    .map((item) => ({
      ...item,
      uid: item.id,
    }));
});

watch(
  () => imageFiles.value,
  (val) => {
    val.forEach((item) => {
      const foundProject = projectImages.value.find(
        (projectItem) => projectItem?.uid === item?.uid
      );
      if (!foundProject) {
        projectImages.value.unshift({
          uid: item.uid,
          is_show_poster: false,
          order: imageFiles.value.length,
          sizes: [
            { width: 100, height: 100, unit: ListUnitSize.cm, quantity: 1 },
          ],
          is_active: true,
          price: 100,
          image_name: item.name,
          url: item.url,
          image: {
            name: item.name,
          },
        });
      }
    });
  }
);
</script>

<template>
  <AdminTemplateCardWithForm :title="titles.edit" :navigate-back="navigateBack">
    <AdminTemplateForm ref="formRef" :model="form" :rules="formRules">
      <ElFormItem label="Title" prop="title">
        <ElInput v-model="form.translate[currentIndexLocale].title" />
      </ElFormItem>

      <ElFormItem label="Description" prop="description">
        <AdminEditorInput
          v-model="form.translate[currentIndexLocale].description"
        />
      </ElFormItem>

      <ElFormItem label="Group" prop="group">
        <ElInput v-model="form.group" />
      </ElFormItem>

      <ElFormItem label="Is Collab ?">
        <ElCheckbox v-model="isCollab" size="large" />
      </ElFormItem>

      <ElFormItem label="Is show on page?">
        <ElCheckbox v-model="form.is_show_index_footer_card" size="large" />
      </ElFormItem>

      <template v-if="isCollab">
        <ElFormItem>
          <h2>Collab</h2>
        </ElFormItem>

        <ElFormItem label="Collab with" prop="collab.collab_with">
          <ElInput
            v-model="form.collab.translate[currentIndexLocale].collab_with"
          />
        </ElFormItem>

        <ElFormItem label="Collab Titile" prop="collab.title">
          <ElInput v-model="form.collab.translate[currentIndexLocale].title" />
        </ElFormItem>

        <ElFormItem label="Collab Description" prop="collab.description">
          <AdminEditorInput
            v-model="form.collab.translate[currentIndexLocale].description"
          />
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
            <ElInput
              v-model="press_release.translate[currentIndexLocale].title"
            />
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
            <AdminEditorInput
              v-model="press_release.translate[currentIndexLocale].text"
            />
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
          :is-show-files="false"
          multiple
          :single="false"
        />
      </ElFormItem>
      <ElFormItem>
        <div class="el-upload-list el-upload-list--picture" style="width: 100%">
          <draggable v-model="projectImages" item-key="order">
            <template #item="{ element: file }">
              <div class="el-upload-list__item">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file?.url || useGetFileByUrl(file?.image?.name)"
                  alt=""
                />
                <div v-if="file?.uid" class="img" @keydown.stop>
                  <div class="img__details">
                    <label>
                      Is active:
                      <input v-model="file.is_active" type="checkbox" />
                    </label>
                    <label>
                      Is Show poster:
                      <input v-model="file.is_show_poster" type="checkbox" />
                    </label>
                    <ElFormItem required label="Name" label-width="60">
                      <ElInput v-model="file.image_name" size="small" />
                    </ElFormItem>
                    <ElFormItem required label="Price, €" label-width="70">
                      <el-input-number
                        v-model="file.price"
                        :min="1"
                        size="small"
                      />
                    </ElFormItem>
                  </div>
                  <h3>Sizes</h3>
                  <div
                    v-for="(item, idx) in file.sizes"
                    :key="idx"
                    class="img__sizes"
                  >
                    <label
                      >Width, cm
                      <el-input-number
                        v-model="item.width"
                        :min="1"
                        size="small"
                    /></label>
                    <label
                      >Height, cm
                      <el-input-number
                        v-model="item.height"
                        :min="1"
                        size="small"
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
                      @click="file.sizes.splice(idx, 1)"
                    >
                    </el-button>
                  </div>
                  <el-button
                    type="primary"
                    @click="
                      file.sizes.push({
                        width: 100,
                        height: 100,
                        unit: ListUnitSize.cm,
                        quantity: 1,
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
                  @click="handleProjectDetailDelete(file)"
                ></el-button>
              </div>
            </template>
          </draggable>
        </div>
      </ElFormItem>

      <ElFormItem class="ajwodfhwoeif">
        <ElButton type="primary" @click="handleUpdate"> Update </ElButton>
        <ElButton type="danger" @click="handleDelete"> Delete </ElButton>
      </ElFormItem>
    </AdminTemplateForm>
  </AdminTemplateCardWithForm>
</template>

<style scoped lang="scss">
.ajwodfhwoeif {
  position: fixed;
  bottom: 0;
  width: 100%;
}
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
