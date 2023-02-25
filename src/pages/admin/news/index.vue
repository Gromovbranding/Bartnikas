<script lang="ts" setup>
import { useAdminStore } from "~/stores/admin";

definePageMeta({
  layout: "admin",
});

const adminStore = useAdminStore();
adminStore.setPageName("News");

const dialogVisible = ref(false);
const deleteId = ref(null);

const entites = ref([]);

const handleCreate = async () => {
  await navigateTo("/admin/news/create");
};
const handleEdit = async (row: User) => {
  await navigateTo(`/admin/news/${row.id}`);
};
const handleDelete = (row: User) => {
  deleteId.value = row.id;
  dialogVisible.value = true;
};
const handleDeleteCancel = () => {
  dialogVisible.value = false;
  deleteId.value = null;
};

const fetch = async () => {
  const { data } = await useFetch("http://localhost:8080/news");
  entites.value = data.value;
};

const handleDeleteConfirm = async () => {
  dialogVisible.value = false;
  try {
    await $fetch(`http://localhost:8080/news/${deleteId.value}`, {
      method: "DELETE",
    });
    fetch();
  } catch (e) {
    ElNotification.error({
      title: "Error",
      message: e,
      position: "bottom-right",
    });
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
        <span>Delete news with id {{ deleteId }}?</span>
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
