export default defineNuxtPlugin((nuxtApp) => {
  const getScrollCoef = (element: HTMLElement) => {
    const elementRect = element.getBoundingClientRect();
    const windowOffsetBottom = document.documentElement.clientHeight / 1.5;
    const elementOffsetTop = elementRect.top - windowOffsetBottom;
    const elementOffsetBottom = elementRect.bottom;

    const coef =
      (windowOffsetBottom - elementOffsetTop) /
      (elementOffsetBottom - elementOffsetTop);

    return coef > 1 ? 1 : coef;
  };

  nuxtApp.vueApp.directive("scroll-scale-text", {
    beforeMount(el) {
      el.__scrollScaleText__ = () => {
        el.style.transform = `scale(${Math.max(0.7, getScrollCoef(el))})`;
      };

      window.addEventListener("scroll", el.__scrollScaleText__);
    },

    unmounted(el) {
      window.removeEventListener("scroll", el.__scrollScaleText__);
      delete el.__scrollScaleText__;
    },
  });
});