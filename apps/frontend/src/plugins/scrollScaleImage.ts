export default defineNuxtPlugin((nuxtApp) => {
  const getScrollCoef = (element: HTMLElement) => {
    const elementRect = element.getBoundingClientRect();
    const windowOffsetBottom = document.documentElement.clientHeight;
    const elementOffsetTop = window.scrollY - windowOffsetBottom;
    const elementOffsetBottom = elementRect.bottom;

    const coef =
      (elementOffsetBottom - elementOffsetTop) /
      (windowOffsetBottom - elementOffsetTop / 2);
    return coef > 1.5 ? 1.5 : coef;
  };

  nuxtApp.vueApp.directive("scroll-scale-image", {
    beforeMount(el) {
      el.__scrollScaleText__ = () => {
        el.style.transform = `scale(${Math.max(1, getScrollCoef(el))})`;
      };

      window.addEventListener("scroll", el.__scrollScaleText__);
    },

    unmounted(el) {
      window.removeEventListener("scroll", el.__scrollScaleText__);
      delete el.__scrollScaleText__;
    },
  });
});
