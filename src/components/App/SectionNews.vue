<template>
    <div class="news">
        <AppSectionHeader>
          News
        </AppSectionHeader>
        <div class="news__content">
            <AppInterios />
            <AppInterios />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.news {
    padding: 0 50px;
    &__content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 40px;

        &:deep(.interios) {
            width: calc(50% - 40px);
        }
    }
}
</style>