#server/supervisor.jac
#This is the main agent that supervises other agents and manages overall tasks. It responsible for high-level decision making and coordination.
#It uses environment variables for configuration, including API keys for external services.
# Supervisor Agent — handles high-level orchestration.
# Step 1: Validate and store the input repository URL.

import from main {Repo}

walker validate_repo_url {
    has repo_url: str;

    obj __specs__ {
        static has auth: bool = False;
        static has methods: list = ["post"];
        static has path: str = "/validate_repo_url";
    }

    # Receive the url from frontend
    can receive_url with `root entry {
        if self.repo_url == "" or self.repo_url == None {
            report {
                "status": "failed",
                "message": "Missing or empty 'repo_url'."
            };
            return;
        }

        if not self.repo_url.startswith("https://github.com/") {
            report {
                "status": "failed",
                "message": "Invalid 'repo_url'. Must start with 'https://github.com/'.",
                "repo_url": self.repo_url
            };
            return;
        }
        
        parts = self.repo_url.split("/");

        # Ensure format is https://github.com/{owner}/{repo}
        if len(parts) < 5 or parts[3] == "" or parts[4] == "" {
            report {
                "status": "failed",
                "message": "Invalid repository URL. Must be in the format 'https://github.com/{owner}/{repo}'.",
                "repo_url": self.repo_url
            };
            return;
        }

        # If all checks pass
        report {
            "status": "success",
            "message": "Valid repository URL received.",
            "repo_url": self.repo_url,
            "owner": parts[3],
            "repo": parts[4]
        };
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
