### CodeBase Genius

This is a mutliagent platform that receives a public github repository url and analyzes the codebasse generating a detailed documentation of the repository structure.

There are four main agents that work together to achieve the goal:
Code Analyzer
Dec Genie
Repo Mapper
Supervisor

## Environmental Variable
Inside .env include the following directory "server":

GEMINI_API_KEY = ""

## Frontend Activation
The front end is an SPA built with react vite.
Inside the root of the project to activate the frontend use the following command.

Navigate to client directory

cd client/

Run the install command

npm install

Start server in localhost

npm run dev

To build the frontend you can use

npm run build

Backend activation
The backend is a Jac based server
In cloud deployment the Dockerfile is used for orchestration just point to the server directory as the root directory in deployment setting

Inside the root of the project to activate the backend use the following command.

Activate virtual environment - only do this the first time you are setting up the project
In linux
source venv/bin/activate

Navigate to the server directory

cd server/

Install dependencies

pip install -r requirements.txt

Start the backend server

jac serve main.jac

For subsequent activations
Navigate to the server directory

cd server/

Start the backend server using the bash script by running

./start.sh

If the start script fails to run you may get this error
-bash: ./start.sh: Permission denied
Fix this by running

chmod +x start.sh

Then proceed to start the server using

./start.sh
