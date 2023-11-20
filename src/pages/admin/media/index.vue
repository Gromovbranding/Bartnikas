<script lang="ts" setup>
import {
  AdminCreateMediaCv,
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

const route = useRoute();

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
    component: shallowRef(AdminCreateMediaCv),
  },
]);

const mediaValue = ref(mediaList.value[0].value);

watch(
  () => route.query,
  () => {
    const isFound = !!mediaList.value.find(
      (item) => item.value === route.query?.type
    );

    mediaValue.value = isFound ? route.query.type : mediaList.value[0].value;
  },
  {
    immediate: true,
  }
);

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
