<script lang="ts" setup>
import { ITestimonial } from "~/types/admin-api";

defineProps<{
  testimonial: ITestimonial;
}>();

const showVideo = ref(false);
const video = ref<HTMLVideoElement>();

function playVideo() {
  showVideo.value = true;
  if (video.value) video.value.play();
}
</script>

<template>
  <div class="testimonial">
    <div class="testimonial__img">
      <video
        ref="video"
        :src="testimonial.file.url"
        preload="metadata"
        :controls="showVideo"
      ></video>
      <div v-if="!showVideo" class="testimonial__play" @click="playVideo">
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
