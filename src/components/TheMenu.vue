<script lang="ts" setup>
const isMenuVisible = ref(false)
</script>


<template>
    <div :class="['menu', { 'menu--active': isMenuVisible }]">
        <div class="menu__bar" @click="isMenuVisible = !isMenuVisible">
            <span></span>
        </div>
        <nav class="menu__nav">
            <div>
                <ul class="menu__item-main">
                    <li>
                        <a href="javascript:void(0)">
                            PROJECTS
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">
                            AWARDS <sup>>170</sup>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">
                            ABOUT
                        </a>
                    </li>
                </ul>
                <ul class="menu__item-sub">
                    <li>
                        <a href="javascript:void(0)">
                            MEDIA
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">
                            VIDEO COLLECTION
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">
                            PAYMENT/DELIVERY
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)">
                            CONTACTS
                        </a>
                    </li>
                </ul>
            </div>
            <div class="menu__additional-info">
                <div class="menu__cart">
                    <a href="javascript:void(0)" data-tooltip="3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path
                                d="M19.029 13h2.971l-.266 1h-2.992l.287-1zm.863-3h2.812l.296-1h-2.821l-.287 1zm-.576 2h4.387l.297-1h-4.396l-.288 1zm2.684-9l-.743 2h-1.929l-3.474 12h-11.239l-4.615-11h14.812l-.564 2h-11.24l2.938 7h8.428l3.432-12h4.194zm-14.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm5.9-7-.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z" />
                        </svg>
                    </a>
                </div>

                <div class="menu__terms">
                    <ul class="menu__terms-menu">
                        <li>
                            <a href="javascript:void(0)">
                                Terms and Conditions
                            </a>
                        </li>

                        <li>
                            <a href="javascript:void(0)">
                                Blog
                            </a>
                        </li>

                        <li>
                            <a href="javascript:void(0)">
                                FAQ
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="menu__email">
                    <a href="mailto:sb@stasbart.com">
                        sb@stasbart.com
                    </a>
                </div>

                <div class="menu__socials">
                    <ul>
                        <li>
                            <a href="javascript:void(0)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path class="st0"
                                        d="M13.162 18.994c.609 0 .858-.406.851-.915-.031-1.917.714-2.949 2.059-1.604 1.488 1.488 1.796 2.519 3.603 2.519h3.2c.808 0 1.126-.26 1.126-.668 0-.863-1.421-2.386-2.625-3.504-1.686-1.565-1.765-1.602-.313-3.486 1.801-2.339 4.157-5.336 2.073-5.336h-3.981c-.772 0-.828.435-1.103 1.083-.995 2.347-2.886 5.387-3.604 4.922-.751-.485-.407-2.406-.35-5.261.015-.754.011-1.271-1.141-1.539-.629-.145-1.241-.205-1.809-.205-2.273 0-3.841.953-2.95 1.119 1.571.293 1.42 3.692 1.054 5.16-.638 2.556-3.036-2.024-4.035-4.305-.241-.548-.315-.974-1.175-.974h-3.255c-.492 0-.787.16-.787.516 0 .602 2.96 6.72 5.786 9.77 2.756 2.975 5.48 2.708 7.376 2.708z" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path
                                        d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    xmlns:serif="http://www.serif.com/" version="1.1" xml:space="preserve"
                                    style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.1421;">
                                    <path id="telegram-1"
                                        d="M18.384,22.779c0.322,0.228 0.737,0.285 1.107,0.145c0.37,-0.141 0.642,-0.457 0.724,-0.84c0.869,-4.084 2.977,-14.421 3.768,-18.136c0.06,-0.28 -0.04,-0.571 -0.26,-0.758c-0.22,-0.187 -0.525,-0.241 -0.797,-0.14c-4.193,1.552 -17.106,6.397 -22.384,8.35c-0.335,0.124 -0.553,0.446 -0.542,0.799c0.012,0.354 0.25,0.661 0.593,0.764c2.367,0.708 5.474,1.693 5.474,1.693c0,0 1.452,4.385 2.209,6.615c0.095,0.28 0.314,0.5 0.603,0.576c0.288,0.075 0.596,-0.004 0.811,-0.207c1.216,-1.148 3.096,-2.923 3.096,-2.923c0,0 3.572,2.619 5.598,4.062Zm-11.01,-8.677l1.679,5.538l0.373,-3.507c0,0 6.487,-5.851 10.185,-9.186c0.108,-0.098 0.123,-0.262 0.033,-0.377c-0.089,-0.115 -0.253,-0.142 -0.376,-0.064c-4.286,2.737 -11.894,7.596 -11.894,7.596Z" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    </div>
