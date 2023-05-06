<script lang="ts" setup>
const { getCountAllAwards } = usePublicData();

const route = useRoute();
const isMenuVisible = ref(false);
const awardsCount = ref(Number(await getCountAllAwards()));

watch(
  () => route.path,
  () => {
    isMenuVisible.value = false;
  }
);
const cartCount = ref(0);

onMounted(() => getCartCount);

function getCartCount() {
  cartCount.value = JSON.parse(localStorage.getItem("cart") || "[]").length;
}
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
            <NuxtLink to="/projects">
              PROJECTS
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 37 40.3"
                style="enable-background: new 0 0 37 40.3"
                xml:space="preserve"
              >
                <path
                  class="st0"
                  d="M2,40.3c-1.1,0-2-0.9-2-2c0-0.7,0.4-1.3,1-1.7l28.1-16.4L1,3.7C0,3.2-0.3,2,0.3,1C0.8,0,2-0.3,3,0.3l34,19.9  L3,40C2.7,40.2,2.4,40.3,2,40.3z"
                />
              </svg>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/awards">
              AWARDS <sup v-if="awardsCount > 0">>{{ awardsCount }}</sup>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 37 40.3"
                style="enable-background: new 0 0 37 40.3"
                xml:space="preserve"
              >
                <path
                  class="st0"
                  d="M2,40.3c-1.1,0-2-0.9-2-2c0-0.7,0.4-1.3,1-1.7l28.1-16.4L1,3.7C0,3.2-0.3,2,0.3,1C0.8,0,2-0.3,3,0.3l34,19.9  L3,40C2.7,40.2,2.4,40.3,2,40.3z"
                />
              </svg>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about">
              About
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 37 40.3"
                style="enable-background: new 0 0 37 40.3"
                xml:space="preserve"
              >
                <path
                  class="st0"
                  d="M2,40.3c-1.1,0-2-0.9-2-2c0-0.7,0.4-1.3,1-1.7l28.1-16.4L1,3.7C0,3.2-0.3,2,0.3,1C0.8,0,2-0.3,3,0.3l34,19.9  L3,40C2.7,40.2,2.4,40.3,2,40.3z"
                />
              </svg>
            </NuxtLink>
          </li>
        </ul>
        <ul class="menu__item-sub">
          <li>
            <NuxtLink to="/media"> Media </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/video-collection"> VIDEO COLLECTION </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/payment"> PAYMENT/DELIVERY </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contacts"> CONTACTS </NuxtLink>
          </li>
        </ul>
      </div>
      <div class="menu__additional-info">
        <div class="menu__cart">
          <NuxtLink to="/cart" :data-tooltip="cartCount">
            <IconCart />
          </NuxtLink>
        </div>

        <div class="menu__terms">
          <ul class="menu__terms-menu">
            <li>
              <NuxtLink to="/terms"> Terms and Conditions </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog"> Blog </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/faq"> FAQ </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="menu__email">
          <a href="mailto:sb@stasbart.com"> sb@stasbart.com </a>
        </div>

        <div class="menu__socials">
          <ul>
            <li>
              <a href="javascript:void(0)">
                <IconSocial is-vk />
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <IconSocial is-facebook />
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <IconSocial is-telegram />
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
    transform: translateX(35px);
    color: $colorAccentBlue;
  }
}

.menu {
  &__nav {
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    background-color: #050404;
    height: 100vh;
    width: 100%;
    z-index: 9;
    transition: transform 900ms cubic-bezier(0.77, 0, 0.175, 1) 120ms;
    right: -100vw;
    padding: 40px;
    overflow: hidden;
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
        transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
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
      transition: fill 0.3s ease-in-out;
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

    > ul {
      display: flex;
      gap: 20px;

      li {
        a {
          display: block;

          > :deep(svg) {
            width: 64px;
            height: 64px;
            fill: #fff;
          }

          &:hover {
            > :deep(svg) {
              fill: $colorAccentBlue;
            }
          }
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
        text-transform: uppercase;
        @include hoverLink();
        letter-spacing: 3px;
        font-weight: bold;
      }
    }

    &-main {
      margin-bottom: 20px;

      li {
        a {
          font-size: 9vw;
          color: #fff;
          position: relative;
          font-weight: 900;

          svg {
            position: absolute;
            width: 64px;
            fill: $colorAccentBlue;
            left: -75px;
            top: 50%;
            transform: translateY(-50%);
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          &:hover {
            svg {
              opacity: 1;
            }
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
    right: 50px;
    top: 20px;
    height: 50px;
    width: 50px;
    text-align: center;
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
      transition: border-color 0.6s cubic-bezier(0.215, 0.61, 0.355, 1),
        transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    &::before {
      transform: translateY(-7px);
    }

    &::after {
      transform: translateY(7px);
    }
  }

  &--active {
    > .menu__bar {
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

    > .menu__nav {
      transform: translateX(-100vw);
    }
  }
}

@media screen and (min-width: 551px) and (max-width: 1000px) {
  .menu {
    &__additional-info {
      padding-right: 0;
      margin-top: 0;
    }
    &__cart {
      // position: absolute;
      // top: 0.5rem;
    }
  }
}

@media screen and (max-width: 550px) {
  .menu {
    &__nav {
      flex-direction: column;
      padding: 110px 16px 0;
    }

    &__cart {
      position: absolute;
      top: -7px;
      a {
        &::before {
          width: 28px;
          height: 28px;
          font-size: 14px;
          font-weight: bold;
          top: -9px;
        }

        &:hover {
          svg {
          }

          &::before {
          }
        }
      }

      svg {
        width: 44px;
        height: 44px;
      }
    }

    &__additional-info {
      display: grid;
      grid-template-columns: 170px auto;
    }

    &__email {
      grid-row: 3;
      a {
        font-size: 28px;
      }
    }
    &__terms {
      grid-row: 1/6;
      &-menu {
        margin-bottom: 25px;
        li {
          a {
            width: 100%;
            font-size: 24px;
            line-height: 1.1;
            word-break: break-word;
          }
        }
      }
    }

    &__socials {
      margin-top: 20px;
      grid-row: 4;
      > ul {
        gap: 14px;
        li {
          a {
            > :deep(svg) {
              width: 58px;
              height: 58px;
            }

            &:hover {
              > :deep(svg) {
              }
            }
          }
        }
      }
    }

    &__item {
      &-main {
        gap: 20px;
      }
      &-sub {
        gap: 10px;
      }

      &-main {
        li {
          a {
            font-size: 15vw;
            svg {
            }

            &:hover {
              svg {
              }
            }

            sup {
              font-size: 5vw;
              letter-spacing: 0;
              font-weight: 600;
            }
          }
        }
      }

      &-sub {
        li {
          a {
            font-size: 6vw;
            letter-spacing: 1px;
          }
        }
      }
    }

    &__bar {
      right: 16px;
      top: 16px;
      &:hover {
        &::before,
        &::after,
        span {
        }
      }

      &::before,
      &::after,
      span {
      }

      &::before {
      }

      &::after {
      }
    }

    &--active {
      > .menu__bar {
        &::before,
        &::after,
        span {
        }

        &::before {
        }

        span {
        }

        &::after {
        }
      }

      > .menu__nav {
      }
    }
  }
}
</style>
