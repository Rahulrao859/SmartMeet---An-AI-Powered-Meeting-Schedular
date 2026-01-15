@echo off
echo ================================================
echo    SmartMeet - Starting Application
echo ================================================
echo.

REM Check if .env file exists
if not exist ".env" (
    echo [ERROR] .env file not found!
    echo Please create .env file and add your credentials.
    echo See SETUP_GUIDE.md for instructions.
    pause
    exit /b 1
)

REM Check if GEMINI_API_KEY is configured
findstr /C:"GEMINI_API_KEY=your_actual_gemini_api_key_here" .env >nul
if %errorlevel% equ 0 (
    echo [WARNING] .env file still has placeholder values!
    echo Please update .env with your actual credentials.
    echo.
    echo Press any key to continue anyway, or Ctrl+C to exit...
    pause >nul
)

echo [INFO] Starting Backend Server (Port 5000)...
echo.
start "SmartMeet Backend" cmd /k "cd backend && npm start"

timeout /t 3 /nobreak >nul

echo [INFO] Starting Frontend Server (Port 5173)...
echo.
start "SmartMeet Frontend" cmd /k "npm run dev"

echo.
echo ================================================
echo    Both servers are starting!
echo ================================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Two terminal windows should have opened.
echo Wait a few seconds, then open: http://localhost:5173
echo.
echo Press any key to exit this window...
pause >nul
