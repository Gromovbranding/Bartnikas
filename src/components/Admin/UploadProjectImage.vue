<script setup lang="ts">
import { UploadProps, UploadUserFile } from "element-plus";
import { Close, Delete } from "@element-plus/icons-vue";

interface ImageDetails {
  [key: number]: {
    image_name: string;
    price: number;
    is_active: boolean;
    sizes: {
      width: number;
      height: number;
      unit: "cm";
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
  delete projectImages.value[file.uid];
  if (file.response?.name) return await fetchRemoveImage(file.response.name);
  await fetchRemoveImage(file.name);
};

const isPreviewImageVisible = ref<boolean>(false);
const previewImageUrl = ref<string>();
const projectImages = computed({
  set(val: ImageDetails) {
    emit("update:imageDetails", val);
  },
  get() {
    return props.imageDetails;
  },
});

watchEffect(() => {
  emit("uploadFile", fileList.value);
});

watch(
  () => fileList.value,
  (file: UploadUserFile[]) => {
    const idx = file.length - 1;
    projectImages.value[file[idx].uid! - 1] = {
      image_name: file[idx].name.split(".")[0],
      price: 0,
      is_active: true,
      sizes: [
        {
          width: 100,
          height: 100,
          unit: "cm",
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
        <div v-if="projectImages[file.uid! - 1]" class="img" @keydown.stop>
          <div class="img__details">
            <label
              >Is active:
              <input
                v-model="projectImages[file.uid! - 1].is_active"
                type="checkbox"
            /></label>
            <ElFormItem required label="Name" label-width="60">
              <ElInput
                v-model="projectImages[file.uid! - 1].image_name"
                size="small"
              />
            </ElFormItem>
            <ElFormItem required label="Price, €" label-width="70">
              <el-input-number
                v-model="projectImages[file.uid! - 1].price"
                :min="1"
                size="small"
              />
            </ElFormItem>
          </div>
          <h3>Sizes</h3>
          <div
            v-for="(item, idx) in projectImages[file.uid! - 1].sizes"
            :key="idx"
            class="img__sizes"
          >
            <label
              >Width, cm
              <el-input-number v-model="item.width" :min="1" size="small"
            /></label>
            <label
              >Height, cm
              <el-input-number v-model="item.height" :min="1" size="small"
            /></label>
            <el-button
              v-if="idx !== 0"
              type="danger"
              :icon="Delete"
              circle
              @click="projectImages[file.uid! - 1].sizes.splice(idx, 1)"
            >
            </el-button>
          </div>
          <el-button
            type="primary"
            @click="
              projectImages[file.uid! - 1].sizes.push({
                width: 100,
                height: 100,
                unit: 'cm',
              })
            "
          >
            add
          </el-button>
        </div>
        <el-button
          type="danger"
          :icon="Close"
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
