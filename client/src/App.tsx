import { useState } from "react";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-slate-100 px-4">
      <header className="max-w-2xl text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-cyan-400">
          🧠 CodeBase Genius
        </h1>
        <p className="text-slate-300 leading-relaxed text-base md:text-lg">
          Codebase Genius is an agentic platform built on the{" "}
          <span className="text-cyan-400 font-medium">JAC programming language</span>.
          It uses a collection of intelligent agents to analyze public GitHub repositories
          and generate comprehensive documentation of the codebase.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mt-8 flex flex-col gap-4 bg-slate-800/60 p-6 rounded-2xl shadow-lg"
      >
        <label
          htmlFor="repoUrl"
          className="text-slate-300 font-medium text-left"
        >
          Repository URL
        </label>
        <input
          type="text"
          id="repoUrl"
          placeholder="https://github.com/username/repository"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <button
          type="submit"
          className="w-full py-2.5 bg-cyan-400 text-slate-900 font-semibold rounded-lg shadow-md hover:bg-cyan-300 transition-all"
        >
          Analyze Repository
        </button>
      </form>

      <footer className="mt-10 text-sm text-slate-500">
        © 2025 CodebaseGenius — Empowering developers through intelligent code understanding.
      </footer>
    </div>
  );
}

export default App;
