import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>C++ LLM Trainer</h4>
                <h5>TURING</h5>
              </div>
              <h3>Feb 2026 – Mar 2026</h3>
            </div>
            <p>
              Evaluated and improved LLM-generated solutions for competitive programming problems using C++. Reviewed problem statements, validated correctness, constraints, and edge cases. Performed quality checks and ensured consistency between implementations and datasets.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>TimeShift Web Analyzer</h4>
                <h5>Project · Feb 2026 – Mar 2026</h5>
              </div>
              <h3>Distributed Systems</h3>
            </div>
            <p>
              Built a Go-based distributed system for tracking website evolution through Internet Archive snapshots using simhash fingerprinting. Processed 800+ historical versions with 99.8% content change detection accuracy. Architected asynchronous processing pipeline with Redis/Asynq workers achieving 45-60 second analysis times.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Placement Interview Trainer</h4>
                <h5>Project · Jul 2025 – Aug 2025</h5>
              </div>
              <h3>RAG & GenAI</h3>
            </div>
            <p>
              Built a full-stack RAG-based GenAI application using SentenceTransformer embeddings and FAISS for semantic search. Integrated OpenAI GPT APIs with contextual prompt injection for interview-style explanations, mock questions, and AI-driven answer evaluation.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Job Application Manager</h4>
                <h5>Project · Oct 2025 – Jan 2026</h5>
              </div>
              <h3>Full Stack</h3>
            </div>
            <p>
              Built a full-stack web application using PHP MVC architecture for job tracking. Designed relational database with MySQL, implemented RESTful web services, and developed AJAX-driven frontend with JavaScript, HTML, CSS, and Bootstrap.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
