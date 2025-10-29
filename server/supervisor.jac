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

        owner = parts[3];
        repo = parts[4];

        # Inline pythin helper to send a get request to github api to check if repo exists
        ::py::
        import requests
        result = {"exists": False, "private": False, "error": None}
        github_api_url = f"https://api.github.com/repos/{owner}/{repo}"
        try:
            resp = requests.get(github_api_url)
            if resp.status_code == 200:
                data = resp.json()
                result["exists"] = True
                result["private"] = data.get("private", False)
            elif resp.status_code == 404:
                result["exists"] = False
            else:
                result["error"] = f"Unexpected status {resp.status_code}"
        except Exception as e:
            result["error"] = str(e)
        ::py::

        # Handle the GitHub API result
        if not result["exists"]{
            msg = result.get("error") or f"Repository '{owner}/{repo}' does not exist on GitHub or is private.";
            report {
                "status": "failed",
                "message": msg,
                "repo_url": self.repo_url
            };
            return;
        }

        if result["private"]{
            report {
                "status": "failed",
                "message": f"Repository '{owner}/{repo}' is private. Only public repos are allowed.",
                "repo_url": self.repo_url
            };
            return;
        }

        if result["exists"] and not result["private"] {
        # Store only if valid
        new_repo = Repo(repo_url=self.repo_url);
        here ++> new_repo;

        report {
            "status": "success",
            "message": "Repository validated and stored successfully.",
            "repo_url": self.repo_url
        };
        } else {
            report {
                "status": "failed",
                "message": "Repository validation failed. Not stored.",
                "repo_url": self.repo_url
            };
        }
    }
}

#Tell the repo mapper to clone and map the repository



#Receive the file tree + summary from the repo mapper agent



#Choose which files to send to the Code Analyzer first.


#Instruct DocGenie to build the final documentation.


#Monitor overall progress and handle errors.
