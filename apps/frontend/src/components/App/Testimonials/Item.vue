<script lang="ts" setup>
import type { ITestimonial, ITestimonialTranslate } from '~/types/admin-api'

const props = defineProps<{
  testimonial: ITestimonial;
}>()

const showVideo = ref(false)
const video = ref<HTMLVideoElement>()

const translated = reactive(
  useTranslateLanguage<ITestimonialTranslate>(
    props.testimonial.translate
  )
)

const isVideo = computed(() => {
  return props.testimonial.url || /.(mp4|m4p|m4v|mov|ogg|f4m|flv|webm|mpg)/.test(props.testimonial.file?.name ?? '')
})

function playVideo () {
  showVideo.value = true
  if (video.value) { video.value.play() }
}

function getYTLink (url: string) {
  const arr = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
  const videoId =
    arr[2] !== undefined ? arr[2].split(/[^0-9a-z_-]/i)[0] : arr[0]
  return `https://www.youtube.com/embed/${videoId}`
}
</script>

<template>
  <div class="testimonial">
    <div class="testimonial__img">
      <template v-if="isVideo">
        <iframe
          v-if="testimonial.url"
          :src="getYTLink(testimonial.url)"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        />
        <video
          v-else
          ref="video"
          :src="useGetFileByUrl(testimonial.file?.name)"
          preload="metadata"
          :controls="showVideo"
        />
        <div
          v-if="!showVideo && !testimonial.url"
          class="testimonial__play"
          @click="playVideo"
        >
          <IconPlay />
        </div>
      </template>
      <img v-else :src="useGetFileByUrl(testimonial.file?.name)">
    </div>
    <div class="testimonial__info">
      <h4>{{ translated?.title }}</h4>
      <span>{{ translated?.additional_info }}</span>
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
      img,
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
