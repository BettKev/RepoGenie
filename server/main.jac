#server/main.jac
import from byllm.llm { Model }
import from dotenv { load_dotenv }
import os;


# Initialize LLM model
# glob llm = Model(
#     model_name = "gemini-2.0-flash",
#     provider = "google",
#     api_key = (os.getenv("GOOGLE_API_KEY")),
#     verbose = False
# );

glob llm = Model(model_name="gemini/gemini-2.0-flash");

node Repo{
    has repo_url:str = ""; #The GitHub link input by the user.
    has repo_name:str = ""; #extracted from the url
    has local_path:str = ""; #where the repo is cloned locally
    has status:str = ""; #current state (e.g. "initialized", "mapped", "analyzed", "documented")
    has created_at:datetime = ""; #timestamp for tracking
}

node FileTree{
    has tree_data:list = []; #a JSON/tree-like structure (list of files/folders).
    has ignored_dirs:list = []; #list of directories skipped (e.g., .git, node_modules).
    has total_files:int = 0; #numeric count for quick reference.
}

node ReadMe {
    has original_text:str = ""; #full text of the README (raw).
    has summary:str = ""; #concise LLM-generated summary.
    has key_topics:list = []; #list of extracted keywords or main ideas.
}

node CodeGraph {
    has functions:list = []; #list of discovered functions and metadata.
    has classes:list = []; #list of classes with inheritance details.
    has relations:list = []; #list of edges showing who calls or imports whom.
    has language:str = ""; #detected programming language(s).
}

node Documentation{
    has markdown_content:str = ""; #full text of generated documentation.
    has output_path:str = ""; #where the markdown file is saved locally.
    has summary_points:str = ""; #optional bullet list of key sections.
    has status:str = ""; #generation status (“in_progress”, “complete”, “failed”).
}

# Include agents after nodes are defined to avoid circular dependencies
include supervisor;
include repomapper;
include docgenie;
include codeanalyzer;

# Example walker endpoint to check server status
walker ping_server {
    obj __specs__ {
        static has methods:list = ["get"];
        static has auth:bool = False;
        static has path:str = "/";
    }

    can get_ping with `root entry{
        report{
            "message": "CodeBase Genius JAC backend is running!"
        };
    }
}

with entry{
    # Load environment variables
load_dotenv();
}

