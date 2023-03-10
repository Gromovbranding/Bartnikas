<script lang="ts" setup>
import { useAdminStore } from "~/stores/admin";

definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});

const adminStore = useAdminStore();
adminStore.setPageName("News");
const config = useRuntimeConfig();

const dialogVisible = ref(false);
const deleteId = ref(null);

const entites = ref([]);

const handleCreate = async () => {
  await navigateTo("/admin/news/create");
};
const handleEdit = async (row: any) => {
  await navigateTo(`/admin/news/${row.id}`);
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
  const { data } = await useFetch(`${config.apiBaseUrl}/news`);
  entites.value = data.value;
};

const handleDeleteConfirm = async () => {
  dialogVisible.value = false;
  try {
    await $fetch(`${config.apiBaseUrl}/news/${deleteId.value}`, {
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

const dateToCorrect = (date: string) => {
  if (!date) return "28.02.2023";
  const d = new Date(date);
  const year = d.toLocaleString("default", { year: "numeric" });
  const month = d.toLocaleString("default", { month: "2-digit" });
  const day = d.toLocaleString("default", { day: "2-digit" });
  return `${day}.${month}.${year}`;
};

const entitesСorrected = computed(() => {
  return entites.value?.map((e: any) => ({
    ...e,
    date: dateToCorrect(e?.date),
  }));
});

// TODO тут шлется лишний запрос, если is_hot у новости уже true
const setHot = async (id: number) => {
  try {
    await $fetch(`${config.apiBaseUrl}/news/${id}/set-hot`, {
      method: "POST",
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
};
</script>

<template>
  <div>
    <client-only>
      <el-table :data="entitesСorrected" style="width: 100%">
        <el-table-column label="id" prop="id" />
        <el-table-column label="Title" prop="title" />
        <el-table-column label="Date" prop="date" />
        <el-table-column label="Is Hot">
          <template #default="scope">
            <el-switch
              v-model="scope.row.is_hot"
              size="small"
              @change="setHot(scope.row.id)"
            />
          </template>
        </el-table-column>
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
