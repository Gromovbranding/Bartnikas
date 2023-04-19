export function useThrottle(fn: Function, time: number) {
  let throttled = false;
  return function (...args) {
    if (!throttled) {
      fn.apply(this, args);
      throttled = true;
      setTimeout(() => {
        throttled = false;
      }, time);
    }
  };
}
