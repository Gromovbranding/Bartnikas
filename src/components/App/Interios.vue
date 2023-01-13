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
  transition: transform 0.6s ease-in-out;

  &:hover {
    transform: translateY(-30px);
  }

  &__img {
    img {
      width: 100%;
      height: 550px;
      object-fit: cover;
    }
  }

  &__content {
    display: flex;
    gap: 20px;
    margin-top: 30px;
    padding: 0 10px;

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
          font-size: 50px;
          font-weight: 700;
          line-height: 1.1;
        }

        p {
          font-size: 28px;
          color: #000;
          margin-top: 15px;
          line-height: 1.3;
          font-weight: 300;
          letter-spacing: 1px;
        }

        span {
          display: block;
          margin-top: 40px;
          color: $colorTextGrey;
          font-size: 20px;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
