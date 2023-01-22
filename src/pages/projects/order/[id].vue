<template>
  <main>
    <Title> Карта фото </Title>
    <AppPageHead only-logo title="Name Photo" sub="projects/1" />
    <section class="order">
      <div class="order__gallery">
        <img
          src="https://static.tildacdn.com/tild3537-3531-4564-b065-656465303135/wealth.png"
          alt=""
        />
        <div class="order__gallery-list">
          <img
            class="upper-slide"
            src="https://static.tildacdn.com/tild3537-3531-4564-b065-656465303135/wealth.png"
            alt=""
          />
          <img
            class="upper-slide"
            src="https://static.tildacdn.com/tild3537-3531-4564-b065-656465303135/wealth.png"
            alt=""
          />
          <img
            class="upper-slide"
            src="https://static.tildacdn.com/tild3537-3531-4564-b065-656465303135/wealth.png"
            alt=""
          />
        </div>
      </div>
      <div class="order__info">
        <h3>Name Photo</h3>
        <ul class="order__info-checklist">
          <li>
            <b>Preferred size:</b>
            <div>
              <small>
                All photos are delivered in two main proportions: 4:3 and 6:4
              </small>
              <UISelect
                :list="[
                  {
                    label: 'xPalienko',
                    value: 'xPalienko',
                  },
                  {
                    label: 'xPalienko2',
                    value: 'xPalienko2',
                  },
                  {
                    label: 'xPalienko3',
                    value: 'xPalienko3',
                  },
                ]"
              />
              <small> Individual sizes are available upon request. </small>
            </div>
          </li>
          <li>
            <b>Limited Edition:</b>
            <small>
              All photographs are printed in a limited edition of a maximum of
              several dozen copies, depending on the work and its size.
            </small>
          </li>
          <li>
            <b>Paper Print:</b>
            <small>
              Canson Infinity Platine Fibre Rag Satin fine art paper, 100%
              cotton
            </small>
          </li>
          <li>
            <b>Delivery:</b>
            <small> free worldwide (DHL Express) </small>
          </li>
        </ul>
        <div>
          <AppFormQuanity />
        </div>
        <div classs="order__info-colorlist">
          <b> Interior best collors: </b>
          <div>
            <ul class="order__info-colors">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
        <UIButton>ORDER</UIButton>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.order {
  display: flex;
  gap: 60px;
  padding: 0 40px;
  margin-bottom: 80px;
  height: 100%;

  &__gallery {
    flex: 1 1 60%;

    > img {
      width: 100%;
      height: 100%;
      max-height: 800px;
      object-fit: cover;
      border-radius: $borderRadiusMain;
    }

    &-list {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 20px;
      > img {
        max-width: 110px;
        max-height: 75px;
        border-radius: $borderRadiusMain + 12px;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  &__info {
    flex: 1 1 40%;

    b,
    small,
    p {
      font-size: 13px;
      font-weight: 400;
    }

    b {
      font-weight: bold;
    }

    > h3 {
      font-size: 36px;
      font-weight: bold;
      margin-bottom: 35px;
    }

    &-checklist {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 40px;

      :deep(.select) {
        margin: 15px 0;
      }
    }
  }
}
</style>
