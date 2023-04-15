<script lang="ts" setup>
definePageMeta({
  layout: "admin",
});

const { setPageName } = useAdmin();
const { makeDateCorrect } = useDateFormat();
const { fetchDelete, fetchPost, fetchUpdate } = useApi();

setPageName("News");

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

const updateNews = async () => {
  const { data } = await fetchUpdate("/news");
  entites.value = data.value;
};

const handleDeleteConfirm = async () => {
  try {
    dialogVisible.value = false;
    await fetchDelete(`/news/${deleteId.value}`);
    await updateNews();
  } catch (e) {
    console.log(e);
  } finally {
    deleteId.value = null;
  }
};

// TODO тут шлется лишний запрос, если is_hot у новости уже true
const setHot = async (id: number) => {
  try {
    await fetchPost(`/news/${id}/set-hot`);
    await updateNews();
  } catch (e) {
    console.log(e);
  }
};

await updateNews();

const entitesСorrected = computed(() => {
  return entites.value?.map((e: any) => ({
    ...e,
    date: makeDateCorrect(e?.date),
  }));
});
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
