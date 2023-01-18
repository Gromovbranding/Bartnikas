<script lang="ts" setup>
const route = useRoute();
const isMenuVisible = ref(false);

watch(
  () => route.path,
  () => {
    isMenuVisible.value = false;
  }
);
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
            <NuxtLink to="/projects"> PROJECTS </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/awards"> AWARDS <sup>>170</sup> </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about"> About </NuxtLink>
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
          <NuxtLink to="/cart" data-tooltip="3">
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
    transition: opacity 0.3s ease, transform 0.3s ease;
    transform: translateX(120%);
    padding: 40px;
    opacity: 0;
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
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          transition: background-color 0.3s ease-in-out;

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
        text-transform: uppercase;
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
            font-weight: 400;
            transition: opacity 0.3s ease;
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
      transform: translateX(0%);
      opacity: 1;
    }
  }
}
</style>
