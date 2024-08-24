<script setup lang="ts">
import type {
  IVideoCollection,
  IVideoCollectionTranslate
} from '~/types/admin-api'

const video = ref<HTMLVideoElement>()
const activeVideo = ref(false)

const { makeDateCorrect } = useDateFormat()

const props = defineProps<{
  item: IVideoCollection;
}>()

const showControls = computed(() => (activeVideo.value ? true : undefined))

const translate = reactive(useTranslateLanguage<IVideoCollectionTranslate>(
  props.item.translate
))

function playVideo () {
  if (!video.value) { return }
  video.value.play()
  activeVideo.value = true
}

const copyIcon = ref(false)

function copyVideoLink () {
  navigator.clipboard.writeText(useGetFileByUrl(props.item.video.name) + '#t=0.1')
  showCheckMark()
}

function showCheckMark () {
  copyIcon.value = true
  setTimeout(() => (copyIcon.value = false), 3000)
}
</script>

<template>
  <article class="video-collection">
    <div class="video-collection__img">
      <div v-if="activeVideo" class="video-collection__copy-link" @click="copyVideoLink">
        <IconCopy v-if="copyIcon" :title="'Link copied'" />
        <IconLink v-else :title="'Copy link'" />
      </div>
      <video
        ref="video"
        :controls="showControls"
        preload="metadata"
        playsinline
      >
        <source
          :src="useGetFileByUrl(item.video.name) + '#t=0.1'"
          type="video/mp4"
        >
      </video>
      <div
        v-if="!activeVideo"
        class="video-collection__play"
        @click="playVideo"
      >
        <IconPlay />
      </div>
    </div>
    <div class="video-collection__info">
      <h4>{{ translate?.title }}</h4>
      <time>{{ makeDateCorrect(item.created_at) }}</time>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.video-collection {
  &__img {
    width: 100%;
    position: relative;
    video {
      width: 100%;
      height: 20vw;
      object-fit: cover;
      border-radius: $borderRadiusMain;
    }
  }

  &__copy-link {
    color: #fff;
    position: absolute;
    top: 0;
    right: 0;
    background: linear-gradient(rgba(0,0,0, .3), rgba(0,0,0, .3));
    border-radius: 0 10px;
    padding: 3px;
    cursor: pointer;
    z-index: 1;

    svg {
      width: 30px;
      height: 30px;
    }
  }

  &__play {
    width: 36px;
    height: 36px;
    position: absolute;
    right: 30px;
    transition: transform 0.2s ease-in-out;
    bottom: 30px;

    &:hover {
      transform: scale(1.2);
    }
  }

  &__info {
    h4 {
      font-size: 32px;
      font-weight: 400;
      margin-bottom: 10px;
      margin-top: 25px;
    }

    time {
      color: #5c5c5c;
      font-size: 20px;
      font-weight: 400;
    }
  }
}

@media screen and (min-width: 551px) and (max-width: 1000px) {
  .video-collection {
    &__img {
      video {
        height: auto;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .video-collection {
    &__img {
      video {
        height: 260px;
      }
    }

    &__info {
      time {
        font-size: 18px;
      }
    }
  }
}
</style>
