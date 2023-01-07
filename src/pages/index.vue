<template>
  <Title>
    Главная
  </Title>
  <header class="header">
    <div class="header__main">
      <img src="https://static.tildacdn.com/tild3936-3864-4236-a165-333964376561/Logo_Main_Full_Blue_.svg" alt="" />
    </div>
    <div class="header__img-sticky">
      <img src="https://static.tildacdn.com/tild6231-3534-4137-a162-393461373730/DSCF4802.jpg" alt="" />
    </div>
  </header>
  <AppSectionSplitHeader> CONCEPT </AppSectionSplitHeader>
  <AppSectionVideoGreeting />
  <AppSectionSplitHeader> PROJECTS </AppSectionSplitHeader>
  <AppSectionPort />
  <AppSectionPort direction="row-reverse" />
  <AppSectionPort />
  <AppSectionPort direction="row-reverse" />
  <AppSectionAwards />
  <AppSectionNews />
  <AppSectionInteriosOrderSlider />
  <section class="home-info-project-paralax">
    <div>
      <img src="https://static.tildacdn.com/tild3666-3463-4234-a233-633365653434/inner-strength.jpg" alt="">
    </div>
    <div>
      <h3>Obvious
        &amp; StasBartnikas Collaboration
      </h3>
      <p>
        Stas and Obvious want to bring the beauty of nature together with the science and technology of AI.
        They demonstrate how the program develops natural looking images based on 1000s of aerial photographs of
        scenic Iceland.
      </p>
      <UIButton>View the project</UIButton>
    </div>
  </section>
  <AppSectionVideoCollection />
</template>

<style lang="scss" scoped>
.home-info-project-paralax {
  height: 2500px;
  position: relative;
  border-radius: 5px;

  >div {
    &:first-child {
      position: sticky;
      top: 0;

      img {
        height: 100vh;
        width: 100%;
      }
    }

    &:last-child {
      position: absolute;
      bottom: 200px;
      padding: 40px;
      max-width: 800px;
      left: 40px;
      border-radius: 5px;
      background-color: $colorBackgroundGrey;

      h3 {
        font-size: 85px;
        margin-bottom: 20px;
        font-weight: bold;
      }

      p {
        font-size: 24px;
        font-weight: 300;
        line-height: 1.7;
      }

      button {
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

    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    background-color: #fff;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    img {
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
