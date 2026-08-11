import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let scrollTarget: HTMLElement | null = null;

function init() {
  scrollTarget = document.getElementById("smooth-wrapper");
  if (scrollTarget) {
    scrollTarget.style.overflow = "auto";
    scrollTarget.style.height = "100vh";
  }
}

function scrollTo(target: string | number, instant = false) {
  if (!scrollTarget) init();
  if (!scrollTarget) return;

  if (typeof target === "string") {
    const el = document.querySelector(target);
    if (el) {
      const y = (el as HTMLElement).offsetTop;
      scrollTarget.scrollTo({ top: y, behavior: instant ? "auto" : "smooth" });
    }
  } else {
    scrollTarget.scrollTo({ top: target, behavior: instant ? "auto" : "smooth" });
  }
}

function paused(p: boolean) {
  if (!scrollTarget) init();
  if (scrollTarget) {
    scrollTarget.style.overflow = p ? "hidden" : "auto";
    document.body.style.overflow = p ? "hidden" : "";
  }
}

function scrollTop(pos: number) {
  if (!scrollTarget) init();
  if (scrollTarget) {
    scrollTarget.scrollTop = pos;
  }
}

function refresh() {
  ScrollTrigger.refresh();
}

export interface SmoothScroller {
  scrollTo: (target: string | number, instant?: boolean) => void;
  paused: (paused: boolean) => void;
  scrollTop: (pos: number) => void;
  refresh: () => void;
}

export function createSmoothScroller(): SmoothScroller {
  return { scrollTo, paused, scrollTop, refresh };
}
