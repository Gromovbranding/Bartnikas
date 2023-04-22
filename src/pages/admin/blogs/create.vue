<script lang="ts" setup>
const name = ref("Create Article");

useHeadSafe({
  title: name.value,
});
</script>

<template>
  <div>
    <ClientOnly>
      <AdminCardCreate
        :form="[
          {
            value: '',
            prop: 'title',
            label: 'Title',
            type: 'input',
          },
          {
            value: '',
            prop: 'desc',
            label: 'Description',
            type: 'textarea',
          },
          {
            value: '',
            prop: 'text',
            label: 'Text',
            type: 'textarea',
          },
        ]"
        :name="name"
        back="blogs"
      />
    </ClientOnly>
  </div>
</template>
