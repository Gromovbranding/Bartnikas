<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus";

definePageMeta({
  layout: "admin",
});

const route = useRoute();
const entityId = ref(route.params.id);
const isCreate = computed(() => entityId.value === "create");

const { setPageName, accessToken, clearAccessToken } = useAdmin();

setPageName(`Project ${isCreate.value ? "Create" : "Edit"}`);
const config = useRuntimeConfig().public;

const formRef = ref<FormInstance>();
const form = reactive({
  title: "",
  desc: "",
  project_images: [],
  // images: [] as UploadUserFile[],
});

// const imgIds = computed(() => {
//   return form.images.map((i: any) => (i.response ? i.response?.id : i.id));
// });

const fetch = async () => {
  if (!isCreate.value) {
    const { data } = await useFetch(
      `${config.apiBaseUrl}/projects/${entityId.value}`
    );
    Object.assign(form, data.value);
  }
};
fetch();

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
});

const toBack = async () => {
  await navigateTo("/admin/projects");
};

const submitSave = async (form: object) => {
  const data = await $fetch(`${config.apiBaseUrl}/projects`, {
    method: "POST",
    body: { ...form },
    // body: { ...form, images: imgIds.value },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  entityId.value = data.id;
};

const submitEdit = async (id: number, form: object) => {
  const data = await $fetch(`${config.apiBaseUrl}/projects/${id}`, {
    method: "PATCH",
    body: { ...form },
    // body: { ...form, images: imgIds.value },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  entityId.value = data.id;
};

const submitForm = async (valid, notice) => {
  if (valid) {
    // if (!imgIds.value?.length) {
    //   ElNotification.error({
    //     title: "Error",
    //     message: "Please upload image",
    //     position: "bottom-right",
    //   });
    //   return;
    // }

    try {
      isCreate.value
        ? await submitSave(form)
        : await submitEdit(entityId.value, form);
      if (notice) {
        ElNotification.success({
          title: "Success",
          position: "bottom-right",
        });
      }
      return true;
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
      return false;
    }
  } else {
    ElNotification.error({
      title: "Error",
      message: "Please fill in the fields",
      position: "bottom-right",
    });
    return false;
  }
};

const submitValidate = async (
  formEl: FormInstance | undefined,
  notice = true
) => {
  if (!formEl) return;
  return await formEl.validate((valid: any) => submitForm(valid, notice));
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

// Project Images
const dialogVisible = ref(false);
const deleteId = ref(null);

const handleCreate = async () => {
  const isCreated = await submitValidate(formRef.value, false);
  if (!isCreated) return;
  setTimeout(() => {
    navigateTo(`/admin/projects/${entityId.value}/create`);
  }, 500);
};
const handleEdit = async (row: any) => {
  const isCreated = await submitValidate(formRef.value, false);
  if (!isCreated) return;
  setTimeout(() => {
    navigateTo(`/admin/projects/${entityId.value}/${row.id}`);
  }, 500);
};
const handleDelete = (row: any) => {
  deleteId.value = row.id;
  dialogVisible.value = true;
};
const handleDeleteCancel = () => {
  dialogVisible.value = false;
  deleteId.value = null;
};

const handleDeleteConfirm = async () => {
  dialogVisible.value = false;
  try {
    await $fetch(
      `${config.apiBaseUrl}/projects/${entityId.value}/image/${deleteId.value}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    fetch();
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
  deleteId.value = null;
};
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
    <el-form-item class="input-container" label="Title" prop="title">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item class="input-container" label="Description" prop="desc">
      <el-input v-model="form.desc" :rows="5" type="textarea" />
    </el-form-item>
    <!-- Project Images -->
    <el-form-item class="input-container" label="Project Images">
      <client-only>
        <el-table
          class="images-table"
          :data="form.project_images"
          style="width: 100%"
        >
          <!-- <el-table-column label="id" prop="id" /> -->
          <el-table-column label="image">
            <template #default="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.files[0].url"
                fit="fill"
              />
            </template>
          </el-table-column>
          <el-table-column label="id" prop="id" />
          <el-table-column label="Name" prop="name" />
          <el-table-column align="right">
            <template #header>
              <el-button type="success" size="small" @click="handleCreate">
                Add
              </el-button>
            </template>
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.row)">
                Edit
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="handleDelete(scope.row)"
              >
                Delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- Модалка с предупреждением об удалении -->
        <el-dialog v-model="dialogVisible" title="Attention!" width="30%">
          <span>Delete project with id {{ deleteId }}?</span>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="handleDeleteCancel">Cancel</el-button>
              <el-button type="primary" @click="handleDeleteConfirm">
                Confirm
              </el-button>
            </span>
          </template>
        </el-dialog>
      </client-only>
    </el-form-item>
    <el-form-item>
      <div class="button-container">
        <div>
          <el-button type="primary" @click="submitValidate(formRef)">
            Save
          </el-button>
          <el-button @click="resetForm(formRef)">Clear</el-button>
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
.images-table {
  border: 1px solid #dcdfe6;
}
</style>