</template>

<style lang="scss" scoped>
@mixin hoverLink {
    font-weight: bold;
    transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
    display: block;

    &:hover {
        transform: translateX(15px);
        color: $colorAccentBlue;
    }
}

.menu {
    &__nav {
        display: flex;
        justify-content: space-between;
        position: fixed;
        left: 0;
        top: 0;
        background-color: #050404;
        height: 100vh;
        width: 100%;
        z-index: 9;
        transition: transform .3s ease;
        transform: translateX(120%);
        padding: 40px;
    }

    &__cart {
        margin-top: 40px;
        margin-bottom: 220px;

        a {
            display: block;
            width: max-content;
            position: relative;

            &::before {
                content: attr(data-tooltip);
                position: absolute;
                right: -15px;
                top: -15px;
                background-color: #fff;
                width: 42px;
                height: 42px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                font-size: 20px;
                color: #000;
                transition: background-color .3s ease-in-out, color .3s ease-in-out;
            }

            &:hover {
                svg {
                    fill: $colorAccentBlue;
                }

                &::before {
                    background-color: $colorAccentBlue;
                    color: #fff;
                }
            }
        }

        svg {
            width: 60px;
            height: 60px;
            fill: #fff;
            transition: fill .3s ease-in-out;
        }
    }

    &__additional-info {
        padding-right: 80px;
    }

    &__email {
        a {
            @include hoverLink();
            color: #fff;
            font-size: 40px;
            font-weight: bold;
        }
    }

    &__terms-menu {
        display: flex;
        flex-direction: column;
        gap: 25px;
        margin-bottom: 70px;

        li {
            a {
                @include hoverLink();
                color: #fff;
                font-size: 25px;
                font-weight: bold;
            }
        }
    }

    &__socials {
        margin-top: 40px;

        >ul {
            display: flex;
            gap: 20px;

            li {

                a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #fff;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    transition: background-color .3s ease-in-out;

                    &:hover {
                        background-color: $colorAccentBlue;
                    }
                }

                svg {
                    width: 24px;
                    height: 24px;
                }
            }
        }
    }

    &__item {

        &-main,
        &-sub {
            display: flex;
            flex-direction: column;
            gap: 20px;

            a {
                @include hoverLink();
                letter-spacing: 3px;
            }
        }

        &-main {
            margin-bottom: 20px;

            li {
                a {
                    font-size: 9vw;
                    color: #fff;
                    position: relative;
                    font-weight: bold;

                    &::before {
                        content: ">";
                        position: absolute;
                        left: -65px;
                        opacity: 0;
                        font-size: 5.5vw;
                        font-weight: 300;
                        transition: opacity .3s ease;
                        top: 50%;
                        transform: translateY(-65%);
                    }

                    &:hover::before {
                        opacity: 1;
                    }

                    sup {
                        font-size: 2vw;
                        vertical-align: top;
                        margin-left: -5%;
                    }
                }
            }
        }

        &-sub {
            li {
                a {
                    color: #fff;
                    font-size: 2.2vw;
                    line-height: 1.5;
                }
            }
        }

    }

    &__bar {
        position: fixed;
        z-index: 10;
        right: 40px;
        top: 20px;
        height: 60px;
        width: 60px;
        text-align: center;
        line-height: 60px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        background-color: #fff;
        transition: all 0.3s ease-in-out;

        &:hover {
            background-color: #000;

            &::before,
            &::after,
            span {
                border-color: #fff;
            }
        }

        &::before,
        &::after,
        span {
            content: "";
            position: absolute;
            top: calc(50% - 1px);
            left: 30%;
            width: 40%;
            border-color: #000;
            border-bottom: 2px solid;
            transition: border-color .6s cubic-bezier(0.215, 0.61, 0.355, 1), transform .6s cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        &::before {
            transform: translateY(-7px);
        }

        &::after {
            transform: translateY(7px);
        }
    }


    &--active {
        >.menu__bar {
            background-color: #000;

            &::before,
            &::after,
            span {
                border-color: #fff;
            }

            &::before {
                transform: rotate(45deg);
            }

            span {
                transform: scaleX(0);
            }

            &::after {
                transform: rotate(-45deg);
            }
        }

        >.menu__nav {
            transform: translateX(0%);
        }
    }
}
</style>