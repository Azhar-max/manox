/**
 * Script to verify deployment URLs after deploying to Vercel and Render
 * 
 * Usage:
 * 1. Update the URLs below with your actual deployment URLs
 * 2. Run: node verify-deployment-urls.js
 */

// Import required modules
const https = require('https');

// Update these URLs with your actual deployment URLs
const VERCEL_URL = 'https://your-vercel-project.vercel.app';
const RENDER_API_URL = 'https://your-render-service.onrender.com/api';

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

// Function to make HTTP request
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data
        });
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Function to check URL
async function checkUrl(url, name) {
  console.log(`${colors.blue}Checking ${name}:${colors.reset} ${url}`);
  
  try {
    const response = await makeRequest(url);
    
    if (response.statusCode >= 200 && response.statusCode < 300) {
      console.log(`${colors.green}✓ ${name} is accessible (Status: ${response.statusCode})${colors.reset}`);
      
      // For API endpoints, try to parse JSON
      if (url.includes('/api')) {
        try {
          const jsonData = JSON.parse(response.data);
          console.log(`${colors.green}  ✓ API returned valid JSON${colors.reset}`);
        } catch (parseError) {
          console.log(`${colors.yellow}  ⚠ API did not return valid JSON${colors.reset}`);
        }
      }
      
      return true;
    } else {
      console.log(`${colors.red}✗ ${name} returned status ${response.statusCode}${colors.reset}`);
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}✗ ${name} is not accessible: ${error.message}${colors.reset}`);
    return false;
  }
}

// Function to check health endpoints
async function checkHealthEndpoints() {
  console.log(`${colors.blue}\n=== Checking Health Endpoints ===${colors.reset}\n`);
  
  const checks = [
    {
      url: `${VERCEL_URL}`,
      name: 'Vercel Frontend'
    },
    {
      url: `${RENDER_API_URL}/health`,
      name: 'Render Backend Health'
    }
  ];
  
  let allPassed = true;
  
  for (const check of checks) {
    const passed = await checkUrl(check.url, check.name);
    if (!passed) allPassed = false;
    console.log(''); // Empty line for spacing
  }
  
  return allPassed;
}

// Function to check API endpoints
async function checkApiEndpoints() {
  console.log(`${colors.blue}=== Checking API Endpoints ===${colors.reset}\n`);
  
  const apiChecks = [
    {
      url: `${RENDER_API_URL}/products`,
      name: 'Products API'
    },
    {
      url: `${RENDER_API_URL}/auth/health`,
      name: 'Auth API'
    }
  ];
  
  let allPassed = true;
  
  for (const check of apiChecks) {
    const passed = await checkUrl(check.url, check.name);
    if (!passed) allPassed = false;
    console.log(''); // Empty line for spacing
  }
  
  return allPassed;
}

// Main function
async function verifyDeployment() {
  console.log(`${colors.blue}=== MANOX Deployment Verification ===${colors.reset}\n`);
  
  console.log(`${colors.yellow}Please update the VERCEL_URL and RENDER_API_URL variables in this script with your actual deployment URLs.${colors.reset}\n`);
  
  // Check if URLs are updated
  if (VERCEL_URL.includes('your-vercel-project') || RENDER_API_URL.includes('your-render-service')) {
    console.log(`${colors.yellow}⚠ Warning: URLs not updated. Please update VERCEL_URL and RENDER_API_URL in the script.${colors.reset}\n`);
    console.log(`Current URLs:`);
    console.log(`  Vercel URL: ${VERCEL_URL}`);
    console.log(`  Render API URL: ${RENDER_API_URL}`);
    console.log(`\nUpdate these variables at the top of the script and run again.`);
    return;
  }
  
  try {
    const healthPassed = await checkHealthEndpoints();
    const apiPassed = await checkApiEndpoints();
    
    console.log(`${colors.blue}=== Verification Summary ===${colors.reset}`);
    
    if (healthPassed && apiPassed) {
      console.log(`${colors.green}✓ All checks passed! Your deployment is working correctly.${colors.reset}`);
    } else {
      console.log(`${colors.red}✗ Some checks failed. Please review the issues above.${colors.reset}`);
    }
    
  } catch (error) {
    console.log(`${colors.red}✗ Verification failed: ${error.message}${colors.reset}`);
  }
}

// Run verification
verifyDeployment();