<script lang="ts" setup>
interface Props {
  isFullBlack?: boolean;
  isFullWhite?: boolean;
  isOnlyAuthorWhite?: boolean;
  isOnlyAuthorBlack?: boolean;
}
withDefaults(defineProps<Props>(), {
  isFullBlack: true,
  isFullWhite: true,
  isOnlyAuthorWhite: false,
  isOnlyAuthorBlack: false,
});
</script>
<template>
  <div></div>
</template>
