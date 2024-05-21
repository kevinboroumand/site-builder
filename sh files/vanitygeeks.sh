#!/bin/bash

# Kill all Flask instances
pkill -f "flask"

# Release port 5000
sudo lsof -t -i:5000 | xargs kill -9

# Activate Python3 virtual environment (Remove or replace the next line if you're not using a venv)
source /path/to/python3/venv/bin/activate

# Define the Flask application
export FLASK_APP=app.py

# Navigate to your Flask app directory
cd /Users/kevinboroumand/Library/CloudStorage/OneDrive-Personal/repos/SiteBuilder

# Start Flask server with Python 3
python3 -m flask run &

# Wait for Flask server to start
sleep 2

# Open the home page in the default browser
open http://127.0.0.1:5000/

# Keep the script running until interrupted
wait
