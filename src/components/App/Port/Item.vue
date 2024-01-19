<script lang="ts" setup>
import type { IProject } from "~/types/admin-api";

interface Props {
  direction?: "row" | "row-reverse";
  project: IProject;
}

const props = withDefaults(defineProps<Props>(), {
  direction: "row",
});

const portImages = computed(() => {
  const portImage = props.project.details.filter((item) => item.is_show_poster);

  if (props.project.details.length >= 2) {
    if (portImage.length === 0) {
      return [props.project.details[0], props.project.details[1]];
    } else if (portImage.length === 1) {
      return [
        portImage[0],
        props.project.details.find((item) => !item.is_show_poster)!,
      ];
    }

    return [portImage[0], portImage[1]];
  }

  if (props.project.details.length === 0) {
    return [];
  }

  return [props.project.details[0]];
});
</script>

<template>
  <div
    v-if="project.details.length >= 2"
    class="port"
    :class="{ reverse: direction === 'row-reverse' }"
  >
    <div v-if="portImages.length >= 1" class="port__img">
      <div class="scale">
        <NuxtImg
          loading="lazy"
          :src="`/baseApiFiles/${portImages[0].image.name}`"
        />
      </div>
    </div>
    <div class="port__content">
      <div v-if="portImages.length >= 2" class="scale">
        <NuxtImg
          loading="lazy"
          :src="`/baseApiFiles/${portImages[1].image.name}`"
        />
      </div>
      <div class="port__text">
        <NuxtLink :to="`/projects/${project?.id}`">
          <div>
            <IconPhotoCamera />
            <p>{{ project.details.length }}</p>
          </div>
          <div v-if="project.collab" class="port__text__collab">
            <span>{{ $t("port.collaboration") }}</span>
            <h2>{{ project.collab.collab_with }}</h2>
          </div>
          <h2 v-else>{{ project.group }}</h2>
          <div class="port__text__desc">
            <p v-html="project.description"></p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.port {
  display: grid;
  grid-template-columns: 1fr 60%;
  grid-template-rows: auto auto;
  width: 100%;
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
    border-radius: 8px;
    .scale {
      max-height: 25rem;
    }

    img,
    picture {
      width: 100%;
      // height: 550px;
      object-fit: cover;
      object-position: center;
    }
  }

  &__text {
    border-radius: $borderRadiusMain;
    background-color: $colorBackgroundGrey;
    padding: 2rem;
    height: 27rem;
    display: flex;
    flex-direction: column;
    &__collab {
      font-size: 1.3rem;
      span {
        margin-bottom: 0.5rem;
        display: block;
      }
    }
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
    }
  }
}

.reverse {
  grid-template-columns: 60% 1fr;
  .port__content {
    order: -1;
  }
}

@media screen and (max-width: 1000px) {
  .port {
    grid-template-columns: 1fr;
    &__content {
      .scale {
        max-height: 25rem;
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
      img,
      picture {
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
