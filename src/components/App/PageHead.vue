<script lang="ts" setup>
interface Props {
  bgColor?: "grey" | "blue" | "white";
  sub?: string;
  onlyLogo?: boolean;
  title?: string;
  back?: boolean;
  number?: number | string;
}

withDefaults(defineProps<Props>(), {
  bgColor: "blue",
  onlyLogo: false,
  sub: "",
  title: "",
  back: false,
});

const router = useRouter();
const route = useRoute();

const handleBack = () => {
  if (window.history.length > 2) {
    router.back();
  } else {
    router.push("/");
  }
};

const onClickLogo = () => {
  if (route.path === "/") return;
  navigateTo("/");
};
</script>

<template>
  <header :class="['page-head', `page-head--${onlyLogo ? 'white' : bgColor}`]">
    <div class="page-head__logo" @click="onClickLogo">
      <IconLogo
        v-if="['grey', 'white'].includes(bgColor) || onlyLogo"
        is-only-author-black
      />
      <IconLogo v-else is-only-author-white />
    </div>
    <div v-if="back" class="page-head__back" @click="handleBack">
      <span> ← Back </span>
    </div>
    <ul v-if="!back && title" class="page-head__breadcrumb">
      <li>
        <NuxtLink to="/">Home</NuxtLink>
      </li>
      <li v-if="sub">
        <NuxtLink :to="`/${sub.toLowerCase()}`">{{ sub }}</NuxtLink>
      </li>
      <li>
        <span>
          {{ title }}
        </span>
      </li>
    </ul>
    <h1 v-if="!onlyLogo && title" class="page-head__caption">
      {{ title }}<sup>{{ number }}</sup>
    </h1>
  </header>
</template>

<style lang="scss" scoped>
.page-head {
  position: relative;
  padding: 20px 60px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: $borderRadiusMain;
  /* purgecss start ignore */
  &--blue {
    background-color: $colorAccentBlue;
  }

  &--white {
    background-color: #fff;
    & .page-head {
      &__caption {
        color: $colorTextDark;
      }

      &__breadcrumb {
        li {
          * {
            color: $colorTextDark;
          }

          &::after {
            content: "";
            color: $colorTextDark;
          }
        }
      }
    }
  }

  &--grey {
    background-color: $colorBackgroundGrey;
    & .page-head {
      &__caption {
        color: $colorTextDark;
      }

      &__breadcrumb {
        li {
          * {
            color: $colorTextDark;
          }

          &::after {
            content: "";
            color: $colorTextDark;
          }
        }
      }
    }
  }
  &__back {
    cursor: pointer;
    transition: transform 0.6s ease-out;

    > span {
      color: $colorAccentBlue;
      font-size: 36px;
      line-height: 1.55;
      font-weight: 400;
    }

    &:hover {
      transform: translateX(-25px);
    }
  }

  &__caption {
    font-size: 12.5rem;
    font-weight: bold;
    color: #fff;
    text-transform: uppercase;
    margin-left: -10px;
    letter-spacing: 0.21rem;
    line-height: 1em;
    sup {
      vertical-align: top;
      font-size: 29px;
      line-height: 45px;
    }
  }

  &__logo {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:deep(svg) {
      width: 475px;
      height: 100%;
    }
  }

  &__breadcrumb {
    display: flex;
    margin-bottom: 20px;
    margin-top: 100px;

    li {
      *,
      &::after {
        font-size: 1.25rem;
        letter-spacing: 0.07rem;
        font-weight: 400;
        color: #fff;
        text-transform: capitalize;
      }

      &:not(:last-child)::after {
        content: ">";
        padding: 0 6px;
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .page-head {
    &__caption {
      font-size: 9rem;
    }
  }
}

@media screen and (max-width: 550px) {
  .page-head {
    padding: 20px 28px;
    &__caption {
      font-size: 5rem;
    }
    &__logo {
      margin-top: 7px;
      height: 7.5vw;
      position: relative;
      right: 4%;
    }
    &__breadcrumb {
      margin-top: 40px;
    }
    &__back {
      margin-top: 40px;
      > span {
        font-size: 6vw;
      }

      &:hover {
      }
    }
  }
}
</style>
