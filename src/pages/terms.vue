<script lang="ts" setup>
const list = ref([
    {
        id: 1,
        caption: 'Acceptance Of Terms',
        paragraph: 'The following Terms and Conditions Agreement is a legally binding agreement that shall govern the relationship with the users, clients, and visitors which may interact with Stas Bartnikas, also known as the Photographer/Artist, located in Moscow, Russia in association with the use of the website, stasbart.com (the "Site") and its Services, which shall be defined below.',
    },
    {
        id: 2,
        caption: 'Description Of Website Services Offered',
        paragraph: `The Site is an e-commerce/landing website and blog operated by Stas Bartnikas and the affiliated team. These Terms set forth the terms and conditions under which you may use the website and product provided by the Stas Bartnikas. <br/><br/> This website is the official website of Stas Bartnikas featuring his work, i.e. prints and collaboration items with other parties. All artworks that are listed on the website are available for visitors and/or clients to order online for purchasing. Please read the section about the Purchasing Policy. <br/><br/> Any and all visitors to the website shall be deemed as "users" of the herein contained Services.`,
    }
])
</script>

<template>
    <Title>
        Terms & Conditions
    </Title>
    <AppPageHeadline title="TERMS & CONDITIONS" bgColor="grey" />
    <AppSectionTermCollection :list="list" />
</template>