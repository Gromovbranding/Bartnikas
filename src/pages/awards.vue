<script setup lang="ts">
import type { IAwards } from "~/types/admin-api";

const { getAllAwards } = usePublicData();

const { data: awards } = await useAsyncData<IAwards[]>(
  "awards",
  async () => await getAllAwards()
);
</script>

<template>
  <main>
    <Title> Awards </Title>
    <AppPageHead bg-color="grey" title="Awards" />
    <section class="awards">
      <div v-for="award in awards" :key="award.id" class="awards__item">
        <div class="awards__circle">
          <a href="#">
            <img
              :src="award.awards_avatar.url"
              :alt="award.awards_avatar.name"
            />
          </a>
        </div>
        <div class="awards__text">
          <div>
            <b>{{ award.title }}</b>
          </div>
          <div>
            <p>
              {{ award.description }}
            </p>
          </div>
        </div>
        <div class="awards__link">
          <div
            v-for="item in award.degress"
            :key="item.id"
            class="awards__list"
          >
            <div>
              <b>{{ new Date(item.year).getFullYear() }}</b>
            </div>
            <div
              v-for="(group, groupIdx) in item.groups"
              :key="`awards-group-item-${group.id}`"
            >
              <div>
                <div class="upper-slide">
                  <p>{{ groupIdx + 1 }} {{ group.type }}</p>
                </div>
              </div>
              <div>
                <div
                  v-for="(image, imageIdx) in group.images"
                  :key="`group-image-item-${image.name}`"
                  class="upper-slide"
                >
                  <small>
                    {{ imageIdx + 1 }} Photo
                    <IconArrow is-arrow30-deg />
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.awards {
  display: flex;
  flex-direction: column;
  gap: 200px;
  background-color: $colorBackgroundGreyDarken;
  padding: 80px 40px;

  &__item {
    background-color: $colorBackgroundGreyDarken;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__circle {
    background-color: #fff;
    width: 24vw;
    height: 24vw;
    border-radius: 50%;
    overflow: hidden;
    padding: 40px 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 17vw;
      height: 7vw;
      object-fit: contain;
      transition: filter 0.5s ease-in;
      filter: grayscale(1);
    }

    &:hover {
      img {
        filter: grayscale(0);
      }
    }
  }

  &__text {
    width: 20vw;
    b {
      font-size: 2.7vw;
      font-weight: bold;
      line-height: 1.3;
    }

    p {
      margin-top: 35px;
      font-size: 1.125vw;
      line-height: 1.8;
      text-align: left;
      font-weight: 400;
    }
  }

  &__list {
    width: 42vw;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #000;
    padding: 0vw 2vw 1.5vw 2vw;

    p {
      font-size: 2.2vw;
      font-weight: 400;
    }
    b {
      font-weight: 500;
    }
    svg {
      width: 1.25vw;
      height: 100%;
    }

    > div {
      &:first-child {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        b {
          font-size: 2vw;
        }
      }

      &:nth-child(2) {
        display: flex;
        flex-direction: column;
        gap: 1.4vw;
      }

      &:last-child {
        display: flex;
        align-items: flex-end;
        font-size: 2vw;
        gap: 2.5vw;
        font-weight: 400;
      }
    }
  }

  &__link {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
}

@media screen and (max-width: 550px) {
  .awards {
    padding: 80px 16px;
    &__item {
      flex-direction: column;
    }

    &__circle {
      position: relative;
      width: 90%;
      height: auto;
      aspect-ratio: 1 / 1;
      a {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      img {
        width: 80%;
        height: 80%;
      }

      &:hover {
        img {
        }
      }
    }

    &__text {
      width: 100%;
      margin-top: 40px;
      b {
        font-size: 9.4vw;
        font-weight: 800;
      }

      p {
        margin-top: 16px;
        font-size: 4.4vw;
        line-height: 1.6;
      }
    }

    &__list {
      width: 100%;
      padding: 0 0 6vw;
      p {
        font-size: 9vw;
      }

      svg {
        width: 4vw;
      }

      > div {
        &:first-child {
          justify-content: flex-start;
          padding-top: 6px;
          b {
            font-size: 6vw;
            font-weight: 800;
          }
        }

        &:nth-child(2) {
          gap: 5vw;
        }

        &:last-child {
          gap: 5vw;
          font-size: 7vw;
          margin-top: 14.5vw;
          flex-direction: column;
          justify-content: flex-end;
        }
      }
    }

    &__link {
      margin-top: 60px;
      width: 100%;
    }
  }
  .single {
    margin-top: 0 !important;
    margin-left: 9vw;
  }
}
</style>
