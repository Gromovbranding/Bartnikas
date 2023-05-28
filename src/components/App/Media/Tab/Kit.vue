<script setup lang="ts">
import { IMediaKit } from "~/types/admin-api";

const { fetchGet } = useApi();

const { data: mediakit } = useAsyncData<IMediaKit[]>(
  "mediakit",
  async () => await fetchGet("/media/kit")
);
</script>

<template>
  <div v-for="kit in mediakit" :key="'kit' + kit.id" class="media__kit">
    <img :src="kit.image.url" alt="" />
    <UIButton :to="kit.pdf.url" download> Download pdf </UIButton>
  </div>
</template>

<style lang="scss" scoped>
.media__kit {
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  img {
    width: 100%;
    border-radius: $borderRadiusMain;
    object-fit: cover;
  }
}
</style>
