<script lang="ts" setup>
import { IContact } from "~/types/admin-api";

useHeadSafe({
  title: "Contacts",
});

const { fetchDelete, fetchGet } = useApi();

const isDialogDelete = ref<boolean>(false);
const projectIdDelete = ref<string | null>(null);

const { data: entites, refresh } = useAsyncData<IContact[]>(
  "entites",
  async () => await fetchGet("/contacts")
);

const handleDelete = async () => {
  try {
    await fetchDelete(`/contacts/${projectIdDelete.value}`);
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
        <span> Contacts </span>
      </div>
    </template>
    <ClientOnly>
      <ElTable :data="entites" border style="width: 100%">
        <ElTableColumn label="id" prop="id" width="120" />
        <ElTableColumn label="Name" prop="name" width="220" />
        <ElTableColumn label="Email" prop="email" width="220" />
        <ElTableColumn label="Comment" prop="comment" width="720" />
        <ElTableColumn label="Created" prop="created_at" width="220" />

        <ElTableColumn align="right" label="Operations">
          <template #default="{ row }">
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
        <span>Delete contact ?</span>
        <template #footer>
          <span class="dialog-footer">
            <ElButton
              @click="
                isDialogDelete = false;
                projectIdDelete = null;
              "
            >
              Cancel
            </ElButton>
            <ElButton type="primary" @click="handleDelete"> Confirm </ElButton>
          </span>
        </template>
      </ElDialog>
    </ClientOnly>
  </ElCard>
</template>
