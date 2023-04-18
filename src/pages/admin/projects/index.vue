<script lang="ts" setup>
const { setPageName } = useAdmin();
const { fetchDelete, fetchUpdate } = useApi();

setPageName("Projects");

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

const updateProjects = async () => {
  const { data } = await fetchUpdate("/projects");

  console.log(data.value);
  entites.value = data.value;
};

const handleDeleteConfirm = async () => {
  try {
    dialogVisible.value = false;
    await fetchDelete(`/projects/${deleteId.value}`);
    await updateProjects();
  } catch (e) {
    console.log(e);
  } finally {
    deleteId.value = null;
  }
};

await updateProjects();
</script>

<template>
  <div>
    <ClientOnly>
      <ElTable :data="entites" style="width: 100%">
        <ElTableColumn label="id" prop="id" />
        <ElTableColumn label="Title" prop="title" />
        <ElTableColumn align="right">
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
        </ElTableColumn>
      </ElTable>

      <!-- Модалка с предупреждением об удалении -->
      <ElDialog v-model="dialogVisible" title="Attention!" width="30%">
        <span>Delete project with id {{ deleteId }}?</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="handleDeleteCancel">Cancel</el-button>
            <el-button type="primary" @click="handleDeleteConfirm">
              Confirm
            </el-button>
          </span>
        </template>
      </ElDialog>
    </ClientOnly>
  </div>
</template>
