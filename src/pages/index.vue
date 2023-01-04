<template>
  <div>
    <header class="header">
      <div class="header__main">
        <img
          src="https://static.tildacdn.com/tild3936-3864-4236-a165-333964376561/Logo_Main_Full_Blue_.svg"
          alt=""
        />
      </div>
      <div class="header__img-sticky">
        <img
          src="https://static.tildacdn.com/tild6231-3534-4137-a162-393461373730/DSCF4802.jpg"
          alt=""
        />
      </div>
    </header>
    <AppSectionSplitHeader> CONCEPT </AppSectionSplitHeader>
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
    <AppSectionSplitHeader> PROJECTS </AppSectionSplitHeader>
    <AppSectionPort />
    <AppSectionPort direction="row-reverse"/>
    <AppSectionPort />
    <AppSectionPort direction="row-reverse"/>
    <AppSectionAwards />
    <AppSectionNews />
  </div>
</template>

<style lang="scss" scoped>
.header {
  &__main {
    width: 100%;
    height: 500px;
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
      max-width: 435px;
      width: 100%;
    }
  }

  &__img-sticky {
    position: relative;
    height: 132vh;
    z-index: -1;

    img {
      position: sticky;
      top: 0;
      width: 100%;
      height: 100vh;
    }
  }
}


.video-greeting {
    display: flex;
    height: 650px;

    &__video {
        width: 50%;
        video, img, iframe {
            height: 100%;
            width: 100%;
            border-radius: 5px;
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
            font-weight: 300;
        }
    }
}
</style>
