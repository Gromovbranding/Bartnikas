<script lang="ts" setup>
definePageMeta({
  layout: "admin",
});

const { setPageName } = useAdmin();
const { makeDateCorrect } = useDateFormat();
const { fetchDelete, fetchUpdate } = useApi();

setPageName("Blogs");

const dialogVisible = ref(false);
const deleteId = ref(null);

const entites = ref([]);

const handleCreate = async () => {
  await navigateTo("/admin/blogs/create");
};

const handleEdit = async (row: any) => {
  await navigateTo(`/admin/blogs/${row.id}`);
};

const handleDelete = (row: any) => {
  deleteId.value = row.id;
  dialogVisible.value = true;
};

const handleDeleteCancel = () => {
  dialogVisible.value = false;
  deleteId.value = null;
};

const updateBlogs = async () => {
  const { data } = await fetchUpdate("/blogs");
  entites.value = data.value;
};

const handleDeleteConfirm = async () => {
  try {
    dialogVisible.value = false;
    await fetchDelete(`/blogs/${deleteId.value}`);
    await updateBlogs();
  } catch (e) {
    console.log(e);
  } finally {
    deleteId.value = null;
  }
};

await updateBlogs();

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
        <span>Delete blog with id {{ deleteId }}?</span>
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
