@echo off
REM Netlify build script for MANOX frontend (Windows)

echo Starting Netlify build process for MANOX...

REM Install dependencies
echo Installing dependencies...
npm install

REM Build the project
echo Building the project...
npm run build

echo Build completed successfully!