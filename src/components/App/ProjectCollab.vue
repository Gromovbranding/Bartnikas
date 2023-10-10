<script setup lang="ts">
import { IProjectCollab } from "~/types/admin-api";

defineProps<{
  collab: IProjectCollab;
}>();

const video = ref<HTMLVideoElement>();
const activeVideo = ref(false);

const showControls = computed(() => (activeVideo.value ? true : undefined));

function playVideo() {
  if (!video.value) return;
  video.value.play();
  activeVideo.value = true;
}
</script>

<template>
  <div class="collab">
    <div class="collab__files">
      <div
        v-for="press_release in collab.press_release"
        :key="press_release.id"
        class="collab__files__item"
      >
        <div class="collab__files__item__img">
          <object
            :data="useGetFileByUrl(press_release.file.name)"
            type="application/pdf"
            showcontrols="false"
            width="100%"
            height="500px"
          >
            <p>Unable to display PDF file. Download instead.</p>
          </object>
        </div>
        <div class="collab__files__item__info">
          <div class="collab__files__item__info__header">
            <h2>{{ press_release.title }}</h2>
            <UIButton :to="useGetFileByUrl(press_release.file.name)" download
              >PDF</UIButton
            >
          </div>
          <p>
            {{ press_release.text }}
          </p>
        </div>
      </div>
    </div>
    <div class="collab__text">
      <div class="collab__text__title">{{ collab.title }}</div>
      <div class="collab__text__desc" v-html="collab.description"></div>
    </div>
    <div class="collab__with">
      <h2>HOW IT WORKS</h2>
      <div class="collab-wrapper">
        <div class="collab__with__img">
          <video
            ref="video"
            :src="useGetFileByUrl(collab.video.name)"
            :controls="showControls"
          ></video>
          <div
            v-if="!activeVideo"
            class="collab__with__img__play"
            @click="playVideo"
          >
            <IconPlay />
          </div>
        </div>
        <div class="collab__with__text">
          <h3>{{ collab.collab_with }}</h3>
          <p v-html="collab.description"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.collab {
  object {
    width: 24rem;
    height: 31rem;
    outline: none;
    object-fit: cover;
  }
  &__files {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 55px;
    padding: 2rem;
    background-color: #1b61cb;
    &__item {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      &__img {
        border-radius: 10px;
        embed {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      }
      &__info {
        &__header {
          background-color: #eceae8;
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          h2 {
            font-size: 1.66rem;
            font-weight: 600;
          }
          a {
            padding: 1rem 2rem;
            font-size: 1.25rem;
            &:hover {
              transform: translateY(-0.5em);
            }
          }
        }
        p {
          color: #fff;
          font-size: 1.44rem;
          margin-top: 1rem;
        }
      }
    }
  }
  &__text {
    background-color: #1b61cb;
    border-radius: 10px;
    color: #fff;
    font-size: 1.22rem;
    display: flex;
    padding: 4rem;
    gap: 2rem;
    line-height: 1.25em;
    display: grid;
    grid-template-columns: 9fr 10fr;
  }
  &__with {
    border-radius: 10px;
    background-color: #eceae8;
    .collab-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    > h2 {
      font-size: 11rem;
      font-weight: bold;
      padding: 2rem;
    }
    &__img {
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      video {
        display: block;
        width: 100%;
        object-fit: cover;
        &:fullscreen {
          object-fit: contain;
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
    }
    &__text {
      padding: 3rem;
      h3 {
        font-size: 3.6rem;
        font-weight: 500;
        margin-bottom: 1rem;
      }
      p {
        margin: 0;
        font-size: 1.6rem;
        line-height: 1.25;
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .collab {
    object {
      width: 100%;
      height: 40rem;
    }
    &__files {
      &__item {
        grid-template-columns: 1fr;
        grid-auto-rows: auto;
      }
    }
    &__text {
      grid-template-columns: 1fr;
      grid-auto-rows: auto;
      padding: 2rem;
    }
    &__with {
      h2 {
        font-size: 8rem;
      }
      .collab-wrapper {
        grid-template-columns: 1fr;
        grid-auto-rows: auto;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .collab {
    object {
      height: 45rem;
    }
    &__files {
      grid-template-columns: 1fr;
      grid-auto-rows: auto;
    }
  }
}
</style>
