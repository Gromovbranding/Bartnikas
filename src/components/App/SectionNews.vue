<template>
    <section class="news">
        <AppSectionHeader to="/media">
            News
        </AppSectionHeader>
        <div class="news__content">
            <AppInterios />
            <AppInterios />
        </div>
    </section>
</template>

<style lang="scss" scoped>
.news {
    padding: 80px 40px;

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