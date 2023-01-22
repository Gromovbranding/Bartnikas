<template>
  <main>
    <Title> Article of blog </Title>
    <AppPageHead only-logo back />

    <article class="article">
      <div class="article__headline">
        <time> 19.02.2022 </time>
        <h1>
          Obvious x Stas Bartnikas: A Collaboration of Aerial Photography and
          Artificial Intelligence
        </h1>
      </div>
      <div class="article__img">
        <img
          src="https://static.tildacdn.com/tild6633-3138-4831-b566-343130343938/20210401_-_Art_0152.jpg"
          alt=""
        />
      </div>
      <div class="article__text">
        <p>
          The technological capabilities of artificial intelligence (AI) offer
          new touchstones for understanding and acting on climate change.
          <a href="#">OBVIOUS</a>, a collective of three artist friends in
          Paris, create art using AI. For the Human/Nature exhibition, they
          collaborated with aerial nature photographer
          <a href="#">Stas Bartnikas</a>, who has taken many thousands of aerial
          photographs of landscapes around the world, including of sensitive
          ecosystems, to create <a href="#">The DoomsdAI Clock</a>.
        </p>
        <p>
          Adapting the imagery of the Bulletin’s Doomsday Clock to convey
          "criticism and a message of hope" in addressing climate change, the
          piece is an evolving, evocative artwork displaying an AI-generated
          video within a frame of aluminum and wood. The time displayed on the
          clock coordinates with the official time announced by the Bulletin of
          Atomic Scientists.
        </p>
        <p>
          For The DoomsdAI Clock, OBVIOUS created an algorithm primarily using
          the landscapes of Iceland, along with photos of other remote places on
          Earth, to project a composite of landscape images in a process of
          rapid transformation. Just over 5,000 photos were required to produce
          an algorithm with high-definition results in 24 hours—a significant
          advance over what was possible a few years ago.
        </p>
        <p>
          Today, AI research, or machine learning with the universal Python
          programming language, is used to predict changes to the earth’s
          ecosystems as a consequence of climate change; and to devise ways to
          repair ecological damage, for example, to the barrier reefs, and to
          preserve the habitats of endangered species. Morphing images of
          landscapes in The DoomsdAI Clock, not representative of a particular
          place, but deeply evocative of Earth’s magical beauty, suggest unknown
          possibilities for imminent changes to the earth’s surface; and remind
          us that AI may reflect back to us something different, something more
          than human awareness is currently capable of perceiving or imagining.
          As <a href="#">Misho Ceko</a>, Harris COO who oversees art
          installations at the Keller Center, notes, "AI promises seemingly
          limitless potential for predicting environmental conditions and
          testing solutions to the climate crisis in ways that are safe and
          efficient, accurate and cost effective — they're not invasive or
          dangerous, nor constrained by time and physical resources. The AI work
          being done by OBVIOUS exemplifies the power and potential of art to
          convey complex scientific data to diverse public audiences—communities
          who urgently need to be educated and engaged in new ways about climate
          change."
        </p>
      </div>
    </article>

    <AppMediaNextPrev />
  </main>
</template>

<style lang="scss" scoped>
.article {
  display: grid;
  grid-template-columns: 40% 1fr;
  grid-gap: 50px 120px;
  padding: 80px 40px;

  &__headline {
    grid-column-start: 2;
    max-width: 770px;

    > h1 {
      margin-top: 30px;
      font-size: 40px;
      font-weight: bold;
      line-height: 1.4;
    }

    > time {
      color: $colorTextGrey2;
      font-size: 22px;
      font-weight: 400;
    }
  }

  &__img {
    grid-column-start: 1;
    border-radius: $borderRadiusMain;
    img {
      width: 100%;
      position: sticky;
      top: 50px;
      border-radius: $borderRadiusMain;
    }
  }

  &__text {
    max-width: 750px;
    grid-column-start: 2;
    > p {
      line-height: 1.45;
      font-weight: 400;
      font-size: 27px;
      &:first-child {
        margin-bottom: 100px;
      }
      &:not(:first-child) {
        margin-bottom: 40px;
      }
    }
  }
}
</style>
