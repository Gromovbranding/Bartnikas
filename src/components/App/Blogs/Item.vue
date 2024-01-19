<script lang="ts" setup>
import type { IBlog } from "~/types/admin-api";
const { makeDateCorrect } = useDateFormat();

defineProps<{
  blog: IBlog;
}>();
</script>

<template>
  <NuxtLink :to="useLocalePath()(`/blog/${blog.id}`)" class="interios">
    <div class="interios__img">
      <NuxtImg loading="lazy" :src="`/baseApiFiles/${blog.image?.name}`" />
    </div>
    <div class="interios__content">
      <div>
        <IconArrow is-arrow30-deg />
      </div>
      <div>
        <h3>{{ blog.title }}</h3>
        <p v-html="blog.description"></p>
        <span>{{ makeDateCorrect(blog.created_at) }}</span>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.interios {
  width: 100%;
  display: block;
  transition: transform 0.6s ease-in-out;

  &:hover {
    transform: translateY(-30px);
  }

  &__img {
    img,
    picture {
      width: 100%;
      height: 100%;
      max-height: 500px;
      object-fit: cover;
    }
  }

  &__content {
    display: flex;
    gap: 20px;
    margin-top: 20px;

    > div {
      &:first-child {
        svg {
          width: 60px;
          height: 40px;
        }
      }

      &:last-child {
        h3 {
          color: $colorTextDark;
          font-size: 2rem;
          font-weight: 600;
          line-height: 1.1;
        }

        p {
          font-size: 1.1rem;
          color: #000;
          margin-top: 1rem;
          line-height: 1.5;
          letter-spacing: 1px;
        }

        span {
          display: block;
          margin-top: 40px;
          color: $colorTextGrey;
          font-size: 0.8rem;
          font-weight: 400;
        }
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .interios {
    &__img {
      img,
      picture {
        min-height: 260px;
        max-height: 260px;
      }
    }

    &__content {
      gap: 10px;
      > div {
        &:first-child {
          svg {
            width: 24px;
            height: 24px;
          }
        }

        &:last-child {
          padding-right: 30px;
          h3 {
            font-size: 6vw;
            line-height: 1.3;
          }

          p {
            font-size: 4.5vw;
            letter-spacing: 0;
          }

          span {
            margin-top: 24px;
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
