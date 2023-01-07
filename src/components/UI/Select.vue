<script lang="ts" setup>
interface IItem {
    label: string
    value: string
}

interface Props {
    list: IItem[]
}

const emit = defineEmits<{
    (e: 'change', item: IItem): void
}>()

const props = withDefaults(defineProps<Props>(), {
    list: () => ([])
})

const selected = ref<IItem>({
    label: '',
    value: ''
})

const isSelectOpen = ref(false)

const handleSelect = (item: IItem) => {
    selected.value = item
    isSelectOpen.value = false
    emit('change', item)
}

onMounted(() => {
    selected.value = props.list[0]
})
</script>

<template>
    <div :class="['select', { 'select--active': isSelectOpen }]">
        <div class="select__head" @click="isSelectOpen = !isSelectOpen">
            <div>
                {{ selected.label }}
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="32" viewBox="0 0 24 24" width="32">
                    <path clip-rule="evenodd"
                        d="M19.3536 15.3536C19.1583 15.5488 18.8417 15.5488 18.6464 15.3536L12 8.70711L5.35355 15.3536C5.15829 15.5488 4.84171 15.5488 4.64645 15.3536C4.45118 15.1583 4.45118 14.8417 4.64645 14.6464L11.6464 7.64645C11.8417 7.45118 12.1583 7.45118 12.3536 7.64645L19.3536 14.6464C19.5488 14.8417 19.5488 15.1583 19.3536 15.3536Z"
                        fill="black" fill-rule="evenodd" />
                </svg>
            </div>
        </div>
        <div class="select__list">
            <div class="select__item" v-for="item in list" :key="item.value" @click="handleSelect(item)">
                {{ item.label }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.select {
    position: relative;

    &--active {
        >.select__list {
            opacity: 1;
        }

        >.select__head {
            svg {
                transform: rotate(0deg);
            }
        }
    }

    &__head {
        border: 1px solid #242424;
        background-color: $colorBackgroundGrey;
        border-radius: 5px;
        font-size: 32px;
        padding: 12px 25px;
        min-width: 270px;
        display: flex;
        align-content: center;
        justify-content: space-between;
        cursor: pointer;
        font-weight: 300;

        svg {
            transition: transform .3s ease;
            transform: rotate(180deg);
        }
    }

    &__list {
        margin-top: -4px;
        position: absolute;
        border: 1px solid #242424;
        background-color: $colorBackgroundGrey;
        border-top: none;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 12px 25px;
        gap: 20px;
        font-size: 20px;
        z-index: 5;
        opacity: 0;
        transition: opacity .3s ease-out;
    }

    &__item {
        cursor: pointer;
    }
}
</style>