import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FreeSplitText from "./freeSplitText";
import { st } from "../../utils/scroll";

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: FreeSplitText;
}

gsap.registerPlugin(ScrollTrigger);

let refreshListenerAttached = false;
let lastSplitWidth = -1;
let splitting = false;

function attachRefreshListener() {
  if (refreshListenerAttached) return;
  refreshListenerAttached = true;
  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  attachRefreshListener();
  if (splitting) return;
  if (window.innerWidth < 900) return;
  if (window.innerWidth === lastSplitWidth) return;
  splitting = true;
  lastSplitWidth = window.innerWidth;
  try {
    runSplit();
  } finally {
    splitting = false;
  }
}

function runSplit() {
  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
      para.split?.revert();
    }

    para.split = new FreeSplitText(para, {
      type: "lines,words",
      linesClass: "split-line",
    });

    para.anim = gsap.fromTo(
      para.split!.words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: st({
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        }),
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });
  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
      title.split?.revert();
    }
    title.split = new FreeSplitText(title, {
      type: "chars,lines",
      linesClass: "split-line",
    });
    title.anim = gsap.fromTo(
      title.split!.chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: st({
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        }),
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });
}
