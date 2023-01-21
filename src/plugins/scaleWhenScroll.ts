export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("scroll-scale", {
    mounted(el, binding) {
      if (typeof binding.value !== "function") {
        throw new TypeError(
          `v-scroll-scale: Binding value should be a function, ${typeof binding.value} given`
        );
      }

      el.__scrollScale__ = () => {
        binding.value();
      };

      el.addEventListener("wheel", el.__scrollScale__);
    },

    unmounted(el) {
      el.removeEventListener("wheel", el.__scrollScale__);
      delete el.__scrollScale__;
    },
  });
});
