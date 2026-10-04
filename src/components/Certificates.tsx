import "./styles/Certificates.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { asset } from "../utils/asset";
import { st } from "../utils/scroll";

gsap.registerPlugin(useGSAP);

export type Certificate = {
  number: string;
  name: string;
  category: string;
  issuer: string;
  year: string;
  tools: string;
  url: string;
  image: string;
};

const certificates: Certificate[] = [
  {
    number: "01",
    name: "TCS iON Career Edge - AI Foundation",
    category: "Artificial Intelligence",
    issuer: "Tata Consultancy Services",
    year: "Jul 2026",
    tools:
      "Introduction to AI, Generative AI, Prompt Engineering, AI Tools, Responsible AI",
    url: asset("/certificates/tcs-ion-career-edge-ai-foundation.pdf"),
    image: asset("/images/cert-tata.png"),
  },
  {
    number: "02",
    name: "Technology Job Simulation",
    category: "Deloitte",
    issuer: "Forage",
    year: "Aug 2026",
    tools: "Coding, Development",
    url: asset("/certificates/deloitte-technology-job-simulation.pdf"),
    image: asset("/images/cert-forage-deloitte.png"),
  },
  {
    number: "03",
    name: "Cybersecurity Analyst Job Simulation",
    category: "Tata",
    issuer: "Forage",
    year: "Aug 2026",
    tools:
      "IAM fundamentals, IAM strategy assessment, Custom IAM solutions, Platform integration",
    url: asset("/certificates/forage-cybersecurity-analyst.pdf"),
    image: asset("/images/cert-forage-cybersecurity.png"),
  },
  {
    number: "04",
    name: "Gemini Certified Student",
    category: "Google AI",
    issuer: "Google for Education",
    year: "Aug 2026",
    tools: "Google AI, Gemini, Practical AI Skills, University Tier",
    url: asset("/certificates/google-gemini-certified-student.pdf"),
    image: asset("/images/cert-gemini.png"),
  },
  {
    number: "05",
    name: "NetQ Deployment and Installation",
    category: "NVIDIA Education",
    issuer: "NVIDIA",
    year: "Aug 2026",
    tools: "NetQ, Deployment, Installation",
    url: asset("/certificates/nvidia-netq-deployment-installation.pdf"),
    image: asset("/images/cert-netq.png"),
  },
];

const Certificates = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("certificate-box");
      const container = document.querySelector(".certificate-container");
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
        trigger: ".certificate-section",
        start: "top top",
        end: () => `+=${getDistance()}`,
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
        id: "certificates",
      }),
    });

    timeline.to(".certificate-flex", {
      x: () => -getDistance(),
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("certificates")?.kill();
    };
  }, []);
  return (
    <div className="certificate-section" id="certificates">
      <div className="certificate-container section-container">
        <h2>
          My <span>Certificates</span>
        </h2>
        <div className="certificate-flex">
          {certificates.map((certificate) => (
            <div className="certificate-box" key={certificate.number}>
              <div className="certificate-info">
                <div className="certificate-title">
                  <h3>{certificate.number}</h3>
                  <div>
                    <h4>{certificate.name}</h4>
                    <p>{certificate.category}</p>
                  </div>
                </div>
                <div className="certificate-meta">
                  <div>
                    <h4>Issued by</h4>
                    <p>
                      {certificate.issuer} &middot; {certificate.year}
                    </p>
                  </div>
                  <div>
                    <h4>Skills</h4>
                    <p>{certificate.tools}</p>
                  </div>
                </div>
                <a
                  href={certificate.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="disable"
                  style={{
                    marginTop: "0.5rem",
                    display: "inline-block",
                    color: "inherit",
                  }}
                >
                  View Certificate ↗
                </a>
              </div>
              <WorkImage image={certificate.image} alt={certificate.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
