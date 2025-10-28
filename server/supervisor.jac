#server/supervisor.jac
#This is the main agent that supervises other agents and manages overall tasks. It responsible for high-level decision making and coordination.
#It uses environment variables for configuration, including API keys for external services.


# Supervisor Agent — handles high-level orchestration.
# Step 1: Validate and store the input repository URL.

walker validate_repo_url {
    obj __specs__ {
        static has methods:list = ["post"];
        static has auth:bool = False;
        static has path:str = "/validate_repo_url";
    }

    can post_validate with `root entry{
        # ---Validate the URL format ---
        if not (repo_url.startswith("https://github.com/") or repo_url.startswith("git@github.com:")) {
            report {
                "status": "error",
                "message": "Invalid GitHub URL. Must start with https://github.com/ or git@github.com:"
            };
            stop;
        }

        # ---Extract repository name ---
        repo_name = repo_url.split("/")[-1];
        if repo_name.endswith(".git") {
            repo_name = repo_name[:-4];
        }

        # ---Create Repo node instance ---
        repo_node = spawn Repo(
            repo_url = repo_url,
            repo_name = repo_name,
            status = "validated",
            created_at = datetime.now()
        );

        # ---Return success message ---
        report {
            "status": "success",
            "message": f"Repository URL validated successfully.",
            "repo_name": repo_name,
            "repo_url": repo_url
        };
    }
}


#Tell the repo mapper to clone and map the repository



#Receive the file tree + summary from the repo mapper agent



#Choose which files to send to the Code Analyzer first.


#Instruct DocGenie to build the final documentation.


#Monitor overall progress and handle errors.
