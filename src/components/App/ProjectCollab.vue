<script setup lang="ts">
import { IProjectCollab } from "~/types/admin-api";

defineProps<{
  collab: IProjectCollab;
}>();
</script>

<template>
  <div class="collab">
    <div class="collab__files">
      <div
        v-for="file in collab.press_release"
        :key="file.id"
        class="collab__files__item"
      >
        <div class="collab__files__item__img">
          <img
            src="https://static.tildacdn.com/tild3338-3231-4734-a332-626564636132/image.png"
            alt=""
          />
        </div>
        <div class="collab__files__item__info">
          <div class="collab__files__item__info__header">
            <h2>{{ file.title }}</h2>
            <UIButton :to="file.file.url" download>PDF</UIButton>
          </div>
          <p>
            {{ file.text }}
          </p>
        </div>
      </div>
    </div>
    <div class="collab__text">
      <div class="collab__text__title">{{ collab.title }}</div>
      <div class="collab__text__desc">{{ collab.description }}</div>
    </div>
    <div class="collab__with">
      <div class="collab__with__img">
        <img
          src="https://static.tildacdn.com/tild3131-3332-4239-a437-313465393561/header.jpg"
          alt=""
        />
      </div>
      <div class="collab__with__text">
        <h2>{{ collab.collab_with }}</h2>
        <p>{{ collab.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.collab {
  &__files {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 2rem;
    background-color: #1b61cb;
    &__item {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      &__img {
        border-radius: 10px;
        img {
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
    &__title {
      flex: 0 0 36rem;
    }
    &__desc {
      flex: 0 0 40rem;
    }
  }
  &__with {
    border-radius: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    &__img {
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    &__text {
      padding: 3rem;
      h2 {
        font-size: 3.6rem;
        font-weight: 700;
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
</style>
