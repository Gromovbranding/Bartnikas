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
</script>

<template>
  <article class="video-collection">
    <div class="video-collection__img">
      <video
        ref="video"
        :src="useGetFileByUrl(item.video.name)"
        :controls="showControls"
      />
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

    &__play {
      &:hover {
      }
    }

    &__info {
      h4 {
      }

      time {
        font-size: 18px;
      }
    }
  }
}
</style>
