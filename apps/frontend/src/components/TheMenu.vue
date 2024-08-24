<script lang="ts" setup>
const { getActiveFooterContact, getActiveGeneralInfo } = usePublicData()

const route = useRoute()
const isMenuVisible = ref(false)

watch(
  () => route.path,
  () => {
    isMenuVisible.value = false
  }
)

const { data: contacts } = await useAsyncData(
  'generalInfoContacts',
  async () => await getActiveFooterContact()
)

const { data: emails } = await useAsyncData(
  'generalInfoEmailss',
  async () => await getActiveGeneralInfo()
)

const closeMenu = () => { isMenuVisible.value = false }
</script>

<template>
  <div :class="['menu', { 'menu--active': isMenuVisible }]">
    <AppLangSwitcher :is-bg-black="isMenuVisible" />
    <div class="menu__bar" @click="isMenuVisible = !isMenuVisible">
      <span />
    </div>
    <nav class="menu__nav">
      <div>
        <ul class="menu__item-main">
          <li>
            <NuxtLinkLocale to="/about" @click="closeMenu">
              {{ $t("titles.about") }}
              <IconPointer />
            </NuxtLinkLocale>
          </li>
          <li>
            <NuxtLinkLocale to="/projects" @click="closeMenu">
              {{ $t("titles.projects") }}
              <IconPointer />
            </NuxtLinkLocale>
          </li>
          <li>
            <NuxtLinkLocale to="/services" @click="closeMenu">
              {{ $t("titles.services") }}
              <IconPointer />
            </NuxtLinkLocale>
          </li>
        </ul>
        <ul class="menu__item-sub">
          <li>
            <NuxtLinkLocale to="/awards" @click="closeMenu">
              {{ $t("titles.awards") }} <sup>> 200</sup>
            </NuxtLinkLocale>
          </li>
          <li>
            <NuxtLinkLocale to="/media" @click="closeMenu">
              {{ $t("titles.media") }}
            </NuxtLinkLocale>
          </li>
          <li>
            <NuxtLinkLocale to="/video-collection" @click="closeMenu">
              {{ $t("titles.videoCollection") }}
            </NuxtLinkLocale>
          </li>
          <li>
            <NuxtLinkLocale to="/faq" @click="closeMenu">
              {{ $t("titles.faq") }}
            </NuxtLinkLocale>
          </li>
          <li>
            <NuxtLinkLocale to="/contacts" @click="closeMenu">
              {{ $t("titles.contacts") }}
            </NuxtLinkLocale>
          </li>
        </ul>
      </div>
      <div class="menu__additional-info">
        <div class="menu__cart">
          <!-- <NuxtLink :to="useLocalePath()('/cart')" :data-tooltip="cart.length">
            <IconCart />
          </NuxtLink> -->
        </div>

        <div class="menu__terms">
          <ul class="menu__terms-menu">
            <li>
              <NuxtLinkLocale to="/terms" @click="closeMenu">
                {{ $t("titles.termsConditions") }}
              </NuxtLinkLocale>
            </li>
            <li>
              <NuxtLinkLocale to="/blog" @click="closeMenu">
                {{ $t("titles.blog") }}
              </NuxtLinkLocale>
            </li>
          </ul>
        </div>

        <div class="menu__email">
          <a :href="`mailto:${emails?.email_press}`">
            {{ emails?.email_press }}
          </a>
        </div>
        <div class="menu__socials">
          <ul>
            <li v-for="link in contacts?.socials" :key="link.link">
              <a :href="link.link">
                <IconSocial :icon="link.icon.trim()" />
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
    gap: 30px;
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
    margin-bottom: 365px;

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
      width: auto;
      word-break: break-all;
      color: #fff;
      font-size: 2rem;
    }
  }

  &__terms-menu {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 70px;

    li {
      a {
        @include hoverLink();
        color: #fff;
        font-size: 25px;
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

      a {
        text-transform: uppercase;
        @include hoverLink();
        letter-spacing: 3px;
      }
    }

    &-main {
      margin-bottom: 1.5rem;
      gap: 1rem;

      li {
        a {
          font-size: 7.5vw;
          color: #fff;
          position: relative;

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
        }
      }
    }

    &-sub {
      gap: .4rem;
      li {
        a {
          color: #fff;
          font-size: 2.2vw;
          line-height: 1.5;

          sup {
            font-size: .5em;
            vertical-align: top;
            margin-left: -2%;
          }
        }
      }
    }
  }

  &__bar {
    position: fixed;
    z-index: 10;
    right: 50px;
    top: 20px;
    height: 65px;
    width: 65px;
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

    &__nav {
      flex-direction: column;
    }

    &__cart {
      display: none;
    }
  }
}

@media screen and (max-width: 550px) {
  .menu {
    &__nav {
      flex-direction: column;
      padding: 90px 16px 0;
    }

    &__cart {
      position: absolute;
      top: -7px;

      a {
        &::before {
          width: 28px;
          height: 28px;
          font-size: 14px;
          top: -9px;
        }
      }

      svg {
        width: 44px;
        height: 44px;
      }
    }

    &__additional-info {
      padding-right: 0;
      display: grid;
      grid-template-columns: 1fr;
    }

    &__email {
      a {
        font-size: 2.3rem;
      }
    }

    &__terms {
      &-menu {
        margin-bottom: 2rem;
        gap: 1rem;

        li {
          a {
            width: 100%;
            font-size: 1.9rem;
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
          }
        }
      }
    }

    &__item {

      &-main {
        li {
          a {
            font-size: 14vw;
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
    }
  }
}
</style>
