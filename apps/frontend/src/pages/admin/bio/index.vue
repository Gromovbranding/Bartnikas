<script lang="ts" setup>
import type { IBio } from '~/types/admin-api'

const headTitle = ref('About me')

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
} = useAdmin().makeFetchersForIndexCard<IBio>('bio')
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
    <ElTableColumn label="Description" :prop="`translate.${currentIndexLocale}.description`" />
    <ElTableColumn label="Is Active" prop="is_active" />
    <ElTableColumn label="Subdescription" :prop="`translate.${currentIndexLocale}.sub_description`" />
  </AdminTemplateCardIndexPage>
</template>
