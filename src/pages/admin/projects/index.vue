<script lang="ts" setup>
const { setPageName } = useAdmin();
const { fetchDelete, fetchGet } = useApi();

setPageName("Projects");

const dialogVisible = ref<boolean>(false);
const deleteId = ref<string | number | null>(null);

const { data: entites, refresh } = useAsyncData(
  async () => await fetchGet("/projects")
);

const handleCreate = async (row: { id: string }) => {
  await navigateTo(`/admin/projects/${row.id}/create`);
};

const handleEdit = async (row: { id: string }) => {
  await navigateTo(`/admin/projects/${row.id}/edit`);
};

const handleDelete = (row: { id: string }) => {
  deleteId.value = row.id;
  dialogVisible.value = true;
};

const handleDeleteCancel = () => {
  deleteId.value = null;
};

const handleDeleteConfirm = async () => {
  try {
    await fetchDelete(`/projects/${deleteId.value}`);
    await refresh();
  } catch (e) {
    console.log(e);
  } finally {
    deleteId.value = null;
    dialogVisible.value = false;
  }
};
</script>

<template>
  <div>
    <ElTable :data="entites" border style="width: 100%">
      <ElTableColumn label="id" prop="id" width="120" />
      <ElTableColumn label="Title" prop="title" width="120" />

      <ElTableColumn align="right" label="Operations">
        <template #header="{ row }">
          <ElButton type="success" size="small" @click="handleCreate(row)">
            Create
          </ElButton>
        </template>
        <template #default="{ row }">
          <ElButton size="small" @click="handleEdit(row)"> Edit </ElButton>
          <ElButton type="danger" size="small" @click="handleDelete(row)">
            Delete
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>

    <!-- Модалка с предупреждением об удалении -->
    <ElDialog v-model="dialogVisible" title="Attention!" width="30%">
      <span>Delete project ?</span>
      <template #footer>
        <span class="dialog-footer">
          <ElButton @click="handleDeleteCancel">Cancel</ElButton>
          <ElButton type="primary" @click="handleDeleteConfirm">
            Confirm
          </ElButton>
        </span>
      </template>
    </ElDialog>
  </div>
</template>
