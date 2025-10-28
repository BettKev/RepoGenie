import from byllm.llm { Model };
import from dotenv { load_dotenv };
import os;

# Load environment variables
load_dotenv();

# Initialize LLM model
glob llm = Model(
    model_name = "gemini-2.0-flash",
    provider = "google",
    api_key = os.getenv("GEMINI_API_KEY"),
    verbose = false
);

