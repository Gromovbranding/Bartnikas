<script lang="ts" setup>
import { IFaq } from "types/admin-api";

const { getAllFaq } = usePublicData();

const { data: faqs } = useAsyncData<IFaq[]>(
  "faqs",
  async () => await getAllFaq()
);

useHeadSafe({
  title: "FAQ",
  meta: [
    {
      name: "description",
      content: "My Faq",
    },
    {
      name: "robots",
      content: "index,follow",
    },
  ],
});
</script>

<template>
  <main>
    <AppPageHead title="FAQ" />
    <section class="faq">
      <div class="faq__list">
        <AppDetails v-for="item in faqs" :key="item.id">
          <template #summary>
            {{ item.title }}
          </template>
          <div v-html="item.description"></div>
        </AppDetails>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.faq {
  background-color: $colorBackgroundGrey;
  padding: 80px 40px;

  &__list {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  &__item {
    &--acitve {
      .faq__question {
        background-color: $colorAccentBlue;

        > div {
          &:first-child {
            h3 {
              color: #fff;
            }
          }

          &:last-child {
            background-color: #fff;

            span {
              color: #000;
            }
          }
        }
      }
    }
  }

  &__question {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    align-items: center;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px 40px;
    cursor: pointer;

    > div {
      &:first-child {
        h3 {
          font-size: 36px;
          font-weight: bold;
        }
      }

      &:last-child {
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 28px;
        background-color: #000;
        border-radius: 50%;

        span {
          color: #fff;
        }
      }
    }
  }

  &__answer {
    background-color: #fff;
    border-radius: 10px;
    padding: 50px 40px;

    p {
      max-width: 1250px;
      font-size: 32px;
      font-weight: 400;
      line-height: 1.4;
    }
  }
}

@media screen and (max-width: 550px) {
  .faq {
    padding: 30px 16px 100px;
    &__list {
      gap: 30px;
    }

    &__item {
      &--acitve {
        .faq__question {
          padding: 30px 16px;
          > div {
            &:first-child {
              h3 {
              }
            }

            &:last-child {
              span {
              }
            }
          }
        }
      }
    }

    &__question {
      padding: 30px 16px;
      gap: 38px;
      > div {
        &:first-child {
          h3 {
            font-size: 6vw;
            line-height: 1.5;
          }
        }

        &:last-child {
          flex: 1 0 auto;
          width: 72px;
          height: 72px;
          span {
          }
        }
      }
    }

    &__answer {
      padding: 30px 16px 40px;
      p {
        font-size: 5vw;
        line-height: 1.5;
      }
    }
  }
}
</style>
