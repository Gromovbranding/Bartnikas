<script lang="ts" setup>
interface Props {
  bgColor?: "grey" | "blue" | "white";
  sub?: string;
  onlyLogo?: boolean;
  title?: string;
  back?: boolean;
}

withDefaults(defineProps<Props>(), {
  bgColor: "blue",
  onlyLogo: false,
  sub: "",
  title: "",
  back: false,
});

const router = useRouter();

const handleBack = () => {
  if (window.history.length > 2) {
    router.back();
  } else {
    router.push("/");
  }
};
</script>

<template>
  <header :class="['page-head', `page-head--${onlyLogo ? 'white' : bgColor}`]">
    <div class="page-head__logo">
      <IconLogo
        v-if="['grey', 'white'].includes(bgColor) || onlyLogo"
        is-only-author-black
      />
      <IconLogo v-else is-only-author-white />
    </div>
    <div v-if="back" class="page-head__back" @click="handleBack">
      <span> ← Back </span>
    </div>
    <template v-if="!onlyLogo">
      <ul class="page-head__breadcrumb">
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
      <h1 class="page-head__caption">
        {{ title }}
      </h1>
    </template>
  </header>
</template>

<style lang="scss" scoped>
.page-head {
  padding: 20px 40px;
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
    font-size: 13vw;
    font-weight: bold;
    color: #fff;
    text-transform: uppercase;
  }

  &__logo {
    display: flex;
    justify-content: center;
    align-items: center;

    &:deep(svg) {
      width: 500px;
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
        font-size: 20px;
        letter-spacing: 3px;
        font-weight: 400;
        color: #fff;
        text-transform: lowercase;
      }

      &::first-letter {
        text-transform: uppercase;
      }

      &:not(:last-child)::after {
        content: ">";
        padding: 0 12px;
      }
    }
  }
}
</style>
