<template>
  <article class="video-collection">
    <div class="video-collection__img">
      <img
        src="https://static.tildacdn.com/tild3862-3835-4337-a633-633563333830/20210401_-_Art_0152.jpg"
        alt=""
      />
      <div class="video-collection__play">
        <IconPlay />
      </div>
    </div>
    <div class="video-collection__info">
      <h4>Art Russia fair 2021</h4>
      <time> 17.06.2002 </time>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.video-collection {
  &__img {
    width: 100%;
    position: relative;
    img {
      width: 100%;
      height: 20vw;
      object-fit: cover;
      border-radius: $borderRadiusMain;
    }
  }

  &__play {
    width: 36px;
    height: 36px;
    position: absolute;
    right: 30px;
    transition: transform 1s ease-in-out;
    bottom: 30px;

    &:hover {
      transform: scale(1.2);
    }
  }

  &__info {
    h4 {
      font-size: 32px;
      font-weight: 500;
      margin-bottom: 10px;
      margin-top: 25px;
    }

    time {
      color: #5c5c5c;
      font-size: 20px;
      font-weight: 400;
    }
  }
}
</style>
