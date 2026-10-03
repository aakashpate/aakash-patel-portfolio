import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { createSmoothScroller, type SmoothScroller } from "./utils/smoothScroll";
import { debounce } from "../utils/scroll";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);
export let smoother: SmoothScroller;

const Navbar = () => {
  useEffect(() => {
    smoother = createSmoothScroller();

    smoother.scrollTop(0);
    smoother.paused(true);

    const links = document.querySelectorAll(".header ul a");
    const onClick = (e: Event) => {
      if (window.innerWidth > 1024) {
        e.preventDefault();
        const current = e.currentTarget as HTMLAnchorElement;
        const section = current.getAttribute("data-href");
        if (section) smoother.scrollTo(section, true);
      }
    };
    links.forEach((elem) => elem.addEventListener("click", onClick));

    const onResize = debounce(() => smoother.refresh(), 200);
    window.addEventListener("resize", onResize);

    return () => {
      onResize.cancel();
      window.removeEventListener("resize", onResize);
      links.forEach((elem) => elem.removeEventListener("click", onClick));
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="#" className="navbar-title" data-cursor="disable">
          AP
        </a>
        <a
          href="mailto:aakashpatel7972660320@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          aakashpatel7972660320@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
