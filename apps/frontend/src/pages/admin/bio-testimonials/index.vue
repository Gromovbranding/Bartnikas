<script lang="ts" setup>
import type { IBioTestimonials } from '~/types/admin-api'

const headTitle = ref('Bio Testimonials')

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
} = useAdmin().makeFetchersForIndexCard<IBioTestimonials>('bio-testimonials')
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
    <ElTableColumn label="Name" prop="translate.0.name" />
    <ElTableColumn label="Job" prop="translate.0.job" />
    <ElTableColumn label="testimonial" prop="translate.0.testimonial" />
  </AdminTemplateCardIndexPage>
</template>
