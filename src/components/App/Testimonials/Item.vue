<script lang="ts" setup>
import type { ITestimonial } from "~/types/admin-api";

defineProps<{
  testimonial: ITestimonial;
}>();

const showVideo = ref(false);
const video = ref<HTMLVideoElement>();

function playVideo() {
  showVideo.value = true;
  if (video.value) video.value.play();
}

function getYTLink(url: string) {
  const arr = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  const videoId =
    arr[2] !== undefined ? arr[2].split(/[^0-9a-z_-]/i)[0] : arr[0];
  return `https://www.youtube.com/embed/${videoId}`;
}
</script>

<template>
  <div class="testimonial">
    <div class="testimonial__img">
      <iframe
        v-if="testimonial.url"
        :src="getYTLink(testimonial.url)"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <video
        v-else
        ref="video"
        :src="useGetFileByUrl(testimonial.file?.name)"
        preload="metadata"
        :controls="showVideo"
      ></video>
      <div
        v-if="!showVideo && !testimonial.url"
        class="testimonial__play"
        @click="playVideo"
      >
        <IconPlay />
      </div>
    </div>
    <div class="testimonial__info">
      <h4>{{ testimonial.title }}</h4>
      <span>{{ testimonial.additional_info }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.testimonial {
  width: 23.4rem;
  flex-shrink: 0;
  &__img {
    width: 100%;
    position: relative;
    border-radius: $borderRadiusMain;
    overflow: hidden;
    img,
    iframe,
    picture,
    video {
      width: 100%;
      height: 34vw;
      object-fit: cover;
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
    padding: 1rem 8rem 1.5rem 2rem;
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
    width: 29rem;
    &__img {
      width: 100%;
      video,
      iframe {
        height: 44rem;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .testimonial {
    &__img {
      width: 25rem;
      img,
      picture {
        height: 38.89rem;
      }
    }
  }
}
</style>
