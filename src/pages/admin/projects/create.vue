<script lang="ts" setup>
const name = ref("Create Project");

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
        ]"
        :name="name"
        back="projects"
      />
    </ClientOnly>
  </div>
</template>
