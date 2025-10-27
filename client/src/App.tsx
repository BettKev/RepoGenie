import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl.trim()) {
      toast("Please enter a valid GitHub repository URL.");
      return;
    }

    setIsLoading(true);

    // Simulate backend call
    setTimeout(() => {
      console.log("Repository submitted:", repoUrl);
      setIsLoading(false);
      toast("Repository analysis started!");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-gray-100 px-4">
      <header className="text-center max-w-2xl mb-10">
        <h1 className="text-4xl font-extrabold mb-4 text-indigo-400">
          CodeBase Genius
        </h1>
        <p className="text-lg leading-relaxed text-gray-300">
          Codebase Genius is an agentic platform built on the{" "}
          <span className="font-semibold text-indigo-300">
            JAC programming language
          </span>
          . It uses intelligent agents to analyze public GitHub repositories
          and generate comprehensive documentation of the codebase.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 shadow-xl rounded-2xl p-6 w-full max-w-md flex flex-col space-y-4 border border-gray-700"
      >
        <label
          htmlFor="repoUrl"
          className="text-gray-200 font-medium text-sm uppercase tracking-wide"
        >
          Repository URL
        </label>

        <input
          type="text"
          id="repoUrl"
          placeholder="https://github.com/username/repository"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className="bg-gray-900 border border-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-500"
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`${
            isLoading
              ? "bg-indigo-500 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          } text-white font-semibold py-2 rounded-lg transition duration-200`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing...</span>
            </div>
          ) : (
            "Analyze Repository"
          )}
        </button>
      </form>

      <footer className="mt-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} CodeBase Genius. All rights reserved.
      </footer>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
