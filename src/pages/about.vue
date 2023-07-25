<script lang="ts" setup>
import { IBio, IBioTestimonials } from "types/admin-api";

const { breakpoint } = useBreakpoints();
const scrollActive = ref(false);
const scrollStart = ref(0);
const scroll = ref<HTMLDivElement>();
const videoGreetingStyle = computed(() => {
  return {
    "flex-direction":
      breakpoint.value === "xs" ? "column-reverse" : "row-reverse",
  };
});

const { getBio, getBioTestimonials } = usePublicData();

const { data: bio } = useAsyncData<IBio>("bio", async () => await getBio());

useHeadSafe({
  title: "Biography",
  meta: [
    {
      name: "description",
      content: bio.value?.description ?? "",
    },
    {
      name: "robots",
      content: "index,follow",
    },
  ],
});

const { data: bioTestimonials } = useAsyncData<IBioTestimonials[]>(
  "bioTestimonials",
  async () => await getBioTestimonials()
);

function onPointerMove(e: PointerEvent) {
  if (!scrollActive.value || !scroll.value) return;
  scroll.value.scrollLeft -= e.movementX;
}

function onPointerDown(e: PointerEvent) {
  scrollActive.value = true;
  scrollStart.value = e.screenX;
}
</script>

<template>
  <main @pointerup="scrollActive = false">
    <AppPageHead title="Biography" />

    <section class="biography-about">
      <div class="biography-about__img">
        <img :src="bio?.awatar.url" alt="Bartnikas about" />
      </div>
      <div class="biography-about__text">
        <p>
          {{ bio?.sub_description }}
        </p>
        <small>
          {{ bio?.description }}
        </small>
      </div>
    </section>

    <section ref="scroll" class="testimonials">
      <div
        class="testimonials__wrapper"
        @pointerdown.prevent="onPointerDown"
        @pointermove="onPointerMove"
      >
        <div
          v-for="item in bioTestimonials"
          :key="item.id"
          class="testimonials__item"
        >
          <div class="testimonials__person">
            <div>
              <img :src="item.photo.url" alt="" />
            </div>
            <div>
              <h3>{{ item.name }}</h3>
              <p>{{ item.job }}</p>
            </div>
          </div>
          <div class="testimonials__text">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="m2.699 20c-.411 0-.699-.312-.699-.662 0-.249.145-.516.497-.703 1.788-.947 3.858-4.226 3.858-6.248-3.016.092-4.326-2.582-4.326-4.258 0-2.006 1.738-4.129 4.308-4.129 3.241 0 4.83 2.547 4.83 5.307 0 5.981-6.834 10.693-8.468 10.693zm10.833 0c-.41 0-.699-.312-.699-.662 0-.249.145-.516.497-.703 1.788-.947 3.858-4.226 3.858-6.248-3.015.092-4.326-2.582-4.326-4.258 0-2.006 1.739-4.129 4.308-4.129 3.241 0 4.83 2.547 4.83 5.307 0 5.981-6.833 10.693-8.468 10.693z"
                  fill-rule="nonzero"
                />
              </svg>
            </div>
            <div>
              <p>
                {{ item.testimonial }}
              </p>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="m2.699 20c-.411 0-.699-.312-.699-.662 0-.249.145-.516.497-.703 1.788-.947 3.858-4.226 3.858-6.248-3.016.092-4.326-2.582-4.326-4.258 0-2.006 1.738-4.129 4.308-4.129 3.241 0 4.83 2.547 4.83 5.307 0 5.981-6.834 10.693-8.468 10.693zm10.833 0c-.41 0-.699-.312-.699-.662 0-.249.145-.516.497-.703 1.788-.947 3.858-4.226 3.858-6.248-3.015.092-4.326-2.582-4.326-4.258 0-2.006 1.739-4.129 4.308-4.129 3.241 0 4.83 2.547 4.83 5.307 0 5.981-6.833 10.693-8.468 10.693z"
                  fill-rule="nonzero"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
    <AppAwardsSection />
    <AppContentSpliter> STATEMENT </AppContentSpliter>
    <AppSectionVideoGreeting :style="videoGreetingStyle" />
  </main>
</template>

<style lang="scss" scoped>
.biography-about {
  display: flex;
  align-items: flex-start;

  &__img {
    flex: 0 0 50%;

    img {
      border-radius: $borderRadiusMain;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 3vw;

    p {
      font-size: 1.5vw;
      line-height: 1.5;
      font-weight: 500;
    }

    small {
      color: $colorTextDark;
      font-size: 1.2vw;
      font-weight: 400;
      line-height: 1.5;
    }
  }
}

.testimonials {
  margin-block: 80px 0;
  padding: 0 40px 80px;
  overflow: hidden;
  &__wrapper {
    display: flex;
    gap: 100px;
    cursor: grab;
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 50px;
    flex: 0 0 40vw;
  }

  &__person {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    > div {
      &:first-child {
        width: 160px;
        height: 160px;

        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          border-radius: $borderRadiusMain;
        }
      }

      &:last-child {
        max-width: 380px;

        h3 {
          font-size: 34px;
          font-weight: bold;
        }

        p {
          line-height: 1.3;
          font-size: 28px;
        }
      }
    }
  }

  &__text {
    display: flex;
    gap: 40px;

    > div {
      &:first-child {
        svg {
          transform: rotate(180deg);
        }
      }

      &:nth-child(odd) {
        svg {
          fill: $colorAccentBlue;
          stroke: $colorAccentBlue;
          width: 42px;
        }
      }

      &:last-child {
        align-self: flex-end;
      }
    }

    p {
      font-size: 26px;
      line-height: 1.5;
    }
  }
}

@media screen and (min-width: 551px) and (max-width: 1000px) {
  .biography-about {
    &__text {
      p {
        font-size: 1.3rem;
      }
      small {
        font-size: 1.1rem;
      }
    }
  }
  .testimonials {
    &__person {
      > div {
        &:first-child {
          width: 7.22rem;
          height: 7.22rem;
        }

        &:last-child {
          max-width: 16rem;

          h3 {
            font-size: 1.52rem;
            font-weight: bold;
          }
          p {
            font-size: 1.3rem;
          }
        }
      }
    }
    &__text {
      p {
        line-height: 1.3;
        font-size: 1.2rem;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .biography-about {
    display: flex;
    flex-direction: column;
    gap: 14px;
    &__img {
      img {
      }
    }

    &__text {
      p {
        font-size: 4vw;
      }

      small {
        font-size: 3vw;
      }
    }
  }

  .testimonials {
    padding: 0 1rem 5rem;
    flex-direction: column;
    gap: 180px;
    &__item {
      flex-basis: 100%;
    }

    &__person {
      > div {
        &:first-child {
          width: fit-content;
          height: fit-content;
          img {
            width: 96px;
            height: 96px;
          }
        }

        &:last-child {
          h3 {
            font-size: 6vw;
          }

          p {
            font-size: 6vw;
            margin-top: 8px;
          }
        }
      }
    }

    &__text {
      gap: 16px;
      > div {
        &:first-child {
          svg {
          }
        }

        &:nth-child(odd) {
          svg {
            width: 32px;
          }
        }

        &:last-child {
        }
      }

      p {
        font-size: 5vw;
      }
    }
  }

  :deep(.video-greeting) {
    .video-greeting__text {
      margin-top: 40px;
    }
  }
}
</style>
