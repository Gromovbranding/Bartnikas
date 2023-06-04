<script setup lang="ts">
const quantity = ref(1);

const form = ref<{
  name: string;
  email: string;
}>({
  name: "",
  email: "",
});

const handleOrder = () => {
  form.value = {
    name: "",
    email: "",
  };
};
</script>

<template>
  <section class="order-form">
    <div class="order-form__left">
      <div class="order-form__left__img">
        <img
          src="https://static.tildacdn.com/tild3732-6663-4065-b837-366432646264/Contact.jpg"
          alt=""
        />
      </div>
      <div class="order-form__left__img-info">
        <h3>Name</h3>
        <AppFormQuanity v-model="quantity" :maxlength="3" />
      </div>
    </div>
    <div>
      <h3>
        To order the energy-filled photography, please fill out the form below.
      </h3>
      <form @submit.prevent>
        <div>
          <label for=""> Your Name </label>
          <UIInput v-model="form.name" placeholder="John Smith" />
        </div>
        <div>
          <label for=""> Your email </label>
          <UIInput
            v-model="form.email"
            type="email"
            placeholder="mail@example.com"
          />
        </div>
        <UIButton style="width: 100%" @click="handleOrder"> Submit </UIButton>
      </form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.order-form {
  background-color: $colorBackgroundGrey;
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
        font-weight: 700;
      }
    }
  }
  > div {
    &:first-child {
      img {
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
