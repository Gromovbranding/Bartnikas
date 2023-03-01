<script lang="ts" setup>
const config = useRuntimeConfig();
const news = ref([]);

const fetchNews = async () => {
  const { data } = await useFetch(`${config.apiBaseUrl}/news`);
  news.value = data.value;
};

Promise.allSettled([
  fetchNews(),
  //
]);

const hotNews = computed(() => {
  return news.value?.find((n: any) => n.is_hot);
});
</script>

<template>
  <main>
    <Title>Home</Title>
    <header class="header">
      <div class="header__main">
        <IconLogo is-full-black />
      </div>
      <div class="header__img-sticky">
        <img
          src="https://static.tildacdn.com/tild6231-3534-4137-a162-393461373730/DSCF4802.jpg"
          alt=""
        />
      </div>
    </header>
    <AppContentSpliter> CONCEPT </AppContentSpliter>
    <AppSectionVideoGreeting />
    <AppContentSpliter> PROJECTS </AppContentSpliter>
    <section class="projects">
      <AppPortItem />
      <AppPortItem direction="row-reverse" />
      <AppPortItem />
      <AppPortItem direction="row-reverse" />
    </section>
    <AppSectionHotNews v-if="hotNews" :news="hotNews" />
    <AppAwardsSection />
    <AppMediaSection v-if="news.length" :news="news" />
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
        <UIButton>View the project</UIButton>
      </div>
    </section>
    <AppVideoSection />
  </main>
</template>

<style lang="scss" scoped>
.home-info-project-paralax {
  height: 2500px;
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

      button {
        margin-top: 60px;
      }
    }
  }
}

.projects {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.header {
  &__main {
    width: 100%;
    height: 675px;
    display: flex;
    justify-content: center;
    align-content: center;

    position: absolute;
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
    position: relative;
    height: 175vh;
    z-index: -1;

    img {
      position: sticky;
      top: 0;
      width: 100%;
      height: 100vh;
    }
  }
}
</style>
