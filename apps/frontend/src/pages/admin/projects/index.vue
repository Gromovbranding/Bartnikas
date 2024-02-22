<script lang="ts" setup>
import type { IProject } from '~/types/admin-api'

const headTitle = ref('Projects')

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
} = useAdmin().makeFetchersForIndexCard<IProject>(headTitle.value)
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
    <ElTableColumn label="Group" prop="group" />
    <ElTableColumn label="Collab" :prop="`collab.translate.${currentIndexLocale}.collab_with`" />
  </AdminTemplateCardIndexPage>
</template>
