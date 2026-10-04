import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { asset } from "../utils/asset";
import { st } from "../utils/scroll";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    number: "01",
    name: "Mumbai Menu",
    category: "Restaurant Website",
    tools: "HTML, CSS, JavaScript",
    description: "Responsive restaurant website with modern UI and mobile-friendly layout.",
    url: "https://mumbaimenu.netlify.app",
    image: asset("/images/mumbai-menu.png"),
  },
  {
    number: "02",
    name: "Dark Matter",
    category: "Chocolate Brand Website",
    tools: "HTML, CSS, JavaScript",
    description: "Product showcase website with attractive design and smooth navigation.",
    url: "https://darkmatterchocolate.netlify.app",
    image: asset("/images/dark-matter.png"),
  },
  {
    number: "03",
    name: "Savor",
    category: "Fine Dining Restaurant",
    tools: "Next.js, React, Responsive UI",
    description:
      "Premium dining website with menu, gallery, reservations and private events.",
    url: "https://astonishing-lamington-afe7e4.netlify.app",
    image: asset("/images/work-savor.jpg"),
  },
  {
    number: "04",
    name: "Renoviq AI",
    category: "AI Interior Design Platform",
    tools: "HTML, CSS, JavaScript, AI",
    description:
      "Upload room photos and get an AI renovation plan with photorealistic renderings.",
    url: "https://ai-homerenovation-agent.netlify.app",
    image: asset("/images/work-renoviq.jpg"),
  },
  {
    number: "05",
    name: "India's Got Latent — S2",
    category: "Fan Experience",
    tools: "Next.js, React, Framer Motion",
    description:
      "Immersive season 2 fan experience with scroll-driven sections and live episodes.",
    url: "https://indias-got-latent-s2-fan-experience.vercel.app",
    image: asset("/images/work-igl-s2.jpg"),
  },
  {
    number: "06",
    name: "Cosmos",
    category: "Digital Agency Website",
    tools: "React, Vite, Framer Motion",
    description:
      "Dark, space-themed agency site with services, process and case studies.",
    url: "https://aakashpate.github.io/cosmos-app/",
    image: asset("/images/work-cosmos.jpg"),
  },
  {
    number: "07",
    name: "Timed Cards Opening",
    category: "Landing Page Animation",
    tools: "GSAP, HTML, CSS, JavaScript",
    description:
      "Staggered card-opening animation demo driven by GSAP timelines.",
    url: "https://aakashpate.github.io/timed-cards-opening/",
    image: asset("/images/work-timed-cards.jpg"),
  },
];

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const container = document.querySelector(".work-container");
    if (!box.length || !container) return;
    const rectLeft = container.getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth =
      box[0].parentElement?.getBoundingClientRect().width ?? 0;
    const padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  const getDistance = () => {
    setTranslateX();
    return Math.max(translateX, 0);
  };

  const timeline = gsap.timeline({
    scrollTrigger: st({
      trigger: ".work-section",
      start: "top top",
      end: () => `+=${getDistance()}`,
      scrub: true,
      pin: true,
      invalidateOnRefresh: true,
      id: "work",
    }),
  });

  timeline.to(".work-flex", {
    x: () => -getDistance(),
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project) => (
            <div className="work-box" key={project.number}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.number}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="disable"
                  style={{ marginTop: "0.5rem", display: "inline-block", color: "inherit" }}
                >
                  View Live ↗
                </a>
              </div>
              <WorkImage
                image={project.image}
                alt={project.name}
                link={project.url}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
