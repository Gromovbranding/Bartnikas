<script lang="ts" setup>
import type { IServices } from '~/types/admin-api'

const headTitle = ref('Place of power')

definePageMeta({
  layout: 'admin'
})

useHeadSafe({
  title: headTitle.value
})

const {
  handleCreate,
  handleEdit,
  handleDelete,
  data: { entities, pending }
} = useAdmin().makeFetchersForIndexCard<IServices>('place-of-power', 'services/place-of-power')
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
    <ElTableColumn label="Is Active" :prop="`is_active`" />
  </AdminTemplateCardIndexPage>
</template>
