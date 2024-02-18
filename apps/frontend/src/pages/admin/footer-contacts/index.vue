<script lang="ts" setup>
import type { IFooterContact } from '~/types/admin-api'

const headTitle = ref('Footer Contacts')

definePageMeta({
  layout: 'admin'
})

useHeadSafe({
  title: headTitle.value
})

const {
  handleCreate,
  handleDelete,
  handleEdit,
  data: { entities, pending }
} = useAdmin().makeFetchersForIndexCard<IFooterContact>('footer-contacts')
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
    <ElTableColumn label="Is active" prop="active" />
  </AdminTemplateCardIndexPage>
</template>
