<script setup lang="ts">
defineProps<{
  label: string
  placeholder: string
}>()
</script>

<template>
  <div class="textfield">
    <label class="textfield__label">{{ label }}</label>
    <input class="textfield__input" type="text" :placeholder="placeholder">
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
