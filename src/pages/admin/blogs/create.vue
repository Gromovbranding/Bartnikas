<script lang="ts" setup>
const name = ref("Create Article");

useHeadSafe({
  title: name.value,
});

const handleCreate = async () =>
  // body: IBlog | null = null,
  // images: UploadUserFile[]
  {};
</script>

<template>
  <div>
    <ClientOnly>
      <AdminCardCreate
        :form="[
          {
            value: '',
            label: 'Title',
            type: 'input',
            prop: 'title',
          },
          {
            value: '',
            label: 'Description',
            type: 'textarea',
            prop: 'description',
          },
          {
            value: '',
            label: 'Text',
            type: 'textarea',
            prop: 'text',
          },
        ]"
        :name="name"
        back="blogs"
        :cb-create="handleCreate"
      />
    </ClientOnly>
  </div>
</template>
