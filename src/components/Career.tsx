import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br />
          experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Self-Taught Web Developer</h4>
                <h5>Independent Learning</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Started my journey into web development, learning HTML, CSS, and JavaScript
              through self-study and online resources. Built foundational skills in
              responsive web design and modern UI principles.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Project Developer</h4>
                <h5>Personal Projects</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Designed and developed the Mumbai Menu restaurant website and Dark Matter
              chocolate brand showcase — both fully responsive and deployed live on Netlify,
              demonstrating real-world UI/UX skills.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech Student</h4>
                <h5>Thakur College, Vasai East</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Currently pursuing Bachelor of Technology (First Year) at Thakur College,
              Vasai East. Actively building skills in web development and eagerly seeking
              opportunities to contribute to real-world projects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
