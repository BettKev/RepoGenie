# Start virtual environment
echo "Starting Virual environment wait 5 seconds to activate"
source ../venv/bin/activate

# Pause for 5 seconds to activate the virtual environment
sleep 5

# Start the JAC server
jac serve main.jac