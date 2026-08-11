import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScroller {
  scrollTo: (target: string | number, instant?: boolean) => void;
  paused: (paused: boolean) => void;
  scrollTop: (pos: number) => void;
  refresh: () => void;
}

let wrapper: HTMLElement | null = null;
let content: HTMLElement | null = null;

const scroller: SmoothScroller = {
  scrollTo(target: string | number, instant = false) {
    if (!wrapper) return;
    if (typeof target === "string") {
      const el = document.querySelector(target);
      if (el) {
        const y = (el as HTMLElement).offsetTop;
        wrapper.scrollTo({ top: y, behavior: instant ? "auto" : "smooth" });
      }
    } else {
      wrapper.scrollTo({ top: target, behavior: instant ? "auto" : "smooth" });
    }
  },
  paused(_paused: boolean) {
    if (wrapper) {
      wrapper.style.overflow = _paused ? "hidden" : "";
    }
  },
  scrollTop(pos: number) {
    if (wrapper) {
      wrapper.scrollTop = pos;
    }
  },
  refresh() {
    ScrollTrigger.refresh();
  },
};

export function createSmoothScroller(): SmoothScroller {
  wrapper = document.getElementById("smooth-wrapper");
  content = document.getElementById("smooth-content");

  if (wrapper && content) {
    wrapper.style.overflow = "auto";
    wrapper.style.height = "100vh";
    content.style.willChange = "transform";
  }

  return scroller;
}

export type { SmoothScroller };
