<template>
    <div class="interios-order">
        <AppSectionHeader>
           IN INTERIORS
        </AppSectionHeader>
        <div class="interios-order__content">
            <div>
                <div class="interios-order__project-select">
                    <span>Project:</span>
                    <AppUISelect :list="[
                        {
                            label: 'xPalienko',
                            value: 'xPalienko',
                        },
                        {
                            label: 'xPalienko2',
                            value: 'xPalienko2',
                        },
                        {
                            label: 'xPalienko3',
                            value: 'xPalienko3',
                        }
                    ]" />
                </div>
                <div class="interios-order__project-name">
                    <h3>Name Photo</h3>
                </div>
                <div class="interios-order__project-colors">
                    <h4>Best Colors Of Interior:</h4>
                    <div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div class="interios-order__project-order">
                    <AppUIButton>
                        Order
                    </AppUIButton>
                </div>
            </div>
            <div>

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.interios-order {
    &__content {
        display: flex;
        gap: 30px;

        > div {
            &:first-child {
                .interios-order__project {
                    &-select {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }

                    &-name {
                        margin-top: 60px;
                        margin-bottom: 80px;
                    }

                    &-colors {
                        h4 {
                            margin-bottom: 10px;
                        }

                        > div {
                            display: flex;
                            flex-wrap: wrap;
                            gap: 15px;

                            > div {
                                background-color: transparent;
                                width: 55px;
                                height: 30px;
                                border-radius: 5px;

                                &:nth-child(1) {
                                    background-color: #1a1c28;

                                }

                                &:nth-child(2) {
                                    background-color: #353736;

                                }

                                &:nth-child(3) {
                                    background-color: #545c20;

                                }

                                &:nth-child(4) {
                                    background-color: #a66456;

                                }

                                &:nth-child(5) {
                                    background-color: #a49484;

                                }

                                &:nth-child(6) {
                                    background-color: #8a88a0;

                                }
                            }

                        }

                    }

                    &-order {
                        margin-top: 50px;
                    }
                }
            }

            &:last-child {
                
            }
        }
    }
}
</style>