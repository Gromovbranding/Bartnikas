<script lang="ts" setup>
const list = ref([
  {
    id: 1,
    caption: "PAYMENT",
    paragraph: `
            <strong>Every photo taken by StasBartnikas has a powerful energy of influence on those who have contact with it.</strong>
            <br/>
            <br/>
            All events, phenomena, and objects have their own energy field and they affect us and their surrounding space.
            Pictures by aerial photographer Stas Bartnikas convey the rare pristine energy of planet Earth, enhanced by the sensations of the process of photographing from flight.
            <br/>
            <br/>
            According to Alexander Palienko, these photographs have a powerful effect on the viewer and his life, filling the sphere with the necessary vibrations. Alexander “looks through” the pictures of Stas Bartnikas and gives each of them a name in accordance with the energetic influence they have on a person.
        `,
  },
  {
    id: 2,
    caption: "DELIVERY",
    paragraph: `
            <strong>Every photo taken by StasBartnikas has a powerful energy of influence on those who have contact with it.</strong>
            <br/>
            <br/>
            All events, phenomena, and objects have their own energy field and they affect us and their surrounding space.
            Pictures by aerial photographer Stas Bartnikas convey the rare pristine energy of planet Earth, enhanced by the sensations of the process of photographing from flight.
            <br/>
            <br/>
            According to Alexander Palienko, these photographs have a powerful effect on the viewer and his life, filling the sphere with the necessary vibrations. Alexander “looks through” the pictures of Stas Bartnikas and gives each of them a name in accordance with the energetic influence they have on a person.
        `,
  },
]);
</script>

<template>
  <Title> Payment & Delivery </Title>
  <AppPageHeadline title="Payment & Delivery" bg-color="grey" />
  <AppSectionTermCollection :list="list" />
</template>
