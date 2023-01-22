<template>
  <div class="media__cv">
    <div>
      <UIZoom>
        <img
          src="https://static.tildacdn.com/tild3864-3936-4330-a339-303239363033/image.png"
          alt=""
        />
      </UIZoom>
      <UIZoom>
        <img
          src="https://static.tildacdn.com/tild6636-3237-4636-b563-373263656561/image.png"
          alt=""
        />
      </UIZoom>
    </div>
    <UIButton> Download pdf </UIButton>
  </div>
</template>

<style lang="scss" scoped>
.media__cv {
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  > div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 15px;
    img {
      width: 100%;
      height: 100%;
      border-radius: $borderRadiusMain;
      object-fit: cover;
      max-height: 700px;
    }
  }
}
</style>
