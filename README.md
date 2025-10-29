# CodeBase Genius

This is a mutliagent platform that receives a public github repository url and analyzes the codebasse generating a detailed documentation of the repository structure.

There are four main agents that work together to achieve the goal:
* *** Code Analyzer ***
* *** Doc Genie ***
* *** Repo Mapper ***
* *** Supervisor ***

## Environmental Variable
Include the following inside directory "server":

Create a .env file and add the following variable

GEMINI_API_KEY = "your_public_api_key" 

You can get this key from https://aistudio.google.com/apikey

## Frontend Activation
The front end is an SPA built with react vite.
Inside the root of the project to activate the frontend use the following command.

Navigate to client directory

```bash
cd client/
```

Run the install command

```bash
npm install
```

Start server in localhost

```bash
npm run dev
```

You can also run the "start script"

```bash
./start.sh
```

If the start script fails to run you may get this error
-bash: ./start.sh: Permission denied
Fix this by running

```bash
chmod +x start.sh
```

Then proceed to start the server using

```bash
./start.sh
```

To build the frontend you can use

```bash
npm run build
```
## Backend activation
The backend is a Jac based server
In cloud deployment the Dockerfile is used for orchestration just point to the server directory as the root directory in deployment setting

Inside the root of the project to activate the backend use the following command.

Activate virtual environment - only do this the first time you are setting up the project
In linux

```bash
source venv/bin/activate
```
Navigate to the server directory

```bash
cd server/
```
Install dependencies

```bash
pip install -r requirements.txt
```
Start the backend server

```bash
jac serve main.jac
```
For subsequent activations
Navigate to the server directory

```bash
cd server/
```
Start the backend server using the bash script by running

```bash
./start.sh
```
If the start script fails to run you may get this error
-bash: ./start.sh: Permission denied
Fix this by running

```bash
chmod +x start.sh
```
Then proceed to start the server using

```bash
./start.sh
```