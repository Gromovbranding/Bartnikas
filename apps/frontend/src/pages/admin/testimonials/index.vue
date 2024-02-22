<script lang="ts" setup>
import type { ITestimonial } from '~/types/admin-api'

const headTitle = ref('Testimonials')

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
} = useAdmin().makeFetchersForIndexCard<ITestimonial>(headTitle.value)
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
    <ElTableColumn label="Info" :prop="`translate.${currentIndexLocale}.additional_info`" />
  </AdminTemplateCardIndexPage>
</template>
