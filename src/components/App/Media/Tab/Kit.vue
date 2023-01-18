<template>
  <div class="media__kit">
    <img
      src="https://static.tildacdn.com/tild6665-3339-4764-b437-343037353337/image.png"
      alt=""
    />
    <UIButton> Download pdf </UIButton>
  </div>
</template>

<style lang="scss" scoped>
.media__kit {
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  img {
    width: 100%;
    border-radius: $borderRadiusMain;
    object-fit: cover;
  }
}
</style>
