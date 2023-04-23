<template>
  <section class="video-greeting">
    <div class="video-greeting__video">
      <img
        src="https://static.tildacdn.com/tild3732-3239-4133-a563-343830613365/noroot.png"
        alt=""
      />
      <div class="video-greeting__play">
        <IconPlay />
      </div>
    </div>
    <div class="video-greeting__text">
      <p>
        <slot
          >Sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.</slot
        >
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
    position: relative;
    cursor: pointer;

    video,
    img,
    iframe {
      height: 100%;
      width: 100%;
      border-radius: $borderRadiusMain;
      object-fit: cover;
    }
  }

  &__play {
    width: 48px;
    height: 48px;
    position: absolute;
    right: 80px;
    transition: transform 0.4s ease-in-out;
    animation-fill-mode: forwards;
    bottom: 60px;

    &:hover {
      transform: scale(1.2);
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
      font-size: 1.5rem;
      line-height: 1.55;
      word-break: normal;
      font-weight: 500;
    }
  }
}

@media screen and (max-width: 549px) {
  .video-greeting {
    flex-direction: column;
    gap: 20px;
    height: fit-content;
    &__video {
      width: 100%;
      video,
      img,
      iframe {
      }
    }

    &__play {
      &:hover {
      }
    }

    &__text {
      width: 100%;
      padding: 0px 16px;
      p {
        font-size: 22px;
      }
    }
  }
}
</style>
