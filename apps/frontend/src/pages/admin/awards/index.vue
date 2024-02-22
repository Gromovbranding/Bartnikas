<script lang="ts" setup>
import type { IAwards } from '~/types/admin-api'

const headTitle = ref('Awards')

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
} = useAdmin().makeFetchersForIndexCard<IAwards>(headTitle.value)

const { currentIndexLocale } = useAdmin()
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
    <ElTableColumn label="Title" :prop="`translate.${currentIndexLocale}.title`" />
    <ElTableColumn label="Description" :prop="`translate.${currentIndexLocale}.description`" />
  </AdminTemplateCardIndexPage>
</template>
