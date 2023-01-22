<template>
  <section class="hot-news">
    <AppSectionHeader :is-link="false" white> HOT NEWS </AppSectionHeader>
    <UIMarquee>
      — 20.12.2022 — New York — Exhibition — 20.12.2022 — New York — Exhibition
    </UIMarquee>
    <NuxtLink to="/media/1" class="upper-slide hot-news__content">
      <img
        src="https://static.tildacdn.com/tild3265-3966-4861-a261-363662366562/20210401_-_Art_0152.jpg"
        alt=""
      />
      <div>
        <IconArrow is-arrow30-deg />
      </div>
    </NuxtLink>
  </section>
</template>

<style lang="scss" scoped>
.hot-news {
  margin-top: 40px;
  padding: 80px 40px;
  background: $colorAccentBlue;

  &__content {
    display: block;
    width: 100%;
    margin-top: 120px;
    position: relative;
    img {
      width: 100%;
      max-height: 100vh;
      object-fit: cover;
      border-radius: $borderRadiusMain;
    }
    > div {
      position: absolute;
      top: 15px;
      right: 15px;

      &:deep(svg) {
        width: 128px;
        height: 128px;
        fill: #fff;
      }
    }
  }
}
</style>
