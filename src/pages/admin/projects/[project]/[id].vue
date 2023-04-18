<script lang="ts" setup>
import type {
  FormInstance,
  FormRules,
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

const rules = reactive<FormRules>({
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
  <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
    <el-form-item class="input-container" label="Name" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item class="input-container" label="Image" prop="img">
      <!-- <el-input v-model="form.img" /> -->

      <el-upload
        v-model:file-list="form.files"
        :action="imageUploadUrl"
        list-type="picture-card"
        :limit="10"
        :on-exceed="handleExceed"
        :class="{ upload_disabled: form?.files?.length >= 10 }"
      >
        <el-icon><Icon name="ep:plus" /></el-icon>

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
                <el-icon><Icon name="ep:zoom-in" /></el-icon>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownloadImage(file)"
              >
                <el-icon><Icon name="ep:download" /></el-icon>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemoveImage(file)"
              >
                <el-icon><Icon name="ep:delete" /></el-icon>
              </span>
            </span>
          </div>
        </template>
        <template #tip>
          <div class="el-upload__tip text-red">
            limit 10 file, new file will cover the old file
          </div>
        </template>
      </el-upload>

      <client-only>
        <el-dialog
          v-model="dialogVisible"
          width="fit-content"
          :append-to-body="true"
        >
          <img :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </client-only>
    </el-form-item>
    <el-form-item>
      <div class="button-container">
        <div>
          <el-button type="primary" @click="submitValidate(formRef)">
            Save
          </el-button>
          <el-button @click="resetForm(formRef)">Reset</el-button>
        </div>
        <el-button type="info" plain @click="toBack">Back</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.input-container {
  :deep(.el-form-item__label) {
    font-weight: 700;
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
