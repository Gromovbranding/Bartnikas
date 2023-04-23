<template>
  <div class="awards__item">
    <a>
      <img
        src="https://static.tildacdn.com/tild3833-6331-4233-b866-383266663535/Natgeo.svg"
        alt=""
      />
      <div>
        <h4>Natgeo Photo Travel Contest</h4>
        <p>People’s choice Award</p>
      </div>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.awards__item {
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  > a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20vw;
    height: 20vw;
    border-radius: 50%;
    border: none;
    background-color: #fff;
    position: relative;

    > div {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: max-content;
      bottom: -30%;
      opacity: 0;
      text-align: center;
      transition: opacity 0.3s ease-in-out, bottom 0.7s ease;

      h4 {
        font-size: 25px;
        line-height: 1.55;
        font-weight: bold;
      }

      p {
        font-size: 20px;
      }
    }

    &:hover {
      > img {
        scale: 1.2;
        filter: grayscale(0);
      }

      > div {
        bottom: -70px;
        opacity: 1;
      }
    }

    > img {
      max-height: 80px;
      object-fit: contain;
      transition: scale 0.3s ease, filter 0.5s ease-in;
      filter: grayscale(1);
      width: 70%;
    }
  }
}

@media screen and (max-width: 549px) {
  .awards__item {
    > a {
      width: 55vw;
      height: 55vw;
      > div {
        opacity: 1;
        h4 {
          font-size: 18px;
        }

        p {
          font-size: 14px;
        }
      }

      &:hover {
        > img {
        }

        > div {
        }
      }

      > img {
      }
    }
  }
}
</style>
