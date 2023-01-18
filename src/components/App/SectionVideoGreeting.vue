<template>
  <section class="video-greeting">
    <div class="video-greeting__video">
      <iframe
        src="https://www.youtube.com/embed/X8W-6RDHqxM"
        title="ТЕОРИЯ ВЕРОЯТНОСТЕЙ ДЛЯ ПРОГРАММИСТА"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <div class="video-greeting__text">
      <p>
        Sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.video-greeting {
  display: flex;
  height: 650px;

  &__video {
    width: 50%;

    video,
    img,
    iframe {
      height: 100%;
      width: 100%;
      border-radius: $borderRadiusMain;
    }
  }

  &__text {
    padding: 0 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;

    p {
      color: $colorTextDark;
      font-size: 30px;
      line-height: 1.55;
      word-break: normal;
      font-weight: 400;
    }
  }
}
</style>
