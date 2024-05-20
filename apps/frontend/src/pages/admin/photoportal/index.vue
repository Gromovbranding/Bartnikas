<script lang="ts" setup>
import type { IServices } from '~/types/admin-api'

const headTitle = ref('Photoportal')

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
} = useAdmin().makeFetchersForIndexCard<IServices>(headTitle.value, 'services/photoportal')
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
