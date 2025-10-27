import { useState } from "react";
import "./App.css";

function App() {
  const [repoUrl, setRepoUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl.trim()) {
      alert("Please enter a valid GitHub repository URL.");
      return;
    }
    console.log("Repository submitted:", repoUrl);
    // TODO: Send repoUrl to backend for analysis
  };

  return (
    <div className="app-container">
      <header>
        <h1>🧠 CodeBase Genius</h1>
        <p>
          Codebase Genius is an agentic platform built on the JAC programming language.
          It uses a collection of intelligent agents to analyze public GitHub repositories
          and generate comprehensive documentation of the codebase.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="repo-form">
        <label htmlFor="repoUrl">Repository URL</label>
        <input
          type="text"
          id="repoUrl"
          placeholder="https://github.com/username/repository"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
        <button type="submit">Analyze Repository</button>
      </form>
    </div>
  );
}

export default App;
