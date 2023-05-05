<script lang="ts" setup>
const { type: typeScreen } = useBreakpoints();

const headerMain = ref<HTMLDivElement>();
const defImgSize = typeScreen.value === "xs" ? 250 : 115;
const imgSize = ref(`${defImgSize}%`);

const onScroll = () => {
  const height = headerMain.value?.offsetHeight || 0;
  const res = (window.scrollY / height) * 15;
  if (res > 15) return;
  imgSize.value = `${defImgSize - res}%`;
};

const throttledListener = useThrottle(onScroll, 50);

onMounted(() => {
  window.addEventListener("scroll", throttledListener);
});

onUnmounted(() => {
  window.removeEventListener("scroll", throttledListener);
});
</script>

<template>
  <main>
    <Title>Home</Title>
    <header class="header">
      <div ref="headerMain" class="header__main">
        <IconLogo is-full-black />
      </div>
      <div class="header__img-sticky"></div>
    </header>
    <AppSectionHotNews />
    <AppContentSpliter> CONCEPT </AppContentSpliter>
    <AppSectionVideoGreeting class="app-video-greeting" />
    <AppContentSpliter> PROJECTS </AppContentSpliter>
    <AppAwardsSection />
    <AppNewsSection />
    <AppSectionInteriosOrderSlider />
    <section class="home-info-project-paralax">
      <div>
        <img
          src="https://static.tildacdn.com/tild3666-3463-4234-a233-633365653434/inner-strength.jpg"
          alt=""
        />
      </div>
      <div>
        <h3>Obvious &amp; StasBartnikas Collaboration</h3>
        <p>
          Stas and Obvious want to bring the beauty of nature together with the
          science and technology of AI. They demonstrate how the program
          develops natural looking images based on 1000s of aerial photographs
          of scenic Iceland.
        </p>
        <UIButton to="/projects">View the projects</UIButton>
      </div>
    </section>
    <AppVideoSection />
    <AppTestimonialsSection />
  </main>
</template>

<style lang="scss" scoped>
.home-info-project-paralax {
  height: 250vh;
  position: relative;
  border-radius: $borderRadiusMain;

  > div {
    &:first-child {
      position: sticky;
      top: 0;

      img {
        height: 100vh;
        width: 100%;
        object-fit: cover;
      }
    }

    &:last-child {
      position: absolute;
      bottom: 200px;
      padding: 80px 40px;
      max-width: 800px;
      left: 40px;
      border-radius: $borderRadiusMain;
      background-color: $colorBackgroundGrey;

      h3 {
        font-size: 85px;
        margin-bottom: 20px;
        font-weight: bold;
      }

      p {
        font-size: 24px;
        font-weight: 400;
        line-height: 1.7;
      }

      a {
        margin-top: 60px;
      }
    }
  }
}

.header {
  &__main {
    width: 100%;
    height: 675px;
    display: flex;
    justify-content: center;
    align-content: center;

    // position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    background-color: #fff;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    &:deep(svg) {
      max-width: 575px;
      width: 100%;
    }
  }

  &__img-sticky {
    position: sticky;
    bottom: -10px;
    height: calc(100vh + 20px);
    z-index: -1;
    background-image: url(@/assets/img/header_bg.jpg);
    transform: translateY(-10px);
    margin-bottom: -10px;
    background-repeat: no-repeat;
    background-size: v-bind(imgSize);
    background-position: bottom center;
    transition-duration: 200ms;

    // img {
    //   position: sticky;
    //   top: 0;
    //   width: 100%;
    //   height: 100vh;
    // }
  }
}

@media screen and (max-width: 1000px) {
  .header {
    &__main {
      height: calc(100vh + 10px);
      &:deep(svg) {
        max-width: 30rem;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .header {
    &__main {
      height: 50vh;
      &:deep(svg) {
        width: 88%;
      }
    }
    &__img-sticky {
      // height: 100vh;
    }
  }

  .app-video-greeting {
    margin-bottom: 80px;
  }

  .home-info-project-paralax {
    height: 2000px;

    > div {
      &:first-child {
        img {
        }
      }

      &:last-child {
        padding: 60px 16px;
        left: 16px;
        right: 16px;
        h3 {
          font-size: 50px;
          word-wrap: break-word;
          margin-bottom: 12px;
        }

        p {
          font-size: 20px;
          line-height: 1.6;
        }

        button {
          font-size: 32px;
        }
      }
    }
  }
}
</style>
