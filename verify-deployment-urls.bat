@echo off
echo ==================================================
echo MANOX Deployment URL Verification
echo ==================================================
echo This script will verify that your deployment URLs
echo are accessible after deploying to Vercel and Render.
echo.

REM Check if node is available
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Running deployment URL verification...
echo.

REM Run the verification script
node verify-deployment-urls.js

echo.
echo ==================================================
echo Verification complete.
echo ==================================================
echo.

pause