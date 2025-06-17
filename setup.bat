@echo off
echo Setting up The ToolBox...

:: Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Python is not installed! Please install Python 3.8 or higher.
    pause
    exit /b 1
)

:: Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed! Please install Node.js 14 or higher.
    pause
    exit /b 1
)

:: Setup Backend
echo Setting up backend...
cd backend
if not exist venv (
    python -m venv venv
)
call venv\Scripts\activate
pip install -r requirements.txt
start cmd /k "python app.py"

:: Setup Frontend
echo Setting up frontend...
cd ..\frontend
if not exist node_modules (
    npm install
)
start cmd /k "npm start"

echo Setup complete! The application should open in your browser shortly.
echo Backend is running on http://localhost:5000
echo Frontend is running on http://localhost:3000
pause 