import { lazy, PropsWithChildren, Suspense, useEffect, useRef, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import { debounce, getScroller } from "../utils/scroll";

type NetworkInfoLike = { saveData?: boolean; effectiveType?: string };

const TechStack = lazy(() => import("./TechStack"));

const warmTechStack = () => {
  void import("./TechStack").catch(() => {});
};

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );
  const [techReady, setTechReady] = useState(false);
  const techSlotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDesktopView || techReady) return;
    const slot = techSlotRef.current;
    if (!slot) {
      setTechReady(true);
      return;
    }
    const el: HTMLDivElement = slot;
    const scroller = getScroller();
    const detach = () => {
      scroller?.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
    function check() {
      if (el.getBoundingClientRect().top < window.innerHeight + 1200) {
        setTechReady(true);
        detach();
      }
    }
    check();
    scroller?.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return detach;
  }, [isDesktopView, techReady]);

  useEffect(() => {
    if (!isDesktopView) return;
    const conn = (navigator as Navigator & { connection?: NetworkInfoLike })
      .connection;
    if (
      conn?.saveData ||
      conn?.effectiveType === "2g" ||
      conn?.effectiveType === "slow-2g"
    ) {
      return;
    }
    let cancelled = false;
    const idle = (
      window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      }
    ).requestIdleCallback;
    const timer = window.setTimeout(() => {
      if (cancelled) return;
      if (idle)
        idle(
          () => {
            if (!cancelled) warmTechStack();
          },
          { timeout: 5000 }
        );
      else warmTechStack();
    }, 3000);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [isDesktopView]);

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    const onResize = debounce(resizeHandler, 200);
    window.addEventListener("resize", onResize);
    return () => {
      onResize.cancel();
      window.removeEventListener("resize", onResize);
    };
  }, [isDesktopView]);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            {isDesktopView &&
              (techReady ? (
                <Suspense fallback={<div className="techstack" />}>
                  <TechStack />
                </Suspense>
              ) : (
                <div className="techstack" ref={techSlotRef} />
              ))}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
