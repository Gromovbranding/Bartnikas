<script lang="ts" setup>
import type { IndexCardFooter } from '~/types/admin-api'

const headTitle = ref('Footer card')

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
} = useAdmin().makeFetchersForIndexCard<IndexCardFooter>(
  'footer-card-index',
  'index-card-footer'
)
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
    <ElTableColumn label="Is active" prop="active" />
    <ElTableColumn label="Text" :prop="`translate.${currentIndexLocale}.text`" />
  </AdminTemplateCardIndexPage>
</template>
