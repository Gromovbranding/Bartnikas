<script lang="ts" setup>
interface News {
  id: number;
  title: string;
}
interface Props {
  slug?: string;
  prev?: News;
  next?: News;
}

const props = withDefaults(defineProps<Props>(), {
  slug: "media",
  prev: () => ({
    id: 1,
    title: "How dystopias can save the world",
  }),
  next: () => ({
    id: 3,
    title:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur, vitae",
  }),
});

const handleTo = async (id: number) => {
  await navigateTo(`/${props.slug}/${id}`);
};
</script>

<template>
  <section class="switching">
    <!-- Previous -->
    <div v-if="prev" class="switching__item" @click="handleTo(prev.id)">
      <span class="switching__sup">previous</span>
      <h3>{{ prev.title }}</h3>
    </div>
    <div v-else class="switching__item_empty"></div>
    <!-- Next -->
    <div v-if="next" class="switching__item" @click="handleTo(next.id)">
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
</style>
