<script setup lang="ts">
import intlTelInput from 'intl-tel-input'
import type { ITextField } from '~/types/types'
import 'intl-tel-input/build/css/intlTelInput.css'

const props = defineProps<{
  textfield: ITextField
}>()

const model = defineModel({ type: String })
const inputEl = ref<HTMLInputElement>()

onMounted(() => {
  if (inputEl.value && props.textfield.key === 'phone') {
    intlTelInput(inputEl.value, {
      initialCountry: 'us',
      autoPlaceholder: 'aggressive',
      utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/21.2.5/js/utils.min.js'
    })
  }
})
</script>

<template>
  <div class="textfield">
    <label class="textfield__label">{{ textfield.label }}</label>
    <input
      ref="inputEl"
      v-model="model"
      class="textfield__input"
      :type="textfield.inputType"
      :placeholder="textfield.placeholder"
    >
  </div>
</template>

<style scoped lang="scss">
.textfield {
  font-size: 1.563rem;
  display: flex;
  flex-direction: column;
  gap: 0.521rem;

  &__label {
    padding-left: 1.042rem;
  }

  &__input {
    font: inherit;
    padding: 1.25rem 1.563rem;
    border-radius: 5px;
    border: 1px solid #000;

    &::placeholder {
      font: inherit;
      color: #999;
    }
  }
}

@media screen and (max-width: 550px) {
  .textfield {
    font-size: 1.832rem;

    &__input {
      padding: 2.036rem 3.053rem;
      border-radius: 8px;
    }
  }
}
</style>
