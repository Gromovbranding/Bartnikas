<script setup lang="ts">
const input = ref<HTMLInputElement>();

const props = withDefaults(
  defineProps<{
    modelValue: number;
    maxlength?: number;
    minLength?: number;
  }>(),
  {
    minLength: 1,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", val: number): void;
}>();

const value = computed({
  set(val: number) {
    emit("update:modelValue", val);
  },
  get() {
    return props.modelValue;
  },
});

function updateValue(e: "+" | "-") {
  if (e === "+") return value.value++;
  if (value.value === props.minLength) return;
  value.value--;
}
</script>

<template>
  <form class="form" @submit.prevent>
    <small>{{ $t("form.quantity") }}</small>
    <div class="form__control">
      <input
        ref="input"
        v-model.number="value"
        type="number"
        disabled
        :minlength="minLength"
        :maxlength="maxlength"
      />
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          @click="updateValue('+')"
        >
          <path
            clip-rule="evenodd"
            d="M19.3536 15.3536C19.1583 15.5488 18.8417 15.5488 18.6464 15.3536L12 8.70711L5.35355 15.3536C5.15829 15.5488 4.84171 15.5488 4.64645 15.3536C4.45118 15.1583 4.45118 14.8417 4.64645 14.6464L11.6464 7.64645C11.8417 7.45118 12.1583 7.45118 12.3536 7.64645L19.3536 14.6464C19.5488 14.8417 19.5488 15.1583 19.3536 15.3536Z"
            fill="black"
            fill-rule="evenodd"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          @click="updateValue('-')"
        >
          <path
            clip-rule="evenodd"
            d="M19.3536 15.3536C19.1583 15.5488 18.8417 15.5488 18.6464 15.3536L12 8.70711L5.35355 15.3536C5.15829 15.5488 4.84171 15.5488 4.64645 15.3536C4.45118 15.1583 4.45118 14.8417 4.64645 14.6464L11.6464 7.64645C11.8417 7.45118 12.1583 7.45118 12.3536 7.64645L19.3536 14.6464C19.5488 14.8417 19.5488 15.1583 19.3536 15.3536Z"
            fill="black"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.form {
  input:disabled {
    color: inherit;
  }
  small {
    font-size: 13px;
    font-weight: bold;
  }
  .form__control {
    display: flex;
    align-items: center;
    gap: 10px;
    > input {
      font-size: 1vw;
      font-weight: bold;
      outline: none;
      width: 3.4vw;
      height: 2vw;
      text-align: center;
      padding: 8px;
      background: transparent;
      border-radius: 0.5vw;
      border: 1px solid #000;
      -moz-appearance: textfield;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
    > div {
      display: flex;
      flex-direction: column;

      svg {
        cursor: pointer;
        width: 1.4vw;
        &:last-child {
          transform: rotate(180deg);
        }
      }
    }
  }
}

@media screen and (min-width: 551px) and (max-width: 1000px) {
  .form {
    small {
      font-size: 1rem;
      margin-bottom: 0.5rem;
      display: inline-block;
    }
    .form__control {
      > input {
        width: 4rem;
        height: 2.4rem;
        font: inherit;
        font-size: 1.5rem;
        font-weight: 600;
      }
      > div {
        svg {
          width: 1.5rem;
        }
      }
    }
  }
}

@media screen and (max-width: 550px) {
  .form {
    small {
      font-size: 22px;
      font-weight: bold;
      line-height: 32px;
      margin-bottom: 20px;
    }
    .form__control {
      > input {
        width: 70px;
        height: 40px;
        font-size: 20px;
        border-radius: 5px;
      }
      > div {
        svg {
          width: 30px;
        }
      }
    }
  }
}
</style>
