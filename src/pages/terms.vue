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
        TERMS & CONDITIONS
    </Title>
    <AppPageHeadline title="TERMS & CONDITIONS" bgColor="grey" />
    <section class="terms">
        <div class="terms__list">
            <div class="terms__item" v-for="item in list" :key="item.caption + item.id">
                <div>
                    <h3>
                        {{ item.caption }}
                    </h3>
                </div>
                <div>
                    <p v-html="item.paragraph" />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.terms {
    &__item {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 60px 70px 120px 70px;

        &:nth-child(even) {
            background-color: $colorBackgroundGrey;
        }

        >div {
            &:first-child {
                max-width: 600px;
                h3 {
                    font-size: 62px;
                    letter-spacing: 3px;
                    line-height: 1.3;
                    font-weight: bold;
                }
            }

            &:last-child {
                max-width: 1000px;
                p {
                    font-size: 28px;
                    line-height: 1.8;
                    font-weight: 300;
                }
            }
        }
    }
}
</style>