<script setup lang="ts">
import type {
  IProjectImageDetail,
  IProjectImageSizes
} from '~/types/admin-api'

const { fetchPost } = useApi()

const props = defineProps<{
  image: IProjectImageDetail;
  selectedSize: IProjectImageSizes;
  projectId: number;
}>()

const emits = defineEmits<{
  (e: 'order'): void;
}>()

const form = ref<{
  name: string;
  email: string;
  quantity: number;
}>({
  name: '',
  email: '',
  quantity: 1
})

const handleOrder = async () => {
  try {
    await fetchPost('projects/order/by-email', {
      email: form.value.email,
      name: form.value.name,
      quantity: form.value.quantity,
      image_id: props.image.id,
      project_id: props.projectId,
      selected_size_id: props.selectedSize.id
    })

    form.value = {
      name: '',
      email: '',
      quantity: 0
    }

    ElMessage.info({
      message: 'Project was ordered'
    })

    emits('order')
  } catch {}
}
</script>

<template>
  <section class="order-form">
    <div class="order-form__left">
      <div class="order-form__left__img">
        <NuxtImg loading="lazy" :src="`/baseApiFiles/${image.image.name}`" />
      </div>
      <div class="order-form__left__img-info">
        <h3>{{ image.image_name }}</h3>
      </div>
    </div>
    <div>
      <h3>
        {{ $t("orderForm.fillForm") }}
      </h3>
      <form @submit.prevent>
        <div>
          <label for=""> {{ $t("orderForm.yourName") }} </label>
          <UIInput v-model="form.name" placeholder="John Smith" />
        </div>
        <div>
          <label for=""> {{ $t("orderForm.yourEmail") }} </label>
          <UIInput
            v-model="form.email"
            type="email"
            placeholder="mail@example.com"
          />
        </div>
        <UIButton style="width: 100%" @click="handleOrder">
          {{ $t("orderForm.request") }}
        </UIButton>
      </form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.order-form {
  background-color: #ffffff;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
  &__left {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    &__img {
      flex-grow: 1;
    }
    &__img-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      h3 {
        font-size: 1.75rem;
        font-weight: 500;
      }
    }
  }
  > div {
    &:first-child {
      img,
      picture {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: $borderRadiusMain;
      }
    }

    &:last-child {
      padding: 1rem;
      > * {
        max-width: 33.3rem;
      }

      h3 {
        font-size: 1.9rem;
        font-weight: bold;
        margin-bottom: 2rem;
        line-height: 1.32;
        display: flex;
        font-weight: 600;
        gap: 0.5rem;
      }

      p {
        font-size: 1.34rem;
        font-weight: 400;
        line-height: 1.56;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      form {
        > div {
          margin-bottom: 40px;

          label {
            font-size: 24px;
            font-weight: 400;
            margin-bottom: 10px;
            display: block;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .order-form {
    grid-template-columns: 1fr;
    > div {
      &:last-child {
        padding: 0;
        > * {
          max-width: initial;
        }
      }
    }
  }
}
</style>
