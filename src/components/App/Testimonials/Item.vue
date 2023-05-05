<script lang="ts" setup>
import { IFile } from "~/types/admin-api";

interface Props {
  img?: string;
  name?: string;
  profession?: string;
  file?: IFile;
}

withDefaults(defineProps<Props>(), {
  img: "",
  name: "",
  profession: "",
});

const showVideo = ref(false);
</script>

<template>
  <div class="testimonial">
    <div class="testimonial__img">
      <video
        v-if="showVideo"
        :src="file.url"
        preload="metadata"
        autoplay="false"
        controls
      ></video>
      <img
        v-else
        :src="
          img ||
          'https://static.tildacdn.com/tild3333-6466-4162-b835-313361366137/noroot.png'
        "
        alt=""
      />
      <div
        v-if="!showVideo"
        class="testimonial__play"
        @click="showVideo = true"
      >
        <IconPlay />
      </div>
    </div>
    <div class="testimonial__info">
      <h4>{{ name }}</h4>
      <span>{{ profession }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.testimonial {
  width: 23.4rem;
  &__img {
    width: 100%;
    position: relative;
    img,
    video {
      width: 100%;
      height: 34vw;
      object-fit: cover;
      border-radius: $borderRadiusMain;
    }
  }

  &__play {
    width: 36px;
    height: 36px;
    position: absolute;
    right: 30px;
    transition: transform 0.2s ease-in-out;
    bottom: 30px;
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 14px 141px 20px 30px;
    > h4 {
      font-size: 30px;
      font-weight: 600;
      line-height: 1.3;
    }
    > span {
      font-size: 22px;
    }
  }
}

@media screen and (max-width: 1000px) {
  .testimonial {
    &__img {
      width: 29rem;
      img {
        height: 44rem;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .testimonial {
    &__img {
      width: 25rem;
      img {
        height: 38.89rem;
      }
    }
  }
}
</style>
