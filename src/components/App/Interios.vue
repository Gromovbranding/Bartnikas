<template>
  <a class="interios">
    <div class="interios__img">
      <img
        src="https://static.tildacdn.com/tild3332-3036-4664-a462-353037666335/0651.jpg"
        alt=""
      />
    </div>
    <div class="interios__content">
      <div>
        <img
          src="https://static.tildacdn.com/tild3165-3535-4565-a164-303232636632/blaclarrow.svg"
          alt=""
        />
      </div>
      <div>
        <h3>Capturing the power of the earth</h3>
        <p>
          Welcome to Art Russia Fair presents, Stas Bartnikas X Obvious: Aerial
          Art Meets AI. This behind the scenes look presents features from our
          latest exhibit of the crossroads between Art and AI.
        </p>
        <span>17.06.2022</span>
      </div>
    </div>
  </a>
</template>

<style lang="scss" scoped>
.interios {
  width: 100%;
  display: block;

  &__img {
    img {
      width: 100%;
      height: 500px;
      object-fit: cover;
    }
  }

  &__content {
    display: flex;
    gap: 20px;
    margin-top: 30px;
    padding: 0 40px;


    > div {
      &:first-child {
        img {
            margin-top: 18px;
            width: 60px;
            height: 40px;
        }
      }

      &:last-child {
        h3 {
          color: $colorTextDark;
          font-size: 80px;
          font-weight: 600;
          line-height: 1.1;
        }
        p {
          font-size: 36px;
          color: #000;
          margin-top: 20px;
          line-height: 1.3;
          font-weight: normal;
        }
        span {
            display: block;
          margin-top: 60px;
          color: $colorTextGrey;
          font-size: 26px;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
