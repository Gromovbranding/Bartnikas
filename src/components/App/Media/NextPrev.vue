<template>
  <section class="switching">
    <div class="switching__item">
      <span class="switching__sup">previous</span>
      <h3>How dystopias can save the world</h3>
    </div>
    <div class="switching__item">
      <span class="switching__sup">next</span>
      <h3>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur,
        vitae
      </h3>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.switching {
  display: flex;

  &__item {
    position: relative;
    background-color: $colorBackgroundGreyDarken;
    width: 50%;
    border-radius: $borderRadiusMain;
    padding: 80px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease-out;

    > h3 {
      max-width: 85%;
      line-height: 1.3;
      font-size: 36px;
      font-weight: bold;
      transition: color 0.3s ease-out;
    }

    &:hover {
      background-color: $colorAccentBlue;
      h3 {
        color: #fff;
      }
    }

    &:last-child {
      & .switching__sup {
        right: 15px;
      }
    }

    &:first-child {
      & .switching__sup {
        left: 15px;
      }
    }
  }

  &__sup {
    font-size: 28px;
    font-weight: 400;
    color: $colorTextGrey2;
    position: absolute;
    top: 20px;
    letter-spacing: 3.2px;
    text-transform: uppercase;
  }
}
</style>
