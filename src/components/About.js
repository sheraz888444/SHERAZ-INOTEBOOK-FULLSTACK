// src/components/About.js
import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const handleStartWriting = () => {
    // If you want to check for login first:
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // navigate to login page
    } else {
      navigate("/"); // navigate to home/notes page
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body p-5">
          <h1 className="card-title text-center mb-4 text-primary fw-bold">
            About iNotebook
          </h1>
          <p className="lead text-muted text-center mb-5">
            Your personal, secure, and always-accessible digital notebook.
          </p>

          <div className="mb-4">
            <h4 className="fw-semibold">Why iNotebook?</h4>
            <p>
              Our mission is simple: <strong>help you organize your thoughts, tasks, 
              and ideas without the hassle of losing them</strong>.
              Whether you're a student, a professional, or just someone who 
              loves jotting down ideas, iNotebook is here to make 
              note-taking simple, fast, and safe.
            </p>
          </div>

          <div className="mb-4">
            <h4 className="fw-semibold">Features</h4>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">✍ Write & save notes instantly</li>
              <li className="list-group-item">🔒 Keep your notes secure with your personal account</li>
              <li className="list-group-item">🌍 Access them anytime, anywhere</li>
              <li className="list-group-item">✏ Edit or delete notes whenever you like</li>
            </ul>
          </div>

          <div className="mt-4">
            <h4 className="fw-semibold">Built With</h4>
            <p>
              React ⚛ • Node.js 🚀 • Express ⚡ • MongoDB 🍃
            </p>
          </div>

          <div className="text-center mt-5">
            <button
              onClick={handleStartWriting}
              className="btn btn-primary px-4 py-2 rounded-pill shadow-sm"
            >
              Start Writing Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
