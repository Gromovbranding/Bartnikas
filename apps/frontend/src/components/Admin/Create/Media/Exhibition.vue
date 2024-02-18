<script lang="ts" setup>
import type { IMediaExhibition } from '@/types/admin-api'

const headTitle = ref('Media Exhibition')

const {
  handleDelete,
  handleCreate,
  handleEdit,
  data: { entities, pending }
} = useAdmin().makeFetchersForIndexCard<IMediaExhibition>('media/exhibition')
</script>

<template>
  <AdminTemplateCardIndexPage
    v-loading="pending"
    :data="entities"
    :head-title="headTitle"
    @create="handleCreate"
    @edit="handleEdit"
    @delete="handleDelete"
  >
    <ElTableColumn label="Title" prop="translate.0.title" />
    <ElTableColumn label="Awards" prop="awards" />
  </AdminTemplateCardIndexPage>
</template>
