<script lang="ts" setup>
import { useAdminStore } from "~/stores/admin";

definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});

const adminStore = useAdminStore();
adminStore.setPageName("Projects");
const config = useRuntimeConfig();

const dialogVisible = ref(false);
const deleteId = ref(null);

const entites = ref([]);

const handleCreate = async () => {
  await navigateTo("/admin/projects/create");
};
const handleEdit = async (row: any) => {
  await navigateTo(`/admin/projects/${row.id}`);
};
const handleDelete = (row: any) => {
  deleteId.value = row.id;
  dialogVisible.value = true;
};
const handleDeleteCancel = () => {
  dialogVisible.value = false;
  deleteId.value = null;
};

const fetch = async () => {
  const { data } = await useFetch(`${config.apiBaseUrl}/projects`);
  entites.value = data.value;
};

const handleDeleteConfirm = async () => {
  dialogVisible.value = false;
  try {
    await $fetch(`${config.apiBaseUrl}/projects/${deleteId.value}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${adminStore.accessToken}`,
      },
    });
    fetch();
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
  deleteId.value = null;
};

fetch();
</script>

<template>
  <div>
    <client-only>
      <el-table :data="entites" style="width: 100%">
        <el-table-column label="id" prop="id" />
        <el-table-column label="Title" prop="title" />
        <el-table-column align="right">
          <template #header>
            <el-button type="success" size="small" @click="handleCreate">
              Create
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
              >Delete</el-button
            >
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
  </div>
</template>
