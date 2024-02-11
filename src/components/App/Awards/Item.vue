<script setup lang="ts">
import type { IAwards, IAwardsTranslate } from "~/types/admin-api";

const props = defineProps<{
  award: IAwards;
}>();

const translate = useTranslateLanguage<IAwardsTranslate>(
  props.award.translate!
);
</script>

<template>
  <div class="awards__item">
    <a>
      <NuxtImg
        loading="lazy"
        :src="`/baseApiFiles/${award.awards_avatar.name}`"
      />
      <div>
        <h4>{{ translate?.title }}</h4>
      </div>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.awards__item {
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  > a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20vw;
    height: 20vw;
    margin-inline: auto;
    border-radius: 50%;
    border: none;
    background-color: #fff;
    position: relative;

    > div {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: max-content;
      width: 100%;
      top: calc(100% + 2em);
      opacity: 0;
      text-align: center;
      transition: opacity 0.3s ease-in-out, top 0.7s ease;

      h4 {
        font-size: 25px;
        line-height: 1.55;
        font-weight: bold;
      }

      p {
        font-size: 20px;
      }
    }

    &:hover {
      > img,
      picture {
        scale: 1.2;
        filter: grayscale(0);
      }

      > div {
        // bottom: -70px;
        top: 100%;
        opacity: 1;
      }
    }

    > img,
    picture {
      max-height: 80px;
      object-fit: contain;
      transition: scale 0.3s ease, filter 0.5s ease-in;
      filter: grayscale(1);
      width: 70%;
    }
  }
}

@media screen and (max-width: 1000px) {
  .awards__item {
    > a {
      width: 22rem;
      height: 22rem;
      > img,
      picture {
        filter: grayscale(0);
      }
      > div {
        bottom: -70px;
        opacity: 1;
        h4 {
          font-size: 1.7rem;
        }
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .awards__item {
    > a {
      width: 55vw;
      height: 55vw;
      margin: 0;
      > div {
        opacity: 1;
        h4 {
          font-size: 18px;
        }

        p {
          font-size: 14px;
        }
      }

      &:hover {
        > img,
        picture {
        }

        > div {
        }
      }

      > img,
      picture {
      }
    }
  }
}
</style>
