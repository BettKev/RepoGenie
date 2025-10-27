function App() {

  return (
    <>
      <h1>
        Welcome to CodeBase Genius
      </h1>
      <p>
        Codebase Genius is an agentic platform running on JAC programming language.
      </p>
      <p>
        Using a collection of agents the platform can orchestarate a repository mapping to analyze the code contained within a public Github repository. You simply provide a link for the public github repository and the agents get to work to generate a comprehensive documentation of the codebase.
      </p>
      <label htmlFor="repoUrl">Repository Url</label>
      <input type="text" name="repoUrl" id="repoUrl" />
    </>
  )
}

export default App
