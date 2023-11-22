<script setup lang="ts">
import type { IMediaPublication } from "~/types/admin-api";

const { fetchGet } = useApi();

const { data: publication } = useAsyncData<IMediaPublication[]>(
  "publication",
  async () => await fetchGet("/media/publication")
);
</script>

<template>
  <div>
    <div class="grid">
      <a
        v-for="item in publication"
        :key="'pub' + item.id"
        :href="item.url"
        class="media__publications upper-slide"
        target="_blank"
      >
        <div>
          <NuxtImg loading="lazy" :src="`/baseApiFiles/${item.image.name}`" />
        </div>
        <div>
          <h3>
            {{
              new Date(item.created_at).toLocaleDateString("en-US", {
                dateStyle: "medium",
              })
            }}
          </h3>
          <small>{{ item.program }}</small>
        </div>
        <div>
          <IconArrow is-arrow30-deg />
          <span>{{ item.subtitle }}</span>
        </div>
      </a>
    </div>
    <!-- <div class="media__links">
      <div class="media__links-item">
        <p>New Atlas 2018</p>
        <p>Colossal 2018</p>
        <p>Anthology</p>
        <p>Lense 2018</p>
        <p>Progresso Fotografico (Italy) 2020</p>
        <p>Circle Arts</p>
        <p>LIFE Framer</p>
        <p>Trandland</p>
        <p>Opumo 2019</p>
      </div>
      <div class="media__links-item">
        <p>New Atlas 2018</p>
        <p>Colossal 2018</p>
        <p>Anthology</p>
        <p>Lense 2018</p>
        <p>Progresso Fotografico (Italy) 2020</p>
        <p>Circle Arts</p>
        <p>LIFE Framer</p>
        <p>Trandland</p>
        <p>Opumo 2019</p>
      </div>
      <div class="media__links-item">
        <p>New Atlas 2018</p>
        <p>Colossal 2018</p>
        <p>Anthology</p>
        <p>Lense 2018</p>
        <p>Progresso Fotografico (Italy) 2020</p>
        <p>Circle Arts</p>
        <p>LIFE Framer</p>
        <p>Trandland</p>
        <p>Opumo 2019</p>
      </div>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-gap: 60px;
  grid-template-columns: 1fr 1fr 1fr;
}

.media {
  &__publications {
    width: 100%;
    > div {
      &:first-child {
        img,
        picture {
          width: 100%;
          border-radius: $borderRadiusMain;
          object-fit: cover;
          height: 310px;
        }
      }

      &:nth-child(2) {
        margin-bottom: 30px;
        margin-top: 20px;
        padding: 0 30px;
        > h3 {
          font-size: 18px;
          text-transform: uppercase;
          font-weight: bold;
          margin-bottom: 5px;
        }

        > small {
          font-size: 16px;
          font-weight: 400;
          color: #000;
        }
      }

      &:last-child {
        display: flex;
        align-items: center;
        gap: 15px;

        svg {
          width: 18px;
          height: 18px;
        }

        span {
          text-transform: uppercase;
          font-weight: 400;
        }
      }
    }
  }

  &__links {
    display: flex;
    gap: 100px;
    justify-content: center;
    margin-top: 120px;

    &-item {
      display: flex;
      flex-direction: column;
    }
    p {
      font-size: 24px;
      line-height: 1.7;
      font-weight: bold;
      max-width: 340px;
    }
  }
}

@media screen and (min-width: 551px) and (max-width: 1000px) {
  .grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

@media screen and (max-width: 550px) {
  .grid {
    display: flex;
    flex-direction: column;
    grid-gap: 50px;
    padding: 30px 12vw 0;
  }

  .media {
    &__publications {
      > div {
        &:first-child {
          img,
          picture {
            max-height: 220px;
          }
        }

        &:nth-child(2) {
          margin-bottom: 20px;
          margin-top: 16px;
          > h3 {
            font-size: 3.1vw;
            font-weight: 800;
            margin-bottom: 8px;
          }

          > small {
            font-size: 3.2vw;
          }
        }

        &:last-child {
          svg {
            width: 3vw;
            height: 3vw;
          }

          span {
            font-size: 3vw;
          }
        }
      }
    }

    &__links {
      display: flex;
      gap: 50px;
      justify-content: center;
      margin-top: 80px;
      flex-direction: column;
      padding: 0 12vw;
      &-item {
      }
      p {
        font-size: 22px;
      }
    }
  }
}
</style>
