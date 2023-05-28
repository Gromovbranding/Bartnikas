<script setup lang="ts">
import { IMediaCV } from "~/types/admin-api";

const { fetchGet } = useApi();

const { data: cv } = useAsyncData<IMediaCV[]>(
  "cv",
  async () => await fetchGet("/media/cv")
);
</script>

<template>
  <div v-for="item in cv" :key="'cv' + item.id" class="media__cv">
    <div>
      <UIZoom v-for="img in item.images" :key="'img' + img.id">
        <img :src="img.url" alt="" />
      </UIZoom>
    </div>
    <UIButton> Download pdf </UIButton>
  </div>
</template>

<style lang="scss" scoped>
.media__cv {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  width: 100%;
  > div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: $borderRadiusMain;
      object-fit: cover;
      max-height: 700px;
    }
  }
}
@media screen and (max-width: 550px) {
  .media__cv {
    > div {
      display: flex;
      flex-direction: column;
      gap: 26px;
      img {
      }
    }
  }
}
</style>
