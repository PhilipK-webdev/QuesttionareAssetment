#!/bin/bash

# Run Flask server on port 5001 (to avoid conflict with macOS AirPlay)
cd "$(dirname "$0")"
export PORT=5001
venv/bin/python app.py
