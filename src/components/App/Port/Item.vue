<script lang="ts" setup>
interface ProjectImageFile {
  id?: number;
  name?: string;
  url?: string;
}
interface ProjectImage {
  id?: number;
  name?: string;
  files?: ProjectImageFile[];
}
interface Project {
  id?: number;
  title?: string;
  desc?: string;
  project_images?: ProjectImage[];
}
interface Props {
  // bigImg: string;
  // smallImg: string;
  // title: string;
  // desciption: string;
  // photoCounter: number | string;
  direction?: "row" | "row-reverse";
  project: Project;
}

const props = withDefaults(defineProps<Props>(), {
  direction: "row",
});

const img1 = computed(() => {
  const url = props.project?.project_images[0]?.files[0].url;
  const defaultImg =
    "https://static.tildacdn.com/tild3938-6661-4930-b962-343337353537/IMGP9984_1.jpg";
  return url ?? defaultImg;
});

const img2 = computed(() => {
  const url = props.project?.project_images[1]?.files[0].url;
  const defaultImg =
    "https://static.tildacdn.com/tild3664-3366-4532-b637-363135333132/CF003255_1.jpg";
  return url ?? defaultImg;
});
</script>

<template>
  <div class="port" :class="{ reverse: direction === 'row-reverse' }">
    <div class="port__img">
      <div class="scale">
        <img :src="img1" alt="" />
      </div>
    </div>
    <div class="port__content">
      <div class="scale">
        <img :src="img2" alt="" />
      </div>
      <div class="port__text">
        <NuxtLink :to="`/projects/${project?.id}`">
          <div>
            <IconPhotoCamera />
            <p>{{ props.project?.project_images?.length || "" }}</p>
          </div>
          <h2>{{ project?.title }}</h2>
          <div class="port__text__desc">
            <p>{{ project?.desc }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.port {
  // display: flex;
  display: grid;
  grid-template-columns: 1fr 60%;
  grid-template-rows: auto auto;
  width: 100%;
  flex-direction: v-bind(direction);

  &__img {
    flex: 0 0 790px;
    padding: 3rem 2rem;

    > div {
      height: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    width: 100%;
    border-radius: 8px;
    .scale {
      margin: 2rem;
      max-height: 25rem;
    }

    img {
      width: 100%;
      height: 550px;
      // margin-bottom: -15px;
    }
  }

  &__text {
    border-radius: $borderRadiusMain;
    background-color: $colorBackgroundGrey;
    padding: 2rem;
    height: 27rem;
    display: flex;
    flex-direction: column;
    &__desc {
      margin-block: auto;
    }

    a {
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      width: 100%;
      flex-grow: 1;
    }

    small {
      font-size: 18px;
    }

    h2 {
      font-size: 2.6rem;
      font-weight: bold;
    }

    > a > div {
      p {
        font-size: 1.5rem;
        font-weight: 400;
        line-height: 1.5em;
        margin-top: auto;
      }
      &:first-child {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        gap: 10px;

        svg {
          width: 25px;
          height: 25px;
        }
      }

      &:last-child {
        // max-width: 900px;
        // margin-top: 95px;
      }
    }
  }
}

.reverse {
  grid-template-columns: 60% 1fr;
  .port__content {
    order: -1;
  }
}

.scale {
  // margin: 2rem;
}

@media screen and (max-width: 1000px) {
  .port {
    grid-template-columns: 1fr;
    &__content {
      .scale {
        margin: 4rem;
        max-height: 25rem;
        max-width: 70%;
        margin-inline: auto;
      }
    }
    &__text {
      padding: 4rem;
      height: 30rem;
    }
    &__img {
      display: none;
    }
  }
}

@media screen and (max-width: 550px) {
  .port {
    flex-direction: "row";
    height: unset;
    &__img {
      display: none;
    }
    &__content {
      img {
        object-fit: cover;
        height: 35rem;
      }
      .scale {
        max-height: initial;
      }
    }
    &__text {
      padding: 2rem 1rem 3rem;
      height: auto;
      h2 {
        font-size: 32px;
      }
      > a > div {
        &:first-child {
          margin-bottom: 20px;
          svg {
          }
          p {
            font-size: 28px;
          }
        }

        &:last-child {
          margin-top: 40px;
          p {
            word-break: break-word;
            font-size: 22px;
          }
        }
      }
    }
  }
}
</style>
