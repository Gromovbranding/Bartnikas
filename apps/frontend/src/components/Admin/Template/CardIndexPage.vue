<script lang="ts" generic="T" setup>
enum ListHandlersOff {
  EDIT = 'edit',
  CREATE = 'create',
  DELETE = 'delete',
}

withDefaults(
  defineProps<{
    headTitle: string;
    data: T[] | null;
    handlersOff?: ListHandlersOff[];
  }>(),
  {
    handlersOff: () => []
  }
)

const emits = defineEmits<{
  (emit: ListHandlersOff.CREATE): void;
  (emit: ListHandlersOff.EDIT, id: string): void;
  (emit: ListHandlersOff.DELETE, id: string): void;
}>()

const isDialogDelete = ref<boolean>(false)
const dialogIDDelete = ref<string | null>(null)

const handlers = {
  handleCreate () {
    emits(ListHandlersOff.CREATE)
  },

  handleEdit ({ id }: { id: string }) {
    emits(ListHandlersOff.EDIT, id)
  },

  handleDelete (id: string) {
    emits(ListHandlersOff.DELETE, id)

    isDialogDelete.value = false
    dialogIDDelete.value = null
  }
}
</script>

<template>
  <ElCard>
    <template #header>
      <div class="card-header">
        <span style="text-transform: capitalize"> {{ headTitle }} </span>
        <ElButton
          v-if="!handlersOff.includes(ListHandlersOff.CREATE)"
          type="success"
          size="small"
          @click="handlers.handleCreate"
        >
          Create
        </ElButton>
      </div>
    </template>
    <ClientOnly>
      <ElTable :data="data" border style="width: 100%">
        <ElTableColumn label="Id" prop="id" width="120" />

        <slot />

        <ElTableColumn label="Created" prop="created_at" width="120">
          <template #default="{ row }">
            {{ useDateFormat().makeDateCorrect(row?.created_at) }}
          </template>
        </ElTableColumn>
        <ElTableColumn label="last update" prop="updated_at" width="120">
          <template #default="{ row }">
            {{ useDateFormat().makeDateCorrect(row?.updated_at) }}
          </template>
        </ElTableColumn>
        <ElTableColumn fixed="right" label="Operations" width="160">
          <template #default="{ row }">
            <ElButton
              v-if="!handlersOff.includes(ListHandlersOff.EDIT)"
              size="small"
              @click="handlers.handleEdit(row)"
            >
              Edit
            </ElButton>
            <ElButton
              v-if="!handlersOff.includes(ListHandlersOff.DELETE)"
              type="danger"
              size="small"
              @click="
                isDialogDelete = true;
                dialogIDDelete = String(row.id);
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
        @close="dialogIDDelete = null"
      >
        <span>Are you sure you want to delete ?</span>
        <template #footer>
          <span class="dialog-footer">
            <ElButton
              @click="
                isDialogDelete = false;
                dialogIDDelete = null;
              "
            >
              Cancel
            </ElButton>
            <ElButton
              type="primary"
              @click="handlers.handleDelete(String(dialogIDDelete))"
            >
              Confirm
            </ElButton>
          </span>
        </template>
      </ElDialog>
    </ClientOnly>
  </ElCard>
</template>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
