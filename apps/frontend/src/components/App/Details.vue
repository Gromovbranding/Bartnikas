<template>
  <details ref="details" :open="modelValue">
    <summary
      ref="summary"
      :class="{ closed: !isOpen }"
      @click.prevent="onClick"
    >
      <slot name="summary" /> <span>{{ isOpen ? "-" : "+" }}</span>
    </summary>
    <p ref="content">
      <slot />
    </p>
  </details>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
defineProps({
  modelValue: { type: Boolean, default: false }
})

const details = ref<HTMLDetailsElement>()
const summary = ref<HTMLElement>()
const content = ref<HTMLParagraphElement>()
const animation = ref<Animation | null>()
const isClosing = ref(false)
const isExpanding = ref(false)
const isOpen = ref(false)

function onClick () {
  if (!details.value) { return }
  details.value.style.overflow = 'hidden'
  if (isClosing.value || !details.value.open) {
    return openDetails()
  }

  if (isExpanding.value || details.value.open) {
    shrinkDetails()
  }
}

function openDetails () {
  isOpen.value = true
  details.value!.style.height = `${details.value!.offsetHeight}px`
  details.value!.open = true
  window.requestAnimationFrame(() => expandDetails())
}

function shrinkDetails () {
  isClosing.value = true

  const startHeight = `${details.value!.offsetHeight}px`
  const endHeight = `${summary.value!.offsetHeight}px`

  if (animation.value) {
    animation.value.cancel()
  }

  animation.value = details.value!.animate(
    {
      height: [startHeight, endHeight]
    },
    {
      duration: 300,
      easing: 'ease-out'
    }
  )

  animation.value.onfinish = () => onAnimationFinish(false)
  animation.value.oncancel = () => (isClosing.value = false)
}

function expandDetails () {
  isExpanding.value = true
  const startHeight = `${details.value!.offsetHeight}px`
  const endHeight = `${
    summary.value!.offsetHeight + content.value!.offsetHeight
  }px`

  if (animation.value) {
    animation.value.cancel()
  }

  animation.value = details.value!.animate(
    {
      height: [startHeight, endHeight]
    },
    {
      duration: 300,
      easing: 'ease-out'
    }
  )

  animation.value.onfinish = () => onAnimationFinish(true)
  animation.value.oncancel = () => (isExpanding.value = false)
}

function onAnimationFinish (open: boolean) {
  details.value!.open = open
  isOpen.value = open
  emit('update:modelValue', open)
  animation.value = null
  isClosing.value = false
  isExpanding.value = false
  details.value!.style.height = details.value!.style.overflow = ''
}
</script>

<style lang="scss" scoped>
details {
  display: block;
  border-radius: 15px;
  overflow: hidden;
  background-color: #fff;
}

summary {
  padding-block: 1rem;
  padding-inline: 2rem;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  background-color: $colorAccentBlue;
  color: #fff;
  position: relative;
  z-index: 2;
  cursor: pointer;
  font-size: 2rem;
  line-height: 123%;
  font-weight: 600;
  transition-duration: 200ms;
  gap: 2rem;

  &::marker, &::-webkit-details-marker {
    display: none;
  }

  span {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 4.25rem;
    height: 4.25rem;
    color: inherit;
    border-radius: 50%;
    background-color: #fff;
    color: #000;
    font-weight: 400;
    flex-shrink: 0;
  }
  &.closed {
    background-color: #fff;
    color: #000;
    span {
      background-color: #000;
      color: #fff;
    }
  }
}
p {
  padding-inline: 2rem;
  padding-block: 2rem;
  margin: 0;
  font-size: 1.52rem;
  line-height: 155%;
  max-width: 61rem;
}

@media screen and (max-width: 550px) {
  summary {
    font-size: 1.7rem;
  }
  p {
    font-size: 1.4rem;
  }
}
</style>
