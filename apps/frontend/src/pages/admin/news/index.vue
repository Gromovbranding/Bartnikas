<script lang="ts" setup>
import type { IArticle } from '~/types/admin-api'

const headTitle = ref('News')

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
} = useAdmin().makeFetchersForIndexCard<IArticle>(headTitle.value)
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
    <ElTableColumn label="Text" :prop="`translate.${currentIndexLocale}.text`" />
    <ElTableColumn label="Is Hot" prop="is_hot" />
  </AdminTemplateCardIndexPage>
</template>
