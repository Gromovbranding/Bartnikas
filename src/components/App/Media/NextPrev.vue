<script lang="ts" setup>
interface IDescribe {
  id?: number;
  title?: string;
}
interface Props {
  slug: string;
  prev: IDescribe;
  next: IDescribe;
}

const props = defineProps<Props>();

const handleTo = async (id: number) => {
  await navigateTo(`/${props.slug}/${id}`);
};
</script>

<template>
  <section class="switching">
    <!-- Previous -->
    <div
      v-if="prev.id && prev.title"
      class="switching__item"
      @click="handleTo(prev.id)"
    >
      <span class="switching__sup">previous</span>
      <h3>{{ prev.title }}</h3>
    </div>
    <div v-else class="switching__item_empty"></div>
    <!-- Next -->
    <div
      v-if="next.id && next.title"
      class="switching__item"
      @click="handleTo(next.id)"
    >
      <span class="switching__sup">next</span>
      <h3>{{ next.title }}</h3>
    </div>
    <div v-else class="switching__item_empty"></div>
  </section>
</template>

<style lang="scss" scoped>
.switching {
  margin-top: 180px;
  display: flex;

  &__item {
    position: relative;
    background-color: $colorBackgroundGreyDarken;
    width: 50%;
    border-radius: $borderRadiusMain;
    padding: 80px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease-out;

    &_empty {
      width: 50%;
    }

    > h3 {
      max-width: 85%;
      line-height: 1.3;
      font-size: 36px;
      font-weight: bold;
      transition: color 0.3s ease-out;
    }

    &:hover {
      background-color: $colorAccentBlue;
      h3 {
        color: #fff;
      }
    }

    &:last-child {
      & .switching__sup {
        right: 15px;
      }
    }

    &:first-child {
      & .switching__sup {
        left: 15px;
      }
    }
  }

  &__sup {
    font-size: 28px;
    font-weight: 400;
    color: $colorTextGrey2;
    position: absolute;
    top: 20px;
    letter-spacing: 3.2px;
    text-transform: uppercase;
  }
}

@media screen and (max-width: 550px) {
  .switching {
    margin-top: 50px;
    flex-direction: column;
    gap: 16px;
    &__item {
      width: 100%;
      background-color: $colorAccentBlue;
      padding: 70px 30px 20px;
      display: block;
      &_empty {
        width: 50%;
        display: none;
      }

      > h3 {
        max-width: 100%;
        color: #fff;
        font-size: 7vw;
      }

      &:last-child {
        & .switching__sup {
        }
      }

      &:first-child {
        & .switching__sup {
        }
      }
    }

    &__sup {
      color: $colorTextGrey2;
      font-size: 5vw;
    }
  }
}
</style>
