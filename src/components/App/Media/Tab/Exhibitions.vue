<template>
  <div class="grid">
    <div class="media__exhibitions">
      <img
        src="https://static.tildacdn.com/tild6133-6562-4635-b264-326461313736/forFB.jpg"
        alt=""
      />
      <div>
        <h3>PrintSwap exhibitions</h3>
        <p>
          Collective show august 2019 <br />
          Collective show, oct 2020 <br />
          Personal exhibition 2021 <br />
        </p>
      </div>
    </div>
    <div class="media__exhibitions">
      <img
        src="https://static.tildacdn.com/tild6133-6562-4635-b264-326461313736/forFB.jpg"
        alt=""
      />
      <div>
        <h3>PrintSwap exhibitions</h3>
        <p>
          Collective show august 2019 <br />
          Collective show, oct 2020 <br />
          Personal exhibition 2021 <br />
        </p>
      </div>
    </div>
    <div class="media__exhibitions">
      <img
        src="https://static.tildacdn.com/tild6133-6562-4635-b264-326461313736/forFB.jpg"
        alt=""
      />
      <div>
        <h3>PrintSwap exhibitions</h3>
        <p>
          Collective show august 2019 <br />
          Collective show, oct 2020 <br />
          Personal exhibition 2021 <br />
        </p>
      </div>
    </div>
    <div class="media__exhibitions">
      <img
        src="https://static.tildacdn.com/tild6133-6562-4635-b264-326461313736/forFB.jpg"
        alt=""
      />
      <div>
        <h3>PrintSwap exhibitions</h3>
        <p>
          Collective show august 2019 <br />
          Collective show, oct 2020 <br />
          Personal exhibition 2021 <br />
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-gap: 80px 40px;
  grid-template-columns: 1fr 1fr;
}
.media__exhibitions {
  display: flex;
  flex-direction: column;
  width: 100%;
  img {
    width: 100%;
    border-radius: $borderRadiusMain;
    object-fit: cover;
    max-height: 350px;
  }
  > div {
    padding: 0 30px;
    h3 {
      margin-top: 30px;
      margin-bottom: 15px;
      font-size: 32px;
      font-weight: bold;
    }
    p {
      font-size: 26px;
      font-weight: 400;
      line-height: 1.5;
    }
  }
}

@media screen and (min-width: 551px) and (max-width: 1000px) {
  .media__exhibitions {
    > div {
      padding: 0;
      h3 {
        font-size: 1.74rem;
      }
      p {
        font-size: 1.55rem;
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .grid {
    display: flex;
    flex-direction: column;
    grid-gap: 50px;
    margin-top: 30px;
  }
  .media__exhibitions {
    img {
      max-height: 240px;
    }
    > div {
      padding: 0 16px;
      h3 {
        margin-bottom: 5px;
        font-size: 22px;
        font-weight: 800;
      }
      p {
        font-size: 22px;
      }
    }
  }
}
</style>
