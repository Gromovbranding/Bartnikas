<script setup lang="ts">
import type { IFormData, ITextField } from '~/types/types'

defineProps<{
  title: string
  subtitle: string
  textfields: ITextField[]
  buttonText: string
  agreement: string
  subtitleAccent?: string
  note?: string
  isBlock?: boolean
}>()

defineEmits<{
  close: []
}>()

const formData: IFormData = reactive({
  name: '',
  mail: '',
  address: '',
  phone: ''
})

function handleSubmit () {
  console.log(formData)
}
</script>

<template>
  <div class="popup" :class="{ popup_block: isBlock }">
    <IconClose v-if="!isBlock" class="popup__close" @click="$emit('close')" />
    <AppContainer class="popup__container">
      <div class="popup__text">
        <h2 class="popup__title">
          {{ title }}
        </h2>
        <p class="popup__subtitle">
          <span v-if="subtitleAccent" class="popup__subtitle_accent">{{
            subtitleAccent
          }}</span>
          {{ subtitle }}
        </p>
        <p v-if="note" class="popup__note">
          {{ note }}
        </p>
      </div>
      <form class="popup__form" @submit.prevent="handleSubmit">
        <div class="popup__form-fields">
          <UITextField
            v-for="textfield in textfields"
            :key="textfield.label"
            v-model="formData[textfield.key]"
            :textfield="textfield"
          />
        </div>
        <UIButton
          class="popup__btn"
          type="submit"
          :is-text-uppercase="false"
          :is-weight-normal="true"
        >
          {{ buttonText }}
        </UIButton>
        <p class="popup__agreement">
          {{ agreement }}
        </p>
      </form>
    </AppContainer>
  </div>
</template>

<style scoped lang="scss">
.popup {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  &_block {
    position: static;
    height: auto;
    width: 100%;
    padding-top: 2rem;
    padding-bottom: 4.167rem;

    .popup__container {
      align-items: flex-start;
    }
  }

  &__close {
    width: 2.083rem;
    position: absolute;
    top: 2.135rem;
    right: 2.135rem;
    z-index: 10;
    cursor: pointer;
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5.729rem;
  }

  &__text {
    max-width: 43.542rem;
  }

  &__title {
    font-size: 5.208rem;
    font-weight: bold;
  }

  &__subtitle {
    font-size: 1.563rem;
    line-height: 1.2;
    margin-top: 1.302rem;
    display: flex;
    flex-direction: column;

    &_accent {
      color: $colorAccentBlue;
    }
  }

  &__note {
    color: #999;
    font-size: 0.938rem;
    max-width: 30.521rem;
    margin-top: 4.531rem;
  }

  &__form {
    display: flex;
    flex-direction: column;
    width: 30.208rem;
  }

  &__form-fields {
    display: flex;
    flex-direction: column;
    gap: 1.563rem;
    margin-bottom: 2.604rem;
  }

  &__btn {
    font-size: 2.083rem !important;
    padding: 1.563rem !important;
    margin-bottom: 1.563rem;
  }

  &__agreement {
    font-size: 0.938rem;
  }
}

@media screen and (max-width: 1000px) {
  .popup {

    &__text {
      max-width: 33rem;
    }
  }
}

@media screen and (max-width: 550px) {
  .popup {
    &__close {
      width: 3.053rem;
    }

    &__container {
      flex-direction: column;
      gap: 3.089rem;
    }

    &__title {
      font-size: 3.461rem;
    }

    &__subtitle {
      font-size: 1.425rem;
      margin-top: 0.814rem;
    }

    &__note {
      font-size: 1.018rem;
      margin-top: 3.053rem;
    }

    &__form {
      width: 100%;
    }

    &__form-fields {
      gap: 2.036rem;
    }

    &__btn {
      padding: 1.425rem 2rem !important;
      margin-bottom: 1.018rem;
    }

    &__agreement {
      font-size: 1.018rem;
    }
  }
}
</style>
