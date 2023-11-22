<script setup lang="ts">
import type { IAwards } from "~/types/admin-api";

const showModal = ref(false);
const { getAllAwards, getCountAllAwards } = usePublicData();

const { data: awards } = await useAsyncData<IAwards[]>(
  "awards",
  async () => await getAllAwards()
);

const { data: awardsCount } = await useAsyncData<number>(
  "awardsCount",
  async () => await getCountAllAwards()
);

useHeadSafe({
  title: "Awards",
  meta: [
    {
      name: "description",
      content: "My Awards",
    },
    {
      name: "robots",
      content: "index,follow",
    },
  ],
});

const activeImg = ref();

function showImg(name: string) {
  activeImg.value = useGetFileByUrl(name);
  showModal.value = true;
}
</script>

<template>
  <main>
    <AppPageHead bg-color="grey" title="Awards" :number="`>${awardsCount}`" />
    <section class="awards">
      <div v-for="award in awards" :key="award.id" class="awards__item">
        <div class="awards__circle">
          <a href="#">
            <NuxtImg
              loading="lazy"
              :src="`/baseApiFiles/${award.awards_avatar.name}`"
            />
          </a>
        </div>
        <div class="awards__text">
          <div>
            <b>{{ award.title }}</b>
          </div>
          <div>
            <p v-html="award.description"></p>
          </div>
        </div>
        <div class="awards__photo">
          <div
            v-for="item in award.degress
              .sort((a, b) => +b.year - +a.year)
              .slice(0, 2)"
            :key="item.id"
            class="awards__photo__item"
          >
            <div class="year">{{ item.year }}</div>
            <div class="groups">
              <div
                v-for="group in item.groups"
                :key="`group-${group.id}`"
                class="groups__item"
              >
                <template v-if="group.images.length > 1">
                  <div>{{ `${item.groups.length} ${group.type}:` }}</div>
                  <div
                    v-for="(img, idx) in group.images.slice(0, 2)"
                    :key="`img-${img.id}`"
                    class="slide"
                    @click="showImg(img.name)"
                  >
                    {{ `${idx + 1} Photo` }}<IconArrow is-arrow30-deg />
                  </div>
                </template>
                <template v-else>
                  <div
                    v-for="img in group.images"
                    :key="`img-${img.id}`"
                    class="slide"
                    @click="showImg(img.name)"
                  >
                    1 {{ group.type }} <IconArrow is-arrow30-deg />
                  </div>
                </template>
              </div>
            </div>
          </div>

          <div v-if="award.degress.length > 3">
            <h2>And {{ award.degress.length }} awards more</h2>
          </div>
        </div>
      </div>
    </section>
    <div v-if="showModal" class="dialog">
      <NuxtImg loading="lazy" :src="activeImg" />
      <button type="button" @click="showModal = false">
        <svg
          role="presentation"
          class="t-popup__close-icon"
          width="23px"
          height="23px"
          viewBox="0 0 23 23"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" stroke-width="1" fill="#fff" fill-rule="evenodd">
            <rect
              transform="translate(11.313708, 11.313708) rotate(-45.000000) translate(-11.313708, -11.313708) "
              x="10.3137085"
              y="-3.6862915"
              width="2"
              height="30"
            ></rect>
            <rect
              transform="translate(11.313708, 11.313708) rotate(-315.000000) translate(-11.313708, -11.313708) "
              x="10.3137085"
              y="-3.6862915"
              width="2"
              height="30"
            ></rect>
          </g>
        </svg>
      </button>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.awards__photo {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .slide {
    position: relative;
    transition-duration: 200ms;
    cursor: pointer;
    &:hover {
      transform: translateY(-25%);
    }
  }
  svg {
    width: 0.7em;
  }
  &__item {
    display: grid;
    grid-template-columns: min-content 1fr;
    align-items: flex-end;
    gap: 2rem;
    font-size: 2rem;
    border-bottom: 1px solid #000;
    padding: 1rem;
    white-space: nowrap;
    .year {
      font-weight: 700;
    }
  }
  .groups {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    &__item {
      display: flex;
      gap: 1rem;
    }
  }
}
.dialog {
  background: none;
  border: none;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  img,
  picture {
    display: block;
    max-width: 80%;
  }
  button {
    background: none;
    border: none;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
}
.awards {
  display: flex;
  flex-direction: column;
  gap: 10rem;
  background-color: $colorBackgroundGreyDarken;
  padding: 80px 40px;

  &__awards-more-title {
    text-align: right;
    h2 {
      font-size: 28px;
    }
  }

  &__item {
    background-color: $colorBackgroundGreyDarken;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5rem;
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
    flex-shrink: 0;
    a {
      cursor: default;
    }

    img,
    picture {
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
    justify-content: flex-start;

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

@media screen and (max-width: 1000px) {
  .awards {
    &__circle {
      img,
      picture {
        filter: grayscale(0);
      }
    }
    &__item {
      gap: 1rem;
    }
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
      img,
      picture {
        width: 80%;
        height: 80%;
      }

      &:hover {
        img,
        picture {
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
  .awards__photo {
    width: 100%;
  }
}
</style>
