<script lang="ts" setup>
import {
  IMediaCV,
  IMediaExhibition,
  IMediaKit,
  IMediaPresentation,
  IMediaPublication,
} from "~/types/admin-api";
import {
  AdminFormCV,
  AdminFormExhibition,
  AdminFormKit,
  AdminFormPresentation,
  AdminFormPublication,
} from "#components";

definePageMeta({
  layout: "admin",
});

useHeadSafe({
  title: "Media",
});

const { fetchDelete, fetchGet } = useApi();

const isDialogDelete = ref<boolean>(false);
const projectIdDelete = ref<any>();

const { data: mediakit, refresh: refreshKit } = useAsyncData<IMediaKit[]>(
  "mediakit",
  async () => await fetchGet("/media/kit")
);
const { data: presentation, refresh: refreshPresentation } = useAsyncData<
  IMediaPresentation[]
>("presentation", async () => await fetchGet("/media/presentation"));
const { data: publication, refresh: refreshPublication } = useAsyncData<
  IMediaPublication[]
>("publication", async () => await fetchGet("/media/publication"));
const { data: exhibition, refresh: refreshExhibition } = useAsyncData<
  IMediaExhibition[]
>("exhibition", async () => await fetchGet("/media/exhibition"));
const { data: cv, refresh: refreshCV } = useAsyncData<IMediaCV[]>(
  "cv",
  async () => await fetchGet("/media/cv")
);

// const handleEdit = async (row: { id: string }) => {
//   await navigateTo(`/admin/media/${row.id}/edit`);
// };

const refreshMap = new Map([
  ["Kit", refreshKit],
  ["Presentation", refreshPresentation],
  ["Publication", refreshPublication],
  ["Exhibition", refreshExhibition],
  ["CV", refreshCV],
]);

const btnArr = [
  { value: "Kit", label: "Media kit" },
  { value: "Presentation", label: "Presentation" },
  { value: "Publication", label: "Publication" },
  { value: "Exhibition", label: "Exhibition" },
  { value: "CV", label: "CV" },
];

const handleDelete = async () => {
  try {
    const type = btnArr.find(
      (item) => item.label === projectIdDelete.value.type
    )?.value;
    await fetchDelete(`/media/${type}/${projectIdDelete.value.id}`);
    refreshMap.get(type)();
  } finally {
    isDialogDelete.value = false;
    projectIdDelete.value = null;
  }
};

const tableList = computed(() => {
  const kit = mapArray(mediakit.value, "Media kit");
  const pres = mapArray(presentation.value, "Presentation");
  const pub = mapArray(publication.value, "Publication");
  const exh = mapArray(exhibition.value, "Exhibition");
  const cvList = mapArray(cv.value, "CV");
  return [kit, pres, pub, exh, cvList].flatMap((item) => item);
});

const activeForm = ref("");

function mapArray(list: any[] | null, type: string) {
  if (!list) return [];
  return list.map((item) => ({
    ...item,
    type,
    date: new Date(item.created_at).toLocaleDateString("ru-RU"),
  }));
}

const form = new Map([
  ["Kit", AdminFormKit],
  ["Presentation", AdminFormPresentation],
  ["Publication", AdminFormPublication],
  ["Exhibition", AdminFormExhibition],
  ["CV", AdminFormCV],
]);
</script>

<template>
  <ElCard>
    <template #header>
      <div class="card-header">
        <span> Media </span>
      </div>
    </template>
    <ClientOnly>
      <div class="btns">
        <ElButton
          v-for="btn in btnArr"
          :key="btn.value"
          type="success"
          @click="activeForm = btn.value"
        >
          Add {{ btn.label }}
        </ElButton>
      </div>
      <div class="forms">
        <component
          :is="form.get(activeForm)"
          v-if="activeForm"
          :refresh="refreshMap.get(activeForm)"
        />
      </div>
      <ElTable :data="tableList" border style="width: 100%">
        <ElTableColumn label="Type" prop="type" width="120" />
        <ElTableColumn label="Title" prop="title" width="200" />
        <ElTableColumn label="Date" prop="date" width="120" />

        <ElTableColumn align="right" label="Operations">
          <template #default="{ row }">
            <!-- <ElButton size="small" @click="handleEdit(row)"> Edit </ElButton> -->
            <ElButton
              type="danger"
              size="small"
              @click="
                isDialogDelete = true;
                projectIdDelete = row;
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
        <span>Delete?</span>
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

<style scoped lang="scss">
.forms {
  margin-block: 1rem;
}

.btns {
  margin-bottom: 1rem;
}
</style>
