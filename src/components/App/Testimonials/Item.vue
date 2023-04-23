<script lang="ts" setup>
interface Props {
  img?: string;
  name?: string;
  profession?: string;
}

withDefaults(defineProps<Props>(), {
  img: "",
  name: "",
  profession: "",
});
</script>

<template>
  <div class="testimonial">
    <div class="testimonial__img">
      <img :src="img" alt="" />
      <div class="testimonial__play">
        <IconPlay />
      </div>
    </div>
    <div class="testimonial__info">
      <h4>{{ name }}</h4>
      <span>{{ profession }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.testimonial {
  width: 420px;
  &__img {
    width: 100%;
    position: relative;
    img {
      width: 100%;
      height: 34vw;
      object-fit: cover;
      border-radius: $borderRadiusMain;
    }
  }

  &__play {
    width: 36px;
    height: 36px;
    position: absolute;
    right: 30px;
    transition: transform 1s ease-in-out;
    bottom: 30px;

    &:hover {
      transform: scale(1.2);
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 14px 141px 20px 30px;
    > h4 {
      font-size: 30px;
      font-weight: 600;
      line-height: 1.3;
    }
    > span {
      font-size: 22px;
    }
  }
}

@media screen and (max-width: 549px) {
  .testimonial {
    width: 90vw;
    &__img {
      img {
        height: 75vh;
      }
    }
  }
}
</style>
