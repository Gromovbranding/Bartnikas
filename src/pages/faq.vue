<script lang="ts" setup>
// interface IItem {
//   visible: boolean;
//   answer: string;
//   question: string;
//   id: number;
// }

const list = ref([
  {
    id: 1,
    visible: true,
    answer: `You choose a photo that arouses your interest and resonates with you, then send a request
                        form (or a link to sb@stasbart.com), indicating your wishes in size and design. We agree on
                        the size, paper, price, and you pay for the work with a bank card using the payment link
                        that will come to your email.`,
    question: "If I want to purchase a print where should I go?",
  },
  {
    id: 2,
    visible: false,
    answer: `You choose a photo that arouses your interest and resonates with you, then send a request
                        form (or a link to sb@stasbart.com), indicating your wishes in size and design. We agree on
                        the size, paper, price, and you pay for the work with a bank card using the payment link
                        that will come to your email.`,
    question: "If I want to purchase a print where should I go?",
  },
]);

// const handleQuestionClick = (item: IItem) => {
//   list.value = list.value.map((el) => {
//     if (el.id === item.id)
//       return {
//         ...el,
//         visible: !el.visible,
//       };

//     return el;
//   });
// };
</script>

<template>
  <main>
    <Title> FAQ </Title>
    <AppPageHead title="FAQ" />
    <section class="faq">
      <div class="faq__list">
        <AppDetails v-for="item in list" :key="item.question + item.id">
          <template #summary
            >If I want to purchase a print where should I go?</template
          >
          You choose a photo that arouses your interest and resonates with you,
          then send a request form (or a link to sb@stasbart.com), indicating
          your wishes in size and design. We agree on the size, paper, price,
          and you pay for the work with a bank card using the payment link that
          will come to your email.
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

@media screen and (max-width: 549px) {
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
