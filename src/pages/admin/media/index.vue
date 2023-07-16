<script lang="ts" setup>
import {
  AdminCreateMediaCV,
  AdminCreateMediaExhibition,
  AdminCreateMediaKit,
  AdminCreateMediaPresentation,
  AdminCreateMediaPublication,
} from "#components";

definePageMeta({
  layout: "admin",
});

useHeadSafe({
  title: "Media",
});

const mediaList = ref([
  {
    value: "kit",
    label: "Media Kit",
    component: shallowRef(AdminCreateMediaKit),
  },
  {
    value: "presentation",
    label: "Media Presentation",
    component: shallowRef(AdminCreateMediaPresentation),
  },
  {
    value: "publication",
    label: "Media Publication",
    component: shallowRef(AdminCreateMediaPublication),
  },
  {
    value: "exhibition",
    label: "Media Exhibition",
    component: shallowRef(AdminCreateMediaExhibition),
  },
  {
    value: "cv",
    label: "Media CV",
    component: shallowRef(AdminCreateMediaCV),
  },
]);

const mediaValue = ref(mediaList.value[0].value);

const mediaComponent = computed(() => {
  return mediaList.value.find((item) => item.value === mediaValue.value)!
    .component;
});
</script>

<template>
  <ElRow>
    <ElCol>
      <ElSelectV2
        v-model="mediaValue"
        filterable
        :options="mediaList"
        placeholder="Select Media Type"
        style="width: 240px"
      />
    </ElCol>
    <ElCol>
      <component :is="mediaComponent" />
    </ElCol>
  </ElRow>
</template>
