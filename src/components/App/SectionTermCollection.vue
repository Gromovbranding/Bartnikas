<script lang="ts" setup>
interface Props {
  list: {
    id: number;
    caption: string;
    paragraph: string;
  }[];
}

defineProps<Props>();
</script>
<template>
  <section class="terms">
    <div class="terms__list">
      <div
        v-for="item in list"
        :key="item.caption + item.id"
        class="terms__item"
      >
        <div>
          <h3>
            {{ item.caption }}
          </h3>
        </div>
        <div>
          <p v-html="item.paragraph" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.terms {
  &__item {
    display: grid;
    gap: 2rem;
    align-items: flex-start;
    justify-content: space-between;
    padding: 3rem;
    grid-template-columns: 1fr 60%;

    &:nth-child(even) {
      background-color: $colorBackgroundGrey;
    }

    > div {
      &:first-child {
        flex: 0 0 55%;
        h3 {
          font-size: 3.3rem;
          letter-spacing: 3px;
          line-height: 1.4;
          font-weight: bold;
        }
      }

      &:last-child {
        flex: 0 0 45%;

        p {
          font-size: 1.5rem;
          line-height: 1.4;
          font-weight: 400;
          max-width: 90%;
        }
      }
    }
  }
}

@media screen and (max-width: 549px) {
  .terms {
    &__item {
      flex-direction: column;
      padding: 40px 25px 70px;
      gap: 25px;
      &:nth-child(even) {
      }

      > div {
        &:first-child {
          h3 {
            font-size: 13vw;
            line-height: 1.3;
          }
        }

        &:last-child {
          p {
            font-size: 6vw;
            max-width: 100%;
            line-height: 1.5;
          }
        }
      }
    }
  }
}
</style>
