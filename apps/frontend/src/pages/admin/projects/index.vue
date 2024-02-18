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
    <ElTableColumn label="Title" prop="translate.0.title" />
    <ElTableColumn label="Group" prop="group" />
    <ElTableColumn label="Collab" prop="collab.translate.0.collab_with" />
  </AdminTemplateCardIndexPage>
</template>
