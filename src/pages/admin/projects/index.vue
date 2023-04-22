<script lang="ts" setup>
useHeadSafe({
  title: "Projects",
});

const { fetchDelete, fetchGet } = useApi();

const isDialogDelete = ref<boolean>(false);
const projectIdDelete = ref<string | null>(null);

const { data: entites } = useAsyncData(
  "entites",
  async () => await fetchGet("/projects")
);

const handleCreate = async () => {
  await navigateTo(`/admin/projects/create`);
};

const handleEdit = async (row: { id: string }) => {
  await navigateTo(`/admin/projects/${row.id}/edit`);
};

const handleDelete = async () => {
  try {
    await fetchDelete(`/projects/${projectIdDelete.value}`);
    await refreshNuxtData("entites");
  } finally {
    isDialogDelete.value = false;
    projectIdDelete.value = null;
  }
};
</script>

<template>
  <ElCard>
    <template #header>
      <div class="card-header">
        <span> Projects </span>
      </div>
    </template>
    <ClientOnly>
      <ElTable :data="entites" border style="width: 100%">
        <ElTableColumn label="id" prop="id" width="120" />
        <ElTableColumn label="Title" prop="title" width="120" />

        <ElTableColumn align="right" label="Operations">
          <template #header>
            <ElButton type="success" size="small" @click="handleCreate">
              Create
            </ElButton>
          </template>
          <template #default="{ row }">
            <ElButton size="small" @click="handleEdit(row)"> Edit </ElButton>
            <ElButton
              type="danger"
              size="small"
              @click="
                isDialogDelete = true;
                projectIdDelete = row.id;
              "
            >
              Delete
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>

      <!-- Модалка с предупреждением об удалении -->
      <ElDialog
        v-model="isDialogDelete"
        title="Attention!"
        width="30%"
        @close="projectIdDelete = null"
      >
        <span>Delete project ?</span>
        <template #footer>
          <span class="dialog-footer">
            <ElButton
              @click="
                isDialogDelete = false;
                projectIdDelete = null;
              "
              >Cancel</ElButton
            >
            <ElButton type="primary" @click="handleDelete"> Confirm </ElButton>
          </span>
        </template>
      </ElDialog>
    </ClientOnly>
  </ElCard>
</template>
