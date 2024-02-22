<script lang="ts" setup>
import type { ITermsStatic } from '~/types/admin-api'

const headTitle = ref('Terms & Conditions')

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
} = useAdmin().makeFetchersForIndexCard<ITermsStatic>('terms-static')
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
