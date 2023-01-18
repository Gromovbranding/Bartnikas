<script lang="ts" setup>
interface Props {
  modelValue?: string;
  placeholder?: string;
  type?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
  modelValue: "",
  type: "text",
});

const emit = defineEmits<{
  (e: "update:modelValue", str: string): void;
}>();

const inputState = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit("update:modelValue", value);
  },
});
</script>
<template>
  <input
    v-model="inputState"
    class="input"
    :type="type"
    :placeholder="placeholder"
  />
</template>

<style lang="scss" scoped>
.input {
  border-radius: 10px;
  padding: 23px 32px;
  font-size: 24px;
  font-weight: 400;
  width: 100%;
  color: $colorTextDark;
  background: transparent;
  border: 1px solid $colorTextDark;
  outline: none;
}
</style>
