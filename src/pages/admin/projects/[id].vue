<script lang="ts" setup>
import type { FormInstance } from "element-plus";

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
  <ElForm ref="formRef" :model="form" :rules="rules" label-width="120px">
    <ElFormItem class="input-container" label="Title" prop="title">
      <ElInput v-model="form.title" />
    </ElFormItem>
    <ElFormItem class="input-container" label="Description" prop="desc">
      <ElInput v-model="form.desc" :rows="5" type="textarea" />
    </ElFormItem>
    <!-- Project Images -->
    <ElFormItem class="input-container" label="Project Images">
      <ClientOnly>
        <ElTable
          class="images-table"
          :data="form.project_images"
          style="width: 100%"
        >
          <!-- <el-table-column label="id" prop="id" /> -->
          <ElTableColumn label="image">
            <template #default="scope">
              <ElImage
                style="width: 100px; height: 100px"
                :src="scope.row.files[0].url"
                fit="fill"
              />
            </template>
          </ElTableColumn>
          <ElTableColumn label="id" prop="id" />
          <ElTableColumn label="Name" prop="name" />
          <ElTableColumn align="right">
            <template #header>
              <ElButton type="success" size="small" @click="handleCreate">
                Add
              </ElButton>
            </template>
            <template #default="scope">
              <ElButton size="small" @click="handleEdit(scope.row)">
                Edit
              </ElButton>
              <ElButton
                type="danger"
                size="small"
                @click="handleDelete(scope.row)"
              >
                Delete
              </ElButton>
            </template>
          </ElTableColumn>
        </ElTable>

        <!-- Модалка с предупреждением об удалении -->
        <ElDialog v-model="dialogVisible" title="Attention!" width="30%">
          <span>Delete project with id {{ deleteId }}?</span>
          <template #footer>
            <span class="dialog-footer">
              <ElButton @click="handleDeleteCancel">Cancel</ElButton>
              <ElButton type="primary" @click="handleDeleteConfirm">
                Confirm
              </ElButton>
            </span>
          </template>
        </ElDialog>
      </ClientOnly>
    </ElFormItem>
    <ElFormItem>
      <div class="button-container">
        <div>
          <ElButton type="primary" @click="submitValidate(formRef)">
            Save
          </ElButton>
          <ElButton @click="resetForm(formRef)">Clear</ElButton>
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
.images-table {
  border: 1px solid #dcdfe6;
}
</style>
