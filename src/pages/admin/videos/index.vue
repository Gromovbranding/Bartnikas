<script lang="ts" setup>
import { IVideoCollection } from "~/types/admin-api";

useHeadSafe({
  title: "Videos",
});

const { fetchDelete, fetchGet } = useApi();

const isDialogDelete = ref<boolean>(false);
const projectIdDelete = ref<string | null>(null);

const { data: entites } = useAsyncData<IVideoCollection[]>(
  "entites",
  async () => await fetchGet("/video-collection")
);

const handleCreate = async () => {
  await navigateTo(`/admin/videos/create`);
};

const handleEdit = async (row: { id: string }) => {
  await navigateTo(`/admin/videos/${row.id}/edit`);
};

const handleDelete = async () => {
  try {
    await fetchDelete(`/video-collection/${projectIdDelete.value}`);
    await refreshNuxtData("entites");
  } finally {
    isDialogDelete.value = false;
    projectIdDelete.value = null;
  }
};

const videos = computed(() =>
  entites.value?.map((item) => ({
    ...item,
    group: item.group?.name,
    date: new Date(item.created_at).toLocaleDateString("ru-RU"),
  }))
);
</script>

<template>
  <ElCard>
    <template #header>
      <div class="card-header">
        <span> Videos </span>
        <ElButton type="success" size="small" @click="handleCreate">
          Create
        </ElButton>
      </div>
    </template>
    <ClientOnly>
      <ElTable :data="videos" border style="width: 100%">
        <ElTableColumn label="id" prop="id" width="120" />
        <ElTableColumn label="Title" prop="title" width="220" />
        <ElTableColumn label="Group" prop="group" width="200" />
        <ElTableColumn label="Date" prop="date" width="120" />

        <ElTableColumn align="right" label="Operations">
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
        <span>Delete video?</span>
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
