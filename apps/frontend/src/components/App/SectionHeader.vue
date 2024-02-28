<script lang="ts" setup>
interface Props {
  toCaption?: string;
  isLink?: boolean;
  to?: string;
  white?: boolean;
}

withDefaults(defineProps<Props>(), {
  toCaption: '',
  isLink: true,
  to: '/',
  white: false
})
</script>

<template>
  <div :class="['caption', { 'caption--white': white }]">
    <h2 v-scroll-scale-text>
      <slot />
      <span>
        {{ toCaption }}
      </span>
    </h2>
    <NuxtLinkLocale v-if="isLink" :to="to">
      {{ $t("sectionHeader.viewAll") }}
      <span>
        <slot />
      </span>
    </NuxtLinkLocale>
  </div>
</template>

<style lang="scss" scoped>
.caption {
  margin-bottom: 80px;

  h2 {
    font-size: 9rem;
    display: flex;
    text-transform: uppercase;
    font-weight: bold;
    line-height: 1em;
    overflow-wrap: break-word;
    word-break: break-word;

    span {
      font-size: 40px;
      line-height: 45px;
      font-weight: 400;
    }
  }

  &--white {
    h2 {
      color: #fff;
    }
  }

  a {
    display: block;
    color: $colorTextGrey;
    font-size: 32px;
    margin-top: 30px;
    font-weight: 400;

    span {
      color: $colorTextGrey;
      text-transform: lowercase;
    }
  }
}

@media screen and (max-width: 1000px) {
  .caption {
    h2 {
      font-size: 9rem;
    }
  }
}

@media screen and (max-width: 550px) {
  .caption {
    margin-bottom: 40px;

    h2 {
      font-size: 16vw;
      letter-spacing: 3px;
      span {
        // padding-top: 10px;
        font-size: 4.6vw;
        letter-spacing: 0;
        padding-left: 6px;
        // font-weight: 400;
      }
    }

    &--white {
      h2 {
      }
    }

    a {
      font-size: 20px;
      margin-top: 8px;
      span {
      }
    }
  }
}
</style>
