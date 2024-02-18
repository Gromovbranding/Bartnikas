<script setup lang="ts">
withDefaults(
  defineProps<{
    isBgBlack: boolean;
  }>(),
  {
    isBgBlack: false
  }
)

const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    isLangSwitcherVisible.value = false
  }
)

const { locale, locales } = useI18n()

const switchLocalePath = useSwitchLocalePath()

const isLangSwitcherVisible = ref(false)
</script>

<template>
  <div :class="['lang', { 'lang--active': isLangSwitcherVisible }]">
    <div
      :class="['lang__bar', { 'lang__bar--open': isBgBlack }]"
      @click="isLangSwitcherVisible = !isLangSwitcherVisible"
    >
      <span v-if="isLangSwitcherVisible"><svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="14"
        viewBox="0 0 26 14"
        fill="none"
      >
        <path d="M1 13L13 2L25 13" stroke="white" stroke-width="2" />
      </svg>
      </span>
      <span v-else>{{ locale }}</span>
    </div>
    <div class="lang__container">
      <transition name="fade">
        <nav
          v-if="isLangSwitcherVisible"
          :class="['lang__nav', { 'lang__nav--open': isBgBlack }]"
        >
          <div>
            <ul class="lang__item-main">
              <li v-for="item in locales" :key="item.code">
                <NuxtLink :to="switchLocalePath(item.code)">
                  <IconLangSwitcher :icon="item.icon" />
                  {{ item.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </nav>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(-100%);
}

.lang__container {
  position: fixed;
  right: 192px;
  top: 85px;
  z-index: 10;
  width: 240px;
  border-radius: 12px;
  overflow: hidden;
}

.lang {
  &__bar {
    position: fixed;
    z-index: 10;
    right: 127px;
    top: 20px;
    height: 65px;
    width: 65px;
    text-align: center;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    background-color: #ffffff;
    transition: all 0.3s ease-in-out;
    padding-top: 25px;
    color: #000;
    text-transform: uppercase;

    font-family: "HelveticaNeue";
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    user-select: none;

    &:hover {
      background-color: #000;

      span {
        color: #fff;
      }

      &::before,
      &::after {
        color: #fff;
      }
    }

    &--open {
      background-color: #000;

      span {
        color: #fff;
      }

      &:hover {
        background-color: #fff;

        span {
          color: #000;
        }

        &::before,
        &::after {
          color: #000;
        }
      }
    }
  }

  &__nav {
    display: flex;
    justify-content: space-between;
    position: relative;
    background-color: #050404;
    border-radius: 12px;

    ul {
      display: flex;
      padding: 25px 30px 40px 30px;
      flex-direction: column;
      align-items: flex-start;
      gap: 26px;

      li a {
        color: #fff;
        font-family: "HelveticaNeue";
        font-size: 20px;
        font-style: normal;
        font-weight: 300;
        line-height: normal;
        cursor: default;
        transition: all 0.3s ease-in-out;
        user-select: none;
        display: flex;
        flex-direction: row;
        gap: 16px;

        &:hover {
          margin: 0 14px;
          color: #4288c1;
        }
      }
    }

    &--open {
      background-color: #fff;

      ul li:deep(a) {
        color: #000;
      }
    }
  }

  &--active {
    .lang__nav {
      li a {
        cursor: pointer;
      }
    }

    > .lang__bar {
      background-color: #000;
      padding: 24px 0 27px;

      &--open {
        background-color: #fff;

        svg path {
          stroke: #000;
        }
      }
    }
  }
}
</style>
