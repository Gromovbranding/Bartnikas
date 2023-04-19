<script lang="ts" setup>
import type {
  FormInstance,
  UploadFile,
  UploadProps,
  UploadUserFile,
} from "element-plus";

const route = useRoute();
const projectId = route.params.project;
const imageId = route.params.id;
const isCreate = imageId === "create";
const { setPageName, accessToken, clearAccessToken } = useAdmin();
setPageName(`Project Image ${isCreate ? "Create" : "Edit"}`);
const config = useRuntimeConfig().public;

const formRef = ref<FormInstance>();
const form = reactive({
  name: "",
  files: [] as UploadUserFile[],
});

const imgIds = computed(() => {
  return form.files.map((i: any) => (i.response ? i.response?.id : i.id));
});

if (!isCreate) {
  const { data } = await useFetch(
    `${config.apiBaseUrl}/projects/${projectId}/image/${imageId}`
  );
  Object.assign(form, data.value);
}

const rules = reactive({
  name: [
    {
      required: true,
      message: "Please input Title",
      trigger: "change",
    },
  ],
});

const toBack = async () => {
  await navigateTo(`/admin/projects/${projectId}`);
};

const submitSave = async (form: object) => {
  await $fetch(`${config.apiBaseUrl}/projects/${projectId}/image`, {
    method: "POST",
    body: { ...form, files: imgIds.value },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const submitEdit = async (id: number, form: object) => {
  await $fetch(`${config.apiBaseUrl}/projects/${projectId}/image/${id}`, {
    method: "PATCH",
    body: { ...form, files: imgIds.value },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const submitForm = async (valid) => {
  if (valid) {
    if (!imgIds.value?.length) {
      ElNotification.error({
        title: "Error",
        message: "Please upload image",
        position: "bottom-right",
      });
      return;
    }

    try {
      isCreate ? await submitSave(form) : await submitEdit(imageId, form);
      toBack();
      ElNotification.success({
        title: "Success",
        position: "bottom-right",
      });
    } catch (e) {
      ElNotification.error({
        title: "Error",
        message: e,
        position: "bottom-right",
      });
      if (e.status === 401) {
        clearAccessToken();
        await navigateTo("/admin/login");
      }
    }
  } else {
    ElNotification.error({
      title: "Error",
      message: "Please fill in the fields",
      position: "bottom-right",
    });
  }
};

const submitValidate = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(submitForm);
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// Upload Image
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);

const handleRemoveImage = async (file: UploadFile) => {
  if (isCreate && file.response?.id) {
    form.files = form.files.filter(
      (img: any) => img.response?.id !== file.response.id
    );
    return;
  }

  try {
    const { data } = await useFetch(
      `${config.apiBaseUrl}/projects/${imageId}/image-remove/${file?.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    Object.assign(form, data.value);
  } catch (e) {
    ElNotification.error({
      title: "Error",
      message: e,
      position: "bottom-right",
    });
    if (e.status === 401) {
      clearAccessToken();
      await navigateTo("/admin/login");
    }
  }
};

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};

const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 10, you selected ${files?.length} files this time, add up to
    ${files?.length + uploadFiles?.length} totally`
  );
};

const imageToDataURL = async (url) => {
  const blob = await fetch(url).then((res: any) => res.blob());
  return URL.createObjectURL(blob);
};

const handleDownloadImage = async (file: UploadFile) => {
  const link = document.createElement("a");
  link.download = name;
  link.href = await imageToDataURL(file.url);
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const imageUploadUrl = `${config.apiBaseUrl}/files/image`;
</script>

<template>
  <ElForm ref="formRef" :model="form" :rules="rules" label-width="120px">
    <ElFormItem class="input-container" label="Name" prop="name">
      <ElInput v-model="form.name" />
    </ElFormItem>

    <ElFormItem class="input-container" label="Image" prop="img">
      <ElUpload
        v-model:fileList="form.files"
        :action="imageUploadUrl"
        list-type="picture-card"
        :limit="10"
        :on-exceed="handleExceed"
        :class="{ upload_disabled: form?.files?.length >= 10 }"
      >
        <ElIcon><Icon name="ep:plus" /></ElIcon>

        <template #file="{ file }">
          <div>
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <ElIcon><Icon name="ep:zoom-in" /></ElIcon>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownloadImage(file)"
              >
                <ElIcon><Icon name="ep:download" /></ElIcon>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemoveImage(file)"
              >
                <ElIcon><Icon name="ep:delete" /></ElIcon>
              </span>
            </span>
          </div>
        </template>
        <template #tip>
          <div class="el-upload__tip text-red">
            limit 10 file, new file will cover the old file
          </div>
        </template>
      </ElUpload>

      <ClientOnly>
        <ElDialog
          v-model="dialogVisible"
          width="fit-content"
          :append-to-body="true"
        >
          <img :src="dialogImageUrl" alt="Preview Image" />
        </ElDialog>
      </ClientOnly>
    </ElFormItem>

    <ElFormItem>
      <div class="button-container">
        <div>
          <ElButton type="primary" @click="submitValidate(formRef)">
            Save
          </ElButton>
          <ElButton @click="resetForm(formRef)">Reset</ElButton>
        </div>
        <ElButton type="info" plain @click="toBack">Back</ElButton>
      </div>
    </ElFormItem>
  </ElForm>
</template>

<style lang="scss" scoped>
.input-container {
  :deep(.el-form-item__label) {
    font-weight: 500;
  }
}
.button-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.upload_disabled {
  :deep(.el-upload--picture-card) {
    display: none;
  }
}
</style>
