<script lang="ts" setup>
interface BlogImage {
  id?: number;
  name?: string;
  url?: string;
}
interface Blog {
  id?: number;
  title?: string;
  desc?: string;
  text?: string;
  date?: Date;
  images?: BlogImage[];
}
interface Props {
  blog?: Blog;
}

const props = withDefaults(defineProps<Props>(), {
  blog: null,
});

const date = computed(() => {
  if (!props.blog?.date) return "";
  const d = new Date(props.blog?.date);
  const year = d.toLocaleString("default", { year: "numeric" });
  const month = d.toLocaleString("default", { month: "2-digit" });
  const day = d.toLocaleString("default", { day: "2-digit" });
  return `${day}.${month}.${year}`;
});
</script>

<template>
  <NuxtLink :to="`/blog/${blog?.id}`" class="interios">
    <div class="interios__img">
      <img :src="blog.images[0]?.url" alt="" />
    </div>
    <div class="interios__content">
      <div>
        <IconArrow is-arrow30-deg />
      </div>
      <div>
        <h3>{{ blog?.title }}</h3>
        <p>{{ blog?.desc }}</p>
        <span>{{ date }}</span>
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
      height: 100%;
      min-height: 550px;
      max-height: 550px;
      object-fit: cover;
    }
  }

  &__content {
    display: flex;
    gap: 20px;
    margin-top: 20px;

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
          font-size: 40px;
          font-weight: 700;
          line-height: 1.1;
        }

        p {
          font-size: 24px;
          color: #000;
          margin-top: 15px;
          line-height: 1.5;
          font-weight: 400;
          letter-spacing: 1px;
        }

        span {
          display: block;
          margin-top: 40px;
          color: $colorTextGrey;
          font-size: 20px;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
