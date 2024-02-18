<script setup lang="ts">
import type {
  IGreetingIndex,
  IGreetingIndexTranslate
} from '~/types/admin-api'

const { getActiveGreetingIndex } = usePublicData()

const { data: greeting } = await useAsyncData<IGreetingIndex>(
  'greetingIndex',
  async () => await getActiveGreetingIndex()
)

const translate = useTranslateLanguage<IGreetingIndexTranslate>(
  greeting.value!.translate
)

const showVideo = ref(false)
const video = ref<HTMLVideoElement>()

function playVideo () {
  showVideo.value = true
  if (video.value) { video.value.play() }
}
</script>

<template>
  <section v-if="greeting" class="video-greeting">
    <div class="video-greeting__video">
      <video
        ref="video"
        :src="useGetFileByUrl(greeting?.video?.name)"
        :poster="useGetFileByUrl(greeting?.poster?.name)"
        preload="metadata"
        :controls="showVideo"
      />
      <div v-if="!showVideo" class="video-greeting__play" @click="playVideo">
        <IconPlay />
      </div>
    </div>
    <div class="video-greeting__text">
      <p>
        {{ translate?.text }}
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.video-greeting {
  display: flex;
  // height: 650px;

  &__video {
    width: 50%;
    position: relative;
    cursor: pointer;

    video,
    img,
    picture,
    iframe {
      height: 100%;
      width: 100%;
      border-radius: $borderRadiusMain;
      object-fit: cover;
    }
  }

  &__play {
    width: 48px;
    height: 48px;
    position: absolute;
    right: 80px;
    transition: transform 0.4s ease-in-out;
    animation-fill-mode: forwards;
    bottom: 60px;

    &:hover {
      transform: scale(1.2);
    }
  }

  &__text {
    padding: 0 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;

    p {
      color: $colorTextDark;
      font-size: 1.5rem;
      line-height: 1.55;
      word-break: normal;
      font-weight: 400;
    }
  }
}

@media screen and (min-width: 551px) and (max-width: 1000px) {
  .video-greeting {
    flex-direction: column;
    &__video {
      width: 100%;
    }
    &__text {
      width: 100%;
      padding: 2.5rem;
      padding-bottom: 5rem;
      p {
        font-size: 1.4rem;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .video-greeting {
    flex-direction: column;
    gap: 20px;
    height: fit-content;
    &__video {
      width: 100%;
      video,
      picture,
      img,
      iframe {
      }
    }

    &__play {
      &:hover {
      }
    }

    &__text {
      width: 100%;
      padding: 0px 16px;
      p {
        font-size: 22px;
      }
    }
  }
}
</style>
