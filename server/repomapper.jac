#server/agents/repomapper.jac
#This agent is responsible for cloning the repository from the provided URL,
#mapping its file structure, and generating a summary of its contents.
#It interacts with the Supervisor agent to receive instructions and send back results.

#Clone the repository from the given URL to a temporary location




#Filter out irrelevant folders (e.g., .git, __pycache__, node_modules).




#Produce a clean file/directory map and a file tree.




#Generate a summary of the repository's purpose and main components from the README using LLM.