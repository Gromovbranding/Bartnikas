<script lang="ts" setup>
import type { IMediaPublication } from '@/types/admin-api'

const headTitle = ref('Media Publication')

const {
  handleDelete,
  handleCreate,
  handleEdit,
  data: { entities, pending }
} = useAdmin().makeFetchersForIndexCard<IMediaPublication>('media/publication')
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
    <ElTableColumn label="Program" prop="translate.${currentIndexLocale}.program" />
    <ElTableColumn label="Subtitle" prop="translate.${currentIndexLocale}.subtitle" />
    <ElTableColumn label="URL" prop="url" />
    <ElTableColumn label="Date" prop="date">
      <template #default="{ row }">
        {{ useDateFormat().makeDateCorrect(row?.date) }}
      </template>
    </ElTableColumn>
  </AdminTemplateCardIndexPage>
</template>
