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
        :form="{
          title: {
            value: '',
            label: 'Title',
            type: 'input',
          },
          desc: {
            value: '',
            label: 'Description',
            type: 'textarea',
          },
          text: {
            value: '',
            label: 'Text',
            type: 'textarea',
          },
        }"
        :name="name"
        back="blogs"
      />
    </ClientOnly>
  </div>
</template>
