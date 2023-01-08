<script lang="ts" setup>
interface Props {
  modelValue?: string;
  placeholder?: string;
  type?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
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
    class="input"
    :type="type"
    :placeholder="placeholder"
    v-model="inputState"
  />
</template>

<style lang="scss" scoped>
.input {
  border-radius: 5px;
  padding: 25px 30px;
  font-size: 24px;
  font-weight: 300;
  width: 100%;
  color: $colorTextDark;
  background: transparent;
  border: 1px solid $colorTextDark;
  outline: none;
}
</style>