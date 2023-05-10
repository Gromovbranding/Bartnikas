export const useBreakpoints = () => {
  const width = ref<number>(0);

  const handleWindowResize = () => {
    width.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener("resize", handleWindowResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleWindowResize);
  });

  const breakpoint = computed(() => {
    if (width.value > 1000) return "lg";
    else if (width.value > 550 && width.value <= 1000) return "md";
    else if (width.value <= 550) return "xs";

    return null;
  });

  return { width, breakpoint };
};
