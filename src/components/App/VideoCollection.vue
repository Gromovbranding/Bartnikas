<template>
  <article class="video-collection">
    <div class="video-collection__img">
      <img
        src="https://static.tildacdn.com/tild3862-3835-4337-a633-633563333830/20210401_-_Art_0152.jpg"
        alt=""
      />
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
    img {
      width: 100%;
      height: 20vw;
      object-fit: cover;
      border-radius: 5px;
    }
  }

  &__info {
    h4 {
      font-size: 32px;
      font-weight: 500;
      margin-bottom: 10px;
      margin-top: 25px;
    }

    p {
      color: #5c5c5c;
      font-size: 20px;
    }
  }
}
</style>
