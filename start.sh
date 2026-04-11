#!/bin/bash

# IoT-based Catfish Pond Monitoring - Startup Script
# Created/Refined by Antigravity

# Set colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}==================================================${NC}"
echo -e "${BLUE}   IoT-based Catfish Pond Monitoring Startup      ${NC}"
echo -e "${BLUE}==================================================${NC}"

# 1. Check for MySQL (Dependency warning)
echo -e "${YELLOW}[1/4] Checking Database...${NC}"
echo -e "Note: This app requires a MySQL database named 'budidaya_lele'."
echo -e "      Ensure MySQL is running on localhost."

# 2. Setup Backend
echo -e "${YELLOW}[2/4] Setting up Backend...${NC}"
if [ ! -d "backend/venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv backend/venv
fi

source backend/venv/bin/activate
echo "Installing backend dependencies..."
pip install -r backend/requirement.txt --quiet

# 3. Setup Frontend
echo -e "${YELLOW}[3/4] Setting up Frontend...${NC}"
cd Frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies (this may take a while)..."
    npm install --silent
fi
cd ..

# 4. Running Application
echo -e "${GREEN}[4/4] Starting Application...${NC}"

# Function to kill processes on exit
cleanup() {
    echo -e "\n${RED}Shutting down processes...${NC}"
    kill $BACKEND_PID $FRONTEND_PID
    exit
}

trap cleanup SIGINT SIGTERM

# Start Backend
echo -e "Starting Backend (FastAPI)..."
cd backend
source venv/bin/activate
# Using nohup to keep it running and redirect logs
export PYTHONPATH=$PYTHONPATH:$(pwd)
uvicorn app.main:app --reload --port 8000 > backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Start Frontend
echo -e "Starting Frontend (Vite)..."
cd Frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo -e "${GREEN}==================================================${NC}"
echo -e "${GREEN}   Application is running!                         ${NC}"
echo -e "${GREEN}   Backend: http://localhost:8000                  ${NC}"
echo -e "${GREEN}   Frontend: http://localhost:5173                 ${NC}"
echo -e "${GREEN}   Logs saved to: backend/backend.log              ${NC}"
echo -e "${GREEN}   Press Ctrl+C to stop both processes.            ${NC}"
echo -e "${GREEN}==================================================${NC}"

# Keep script running to maintain the trap
wait
