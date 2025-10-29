import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl.trim()) {
      toast.error("Please enter a valid GitHub repository URL.", {
        position: "top-right",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://repogenie.onrender.com/validate_repo_url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repo_url: repoUrl }),
      });

      const data = await response.json();

      if (response.ok && data.reports?.[0]) {
        const report = data.reports[0];
        if (report.status === "success") {
          toast.success(report.message || "Repository validated successfully!", {
            position: "top-right",
          });
        } else {
          toast.error(report.message || "Repository validation failed.", {
            position: "top-right",
          });
        }
      } else {
        toast.error("Unexpected response from server.", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error validating repository:", error);
      toast.error("Failed to reach the backend. Is it running?", {
        position: "top-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 font-sans transition-all">
      {/* NAVBAR */}
      <nav className="w-full bg-gray-900/60 backdrop-blur-md border-b border-gray-800 fixed top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-400">
            CodeBase Genius
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
            <li>
              <a href="#features" className="hover:text-indigo-400 transition">
                Features
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="hover:text-indigo-400 transition">
                How It Works
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-indigo-400 transition">
                Contact
              </a>
            </li>
          </ul>

          {/* GitHub Button (Desktop) */}
          <a
            href="https://github.com/BettKev/RepoGenie.git"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-semibold text-white transition"
          >
            GitHub
          </a>

          {/* Hamburger Menu (Mobile) */}
          <button
            className="md:hidden text-gray-200 border border-gray-600 px-3 py-1 rounded-lg text-sm"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-gray-900/90 backdrop-blur-md border-t border-gray-800 px-6 py-4 space-y-3 text-gray-300">
            <a
              href="#features"
              className="block hover:text-indigo-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block hover:text-indigo-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#contact"
              className="block hover:text-indigo-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
            <a
              href="https://github.com/BettKev/RepoGenie.git"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-indigo-400 font-semibold mt-2"
              onClick={() => setMenuOpen(false)}
            >
              Visit GitHub
            </a>
          </div>
        )}
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-32 pb-16 text-center">
        <h1 className="text-5xl font-extrabold mb-6 text-indigo-400 tracking-tight">
          CodeBase Genius
        </h1>
        <p className="text-lg leading-relaxed text-gray-300 max-w-2xl mb-12">
          An{" "}
          <span className="font-semibold text-indigo-300">
            agentic intelligence platform
          </span>{" "}
          built on the{" "}
          <span className="font-semibold text-indigo-300">JAC language</span>,
          designed to analyze public GitHub repositories and generate
          comprehensive documentation automatically.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md flex flex-col space-y-5 border border-gray-700 animate-fade-in"
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
            className="bg-gray-900 border border-gray-700 text-gray-100 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-500 transition"
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`${
              isLoading
                ? "bg-indigo-500 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            } text-white font-semibold py-3 rounded-lg transition duration-300 shadow-lg hover:shadow-indigo-700/30`}
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
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900/70 border-t border-gray-800 py-8 text-center text-gray-400 text-sm">
        <div className="max-w-5xl mx-auto space-y-3">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-indigo-400 font-medium">CodeBase Genius</span>
            . All rights reserved.
          </p>
          <p className="text-xs">
            Built with React + TailwindCSS + JAC Intelligence
          </p>
          <div className="flex justify-center space-x-6 text-gray-500 mt-2">
            <a href="#" className="hover:text-indigo-400">
              Twitter
            </a>
            <a href="#" className="hover:text-indigo-400">
              LinkedIn
            </a>
            <a href="#" className="hover:text-indigo-400">
              GitHub
            </a>
          </div>
        </div>
      </footer>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        toastClassName="bg-gray-800 text-gray-100"
      />
    </div>
  );
}

export default App;
