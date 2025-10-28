#server/supervisor.jac
import from main {Repo}
#This is the main agent that supervises other agents and manages overall tasks. It responsible for high-level decision making and coordination.
#It uses environment variables for configuration, including API keys for external services.


# Supervisor Agent — handles high-level orchestration.
# Step 1: Validate and store the input repository URL.

walker validate_repo_url {
    has repo_url: str;

    obj __specs__ {
        static has auth: bool = False;
        static has methods: list = ["post"];
        static has path: str = "/validate_repo_url";
    }

    # Receive the url from frontend
    can receive_url with `root entry {
        if self.repo_url != "" {
            report {
                "status": "good",
                "message": "Repo URL received successfully.",
                "repo_url": self.repo_url
            };
        } else {
            report {
                "status": "failed",
                "message": "Missing or empty 'repo_url'."
            };
        }
    }

    # Create a new Repo node to store the URL
    can store_url with `root entry {
        new_repo = Repo(
            repo_url=self.repo_url
            );
    
    here ++> new_repo;
    
        report {
            "status": "success",
            "message": "Repo URL stored in Repo node."
        };
    }

}


#Tell the repo mapper to clone and map the repository



#Receive the file tree + summary from the repo mapper agent



#Choose which files to send to the Code Analyzer first.


#Instruct DocGenie to build the final documentation.


#Monitor overall progress and handle errors.
