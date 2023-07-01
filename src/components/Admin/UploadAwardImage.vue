<script setup lang="ts">
import { UploadProps, UploadUserFile } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import { IFile } from "~/types/admin-api";

interface ImageDetails {
  [key: number]: {
    year: number;
    groups: {
      type: "Gold" | "Silver";
      images: {
        name: string;
        url: string;
      }[];
    }[];
  };
}

const { fetchRemoveImage } = useApi();
const { accessToken } = useAdmin();

const props = defineProps<{
  list: UploadProps["fileList"];
  imageDetails: ImageDetails;
  edit?: boolean;
}>();

const emit = defineEmits<{
  (e: "uploadFile", files: UploadUserFile[]): void;
  (e: "update:imageDetails", files: ImageDetails): void;
}>();

const fileList = ref<UploadUserFile[]>(props.list ?? []);

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  previewImageUrl.value = uploadFile.url!;
  isPreviewImageVisible.value = true;
};

const handleRemove: UploadProps["onRemove"] = async (file) => {
  delete awardImages.value[file.uid];
  return Boolean(await fetchRemoveImage((file.response as IFile).id));
};

const isPreviewImageVisible = ref<boolean>(false);
const previewImageUrl = ref<string>();
const awardImages = computed({
  set(val: ImageDetails) {
    emit("update:imageDetails", val);
  },
  get() {
    return props.imageDetails;
  },
});

const selectOptions = [
  { value: "Gold", label: "Gold" },
  { value: "Silver", label: "Silver" },
];

watchEffect(() => {
  emit("uploadFile", fileList.value);
});

watch(
  () => fileList.value,
  (file: UploadUserFile[]) => {
    if (!file[0].uid) return;
    const idx = file.length - 1;
    awardImages.value[file[idx].uid!] = {
      year: "",
      groups: [
        {
          type: "Gold",
          images: [
            {
              name: "",
              url: "",
            },
          ],
        },
      ],
    };
  }
);

function onClickDelete(e: Event) {
  const btn = e.target as HTMLButtonElement;
  btn.dispatchEvent(
    new KeyboardEvent("keydown", { key: "backspace", bubbles: true })
  );
}
</script>

<template>
  <div style="width: 100%">
    <ElUpload
      v-model:file-list="fileList"
      action="https://stanislavbartnikas.com:8080/files"
      list-type="picture"
      drag
      :headers="{
        Authorization: `Bearer ${accessToken}`,
      }"
      accept="image/png, image/jpeg, image/jpg"
      :on-remove="handleRemove"
      :on-preview="handlePictureCardPreview"
    >
      <ElIcon class="el-icon--upload"><ElIconUploadFilled /></ElIcon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #file="{ file }: { file: UploadUserFile }">
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.url"
          alt=""
          @click="handlePictureCardPreview(file)"
        />
        <div class="img" @keydown.stop>
          <div class="img__details">
            <ElFormItem label="Year" label-width="50">
              <el-input-number
                v-model="awardImages[file.uid!].year"
                :min="1970"
                :max="new Date().getFullYear()"
                size="small"
              />
            </ElFormItem>
            <ElFormItem label="Type" label-width="50">
              <el-select
                v-model="awardImages[file.uid!].groups"
                class="m-2"
                size="small"
              >
                <el-option
                  v-for="item in selectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </ElFormItem>
          </div>
        </div>
        <el-button
          type="danger"
          :icon="Delete"
          circle
          @click="onClickDelete"
        ></el-button>
      </template>
      <template #tip>
        <div>jpg/jpeg/png files with a size less than 500kb</div>
      </template>
    </ElUpload>

    <ElDialog v-model="isPreviewImageVisible">
      <ElImage :src="previewImageUrl" alt="Preview Image" />
    </ElDialog>
  </div>
</template>

<style scoped lang="scss">
.img {
  flex-grow: 1;
  margin-left: 1rem;
  h3 {
    font-size: 1.5rem;
  }
  &__details {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  &__sizes {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  button {
    padding-inline: 0.5rem;
  }
}
</style>
