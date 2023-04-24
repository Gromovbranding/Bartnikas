<template>
  <main>
    <Title>Article</Title>
    <AppPageHead only-logo back />

    <article class="article">
      <div class="article__headline">
        <h1>How dystopias can save the world</h1>
        <time> 19.02.2022 </time>
      </div>
      <div class="article__img">
        <img
          src="https://static.tildacdn.com/tild3565-3534-4961-b036-643938396163/noroot.png"
          alt=""
        />
      </div>
      <div class="article__content">
        <p>
          The story of the future of our planet and species is one that is yet
          to be told for a few, the story is a warning of what is happening and
          what not to do. As a rule, we don’t know the future, but we do our
          best to make correct judgments. Most of us are aware of our impact on
          the future of our planet and us, but for some, we are more affected
          than effective. Stas x Obvious attempt to display that warning in a
          creative new way, which is now on exhibit at the Weinberg/Newton
          Gallery in Chicago, Illinois
        </p>
        <p>
          The BBC published a recent article in Culture, written by Diane Cole,
          informing the reader about the various interactive and
          sensory-immersive art currently on display at the Human/Nature exhibit
          in Chicago. The exhibition lures would-be bystanders to take a closer
          look and fills them with sensory perceptions that identify
          manufactured threats to our future and our planet. Doomsday is a look
          into that potential future, presented in the article as an "eerily
          beautify and devastatingly empty" addition to the collection that
          brings together Stas' photography with the AI-powered imagination of
          Obvious.
        </p>
      </div>
    </article>

    <AppMediaNextPrev />
  </main>
</template>

<style lang="scss" scoped>
.article {
  width: 100%;
  padding: 80px 40px;

  &__headline {
    display: flex;
    align-items: center;
    gap: 15px;
    justify-content: space-between;

    h1 {
      font-size: 40px;
      font-weight: bold;
    }

    time {
      color: #5c5c5c;
      font-size: 24px;
    }
  }

  &__img {
    margin-top: 25px;
    margin-bottom: 60px;
    img {
      width: 100%;
      border-radius: $borderRadiusMain;
      object-fit: cover;
      max-height: 700px;
    }
  }

  &__content {
    display: flex;
    padding: 0 90px;
    gap: 90px;
    p {
      flex: 1 1 50%;
      &:first-child {
        font-size: 28px;
        font-weight: 400;
        line-height: 1.6;
      }

      &:last-child {
        font-size: 23px;
        font-weight: 400;
        line-height: 1.5;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .article {
    padding: 4px 16px;
    &__headline {
      flex-direction: column;
      align-items: flex-start;
      padding: 0 12px;
      > h1 {
        font-size: 8vw;
        line-height: 1.3;
      }

      > time {
        font-size: 4.5vw;
      }
    }

    &__img {
      margin-bottom: 20px;
      img {
        max-height: 230px;
      }
    }

    &__content {
      flex-direction: column;
      padding: 0;
      gap: 30px;
      p {
        &:first-child {
          font-size: 5vw;
          line-height: 1.5;
        }

        &:last-child {
          font-size: 4.5vw;
        }
      }
    }
  }
}
</style>
