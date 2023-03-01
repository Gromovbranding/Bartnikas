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
  project?: Project;
}

const props = withDefaults(defineProps<Props>(), {
  direction: "row",
  project: null,
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
  <div class="port">
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
          <div>
            <p>{{ project?.desc }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.port {
  display: flex;
  width: 100%;
  height: 1013px;
  flex-direction: v-bind(direction);

  &__img {
    flex: 0 0 790px;

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
    background-color: rgb(232, 232, 232);
    border-radius: 8px;

    img {
      width: 100%;
      height: 550px;
      margin-bottom: -15px;
    }
  }

  &__text {
    border-radius: $borderRadiusMain;
    background-color: $colorBackgroundGrey;
    padding-bottom: 90px;
    padding-left: 60px;
    padding-top: 40px;

    small {
      font-size: 18px;
    }

    h2 {
      font-size: 45px;
      font-weight: bold;
    }

    > a > div {
      &:first-child {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        gap: 10px;

        svg {
          width: 25px;
          height: 25px;
        }

        p {
          font-size: 35px;
          font-weight: 400;
        }
      }

      &:last-child {
        max-width: 900px;
        margin-top: 95px;

        p {
          font-size: 30px;
          line-height: 40px;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
