<script lang="ts" setup>
import type { FormInstance, FormRules, ElNotification } from "element-plus";
import { useAdminStore } from "~/stores/admin";

definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});

const route = useRoute();
const entityId = route.params.id;
const isCreate = entityId === "create";

const adminStore = useAdminStore();
adminStore.setPageName("News " + isCreate ? "Create" : "Edit");
const config = useRuntimeConfig();

const formRef = ref<FormInstance>();
const form = reactive({
  title: "",
  date: null,
  desc: "",
  text: "",
  img: "",
});

if (!isCreate) {
  const { data } = await useFetch(`${config.apiBaseUrl}/news/${entityId}`);
  Object.assign(form, data.value);
}

const rules = reactive<FormRules>({
  title: [
    {
      required: true,
      message: "Please input Title",
      trigger: "change",
    },
  ],
  date: [
    {
      required: true,
      message: "Please input Date",
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
  text: [
    {
      required: true,
      message: "Please input Text",
      trigger: "change",
    },
  ],
  img: [
    {
      required: true,
      message: "Please input Image",
      trigger: "change",
    },
  ],
});

const toBack = async () => {
  await navigateTo("/admin/news");
};

const submitSave = async (form: object) => {
  await $fetch(`${config.apiBaseUrl}/news`, {
    method: "POST",
    body: form,
    headers: {
      Authorization: `Bearer ${adminStore.accessToken}`,
    },
  });
};

const submitEdit = async (id: number, form: object) => {
  await $fetch(`${config.apiBaseUrl}/news/${id}`, {
    method: "PATCH",
    body: form,
    headers: {
      Authorization: `Bearer ${adminStore.accessToken}`,
    },
  });
};

const submitForm = async (valid) => {
  if (valid) {
    try {
      isCreate ? await submitSave(form) : await submitEdit(entityId, form);
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
        adminStore.clearAccessToken();
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
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
    <el-form-item class="input-container" label="Title" prop="title">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item class="input-container" label="Date" prop="date">
      <el-col :span="11">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>
    <el-form-item class="input-container" label="Description" prop="desc">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item class="input-container" label="Text" prop="text">
      <el-input v-model="form.text" :rows="5" type="textarea" />
    </el-form-item>
    <el-form-item class="input-container" label="Image" prop="img">
      <el-input v-model="form.img" />
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
</style>
