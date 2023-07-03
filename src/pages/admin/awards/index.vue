<script lang="ts" setup>
import { IAwards } from "~/types/admin-api";

definePageMeta({
  layout: "admin",
});

useHeadSafe({
  title: "Awards",
});

const { fetchDelete, fetchGet } = useApi();

const isDialogDelete = ref<boolean>(false);
const projectIdDelete = ref<string | null>(null);

const { data: entites, refresh } = useAsyncData<IAwards>(
  "entites",
  async () => await fetchGet("/awards")
);

const handleCreate = async () => {
  await navigateTo(`/admin/awards/create`);
};

// const handleEdit = async (row: { id: string }) => {
//   await navigateTo(`/admin/awards/${row.id}/edit`);
// };

const handleDelete = async () => {
  try {
    await fetchDelete(`/awards/${projectIdDelete.value}`);
    await refresh();
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
        <span> Awards </span>
        <ElButton type="success" size="small" @click="handleCreate">
          Create
        </ElButton>
      </div>
    </template>
    <ClientOnly>
      <ElTable :data="entites" border style="width: 100%">
        <ElTableColumn label="id" prop="id" width="120" />
        <ElTableColumn label="Title" prop="title" width="220" />
        <ElTableColumn label="Description" prop="description" width="700" />
        <!-- <ElTableColumn label="Date" prop="date" width="120" /> -->

        <ElTableColumn align="right" label="Operations">
          <template #default="{ row }">
            <!-- <ElButton size="small" @click="handleEdit(row)"> Edit </ElButton> -->
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
        <span>Delete award?</span>
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
