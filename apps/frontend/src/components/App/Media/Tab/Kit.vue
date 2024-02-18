<script setup lang="ts">
import type { IMediaKit } from '~/types/admin-api'

const { fetchGet } = useApi()

const { data: mediakit } = await useAsyncData<IMediaKit[]>(
  'mediakit',
  async () => await fetchGet('/media/kit')
)
</script>

<template>
  <div v-for="kit in mediakit" :key="'kit' + kit.id" class="media__kit">
    <NuxtImg loading="lazy" :src="`/baseApiFiles/${kit.image.name}`" />
    <UIButton :to="useGetFileByUrl(kit.pdf.name)" download>
      {{ $t("media.downloadPDF") }}
    </UIButton>
  </div>
</template>

<style lang="scss" scoped>
.media__kit {
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  img,
  picture {
    width: 100%;
    border-radius: $borderRadiusMain;
    object-fit: cover;
  }
}
</style>
