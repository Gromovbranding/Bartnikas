<script lang="ts" setup>
const { type: typeScreen } = useBreakpoints();
const videoGreetingStyle = computed(() => {
  return {
    "flex-direction":
      typeScreen.value === "xs" ? "column-reverse" : "row-reverse",
  };
});
</script>

<template>
  <main>
    <Title> Biography </Title>
    <AppPageHead title="Biography" />

    <section class="biography-about">
      <div class="biography-about__img">
        <img
          src="https://static.tildacdn.com/tild3736-6333-4232-a135-373062363139/graninphoto_050.png"
          alt=""
        />
      </div>
      <div class="biography-about__text">
        <p>
          Artistic, compassionate, talented, these traits make Stanislav
          Bartnikas a brilliant aerial photographer. His internationally
          acclaimed portfolio speaks volumes about his capabilities. Based in
          Moscow, he began his career as a correspondent after graduating with a
          Journalism degree from Moscow State University. For a while, he worked
          with one of the leading newspapers in Moscow. Yet, when the Soviet
          Union collapsed, he decided to go solo. Initially, he pursued a career
          in sales and advertisement development for several businesses. During
          this time, he took some time out to master his photography skills. He
          used aerial photography to combine his interest in aviation with his
          wanderlust.
        </p>
        <small>
          Stanislav is convinced that mother nature is the most sophisticated
          painter and he sees it as his mission to capture its beauty in its
          perfect form and convey the energy of our planet through his images.
          He calls his style of photography "Aero-Art". his shots were published
          in magazines across Russia and Europe such as Sunday Times Travel
          Magazine, Maxim, GEO, Vanity Fair, Bild, View, L’officiel Voyage and
          were featured in National Geographic’s Photo Of The Day and Daily
          Dozen rubrics number of times. He also won multiple awards at the
          prestigious contests, such as Natgeo Photo Travel, IPA, TIFA, MIFA,
          PX3, Siena International Photo Awards. Currently he Is a contributor
          for @Natgeoyourshot. Some of his works are represented in London based
          Avivson Gallery. Some are part of privately owned collections.
        </small>
      </div>
    </section>

    <section class="testimonials">
      <div v-for="i in 2" :key="`item-${i}`" class="testimonials__item">
        <div class="testimonials__person">
          <div>
            <img
              src="https://static.tildacdn.com/tild6636-3061-4466-a238-353661613865/nussbaum-law-IOvsEAE.jpg"
              alt=""
            />
          </div>
          <div>
            <h3>Jeanne Modderman</h3>
            <p>National geographic photo producer</p>
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
              To me this isn’t only a photo, it’s a work of art. It’s painterly
              quality plus the graphic nature of the landscape takes this beyond
              the ordinary aerial. Yes, it’s right place right time, but it’s
              technically great because it’s absolutely sharp and crisp. Hope to
              see more of your photos!
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
    </section>
    <AppAwardsSection />
    <AppContentSpliter> STATEMENT </AppContentSpliter>
    <AppSectionVideoGreeting :style="videoGreetingStyle" />
  </main>
</template>

<style lang="scss" scoped>
.biography-about {
  display: flex;

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
      font-weight: 400;
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
  display: flex;
  gap: 100px;
  margin: 80px 0;
  padding: 0 40px;

  &__item {
    display: flex;
    flex-direction: column;
    gap: 50px;
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

@media screen and (max-width: 479px) {
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
        font-size: 5vw;
      }

      small {
        font-size: 4vw;
      }
    }
  }

  .testimonials {
    padding: 0 16px;
    flex-direction: column;
    gap: 180px;
    &__item {
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
