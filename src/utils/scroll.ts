export const SCROLLER_SELECTOR = "#smooth-wrapper";

export const getScroller = () =>
  document.querySelector<HTMLElement>(SCROLLER_SELECTOR);

export const getScrollTop = () => getScroller()?.scrollTop ?? window.scrollY;

export const st = <T extends object>(vars: T): T & { scroller: string } => ({
  ...vars,
  scroller: SCROLLER_SELECTOR,
});

export function debounce<A extends unknown[]>(
  fn: (...args: A) => void,
  wait = 150
) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const debounced = (...args: A) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = undefined;
  };
  return debounced;
}
