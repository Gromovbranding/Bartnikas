<script lang="ts" setup>
interface Props {
  bgColor?: "grey" | "blue";
  title: string;
}

withDefaults(defineProps<Props>(), {
  bgColor: "blue",
});
</script>

<template>
  <header :class="['page-headline', `page-headline--${bgColor}`]">
    <div class="page-headline__logo">
      <img
        :src="
          bgColor === 'grey'
            ? 'https://static.tildacdn.com/tild6232-3135-4763-a338-393933393531/Logo_Micro_Full_Blue.svg'
            : 'https://static.tildacdn.com/tild6165-3965-4466-a564-663133393534/Logo_Micro_Mono_Whit.svg'
        "
      />
    </div>
    <ul class="page-headline__breadcrumb">
      <li>
        <NuxtLink to="/"> Home </NuxtLink>
      </li>
      <li>
        <span>
          {{ title }}
        </span>
      </li>
    </ul>
    <h1 class="page-headline__caption">
      {{ title }}
    </h1>
  </header>
</template>

<style lang="scss" scoped>
.page-headline {
  padding: 20px 70px 40px 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;

  &--blue {
    background-color: $colorAccentBlue;
  }

  &--grey {
    background-color: $colorBackgroundGrey;

    .page-headline {
      &__caption {
        color: $colorTextDark;
      }

      &__breadcrumb {
        li {
          > * {
            color: $colorTextDark;
          }

          &::after {
            color: $colorTextDark;
          }
        }
      }
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
    margin-bottom: 100px;

    img {
      width: 500px;
      height: 100%;
    }
  }

  &__breadcrumb {
    display: flex;
    margin-bottom: 20px;

    li {
      *,
      &::after {
        font-size: 1.1vw;
        letter-spacing: 3px;
        font-weight: 300;
        color: #fff;
      }

      &:last-child::first-letter {
        text-transform: uppercase;
      }

      &:not(:last-child)::after {
        content: ">";
        padding-right: 11px;
      }
    }
  }
}
</style>
