#!/bin/bash
# Netlify build script for MANOX frontend

echo "Starting Netlify build process for MANOX..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project
echo "Building the project..."
npm run build

echo "Build completed successfully!"