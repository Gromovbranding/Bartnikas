<script lang="ts" setup>
interface Props {
  to?: string;
}

withDefaults(defineProps<Props>(), {
  to: "/media/1",
});
</script>

<template>
  <NuxtLink :to="to" class="interios">
    <div class="interios__img">
      <img
        src="https://static.tildacdn.com/tild3332-3036-4664-a462-353037666335/0651.jpg"
        alt=""
      />
    </div>
    <div class="interios__content">
      <div>
        <IconArrow is-arrow30-deg />
      </div>
      <div>
        <h3>Capturing the power of the earth</h3>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.interios {
  width: 100%;
  display: block;
  transition: transform 0.6s ease-in-out;

  &:hover {
    transform: translateY(-30px);
  }

  &__img {
    img {
      width: 100%;
      object-fit: cover;
      height: 300px;
    }
  }

  &__content {
    display: flex;
    gap: 20px;
    margin-top: 30px;
    padding: 0 10px;

    > div {
      &:first-child {
        margin-top: 18px;
        svg {
          width: 60px;
          height: 40px;
        }
      }

      &:last-child {
        h3 {
          color: $colorTextDark;
          font-size: 50px;
          font-weight: 700;
          line-height: 1.1;
        }
      }
    }
  }
}
</style>
