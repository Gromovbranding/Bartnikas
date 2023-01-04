<script lang="ts" setup>
interface IItem {
    label: string
    value: string
}

interface Props {
    list: IItem[]
}

withDefaults(defineProps<Props>(), {
    list: () => ([])
})
</script>

<template>
    <div>
        {{ list }}
    </div>
</template>