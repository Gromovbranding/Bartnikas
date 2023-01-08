<script lang="ts" setup>
interface Props {
    list: {
        id: number;
        caption: string
        paragraph: string
    }[]
}

defineProps<Props>()
</script>
<template>
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