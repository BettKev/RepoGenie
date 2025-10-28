#server/agents/supervisor.jac
#This is the main agent that supervises other agents and manages overall tasks. It responsible for high-level decision making and coordination.
#It uses environment variables for configuration, including API keys for external services.


#Validate and store the input URL



#Tell the repo mapper to clone and map the repository



#Receive the file tree + summary from the repo mapper agent



#Choose which files to send to the Code Analyzer first.


#Instruct DocGenie to build the final documentation.


#Monitor overall progress and handle errors.
