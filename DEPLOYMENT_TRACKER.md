# MANOX Deployment Tracker

Use this checklist to track your deployment progress to Vercel (frontend) and Render (backend).

## Pre-Deployment Tasks

### GitHub Repository
- [ ] Create GitHub repository
- [ ] Push code to GitHub repository
  ```bash
  git remote add origin https://github.com/your-username/your-repo-name.git
  git branch -M main
  git push -u origin main
  ```

### MongoDB Atlas Setup
- [ ] Create MongoDB Atlas account
- [ ] Create project named "MANOX"
- [ ] Create free cluster
- [ ] Create database user
- [ ] Configure network access (0.0.0.0/0)
- [ ] Get connection string
  ```
  mongodb+srv://manox_user:<password>@your-cluster-url/manox?retryWrites=true&w=majority
  ```

## Render Backend Deployment

### Create Web Service
- [ ] Go to https://render.com
- [ ] Click "New" → "Web Service"
- [ ] Connect GitHub repository
- [ ] Configure service:
  - Name: manox-backend
  - Region: [Choose closest to users]
  - Branch: main
  - Root Directory: backend
  - Environment: Node
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Instance Type: Free

### Add Environment Variables
- [ ] Add these environment variables:
  ```
  MONGO_URI=[Your MongoDB connection string]
  JWT_SECRET=[Strong secret key - at least 32 characters]
  FRONTEND_URL=[Placeholder - will update after Vercel deployment]
  PORT=10000
  ```

- [ ] Click "Create Web Service"
- [ ] Wait for deployment to complete
- [ ] Note Render URL: ________________________________

## Vercel Frontend Deployment

### Create Project
- [ ] Go to https://vercel.com
- [ ] Click "New Project"
- [ ] Import GitHub repository
- [ ] Configure project:
  - Project Name: manox-frontend
  - Framework Preset: Vite
  - Root Directory: frontend
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Install Command: `npm install`

### Add Environment Variables
- [ ] Add this environment variable:
  ```
  VITE_API_URL=[Placeholder - will update after Render deployment]
  ```

- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Note Vercel URL: ________________________________

## Update Environment Variables

### Update Render Backend
- [ ] Go to Render dashboard
- [ ] Click on manox-backend service
- [ ] Go to "Environment" tab
- [ ] Update `FRONTEND_URL` to your Vercel URL:
  ```
  https://your-vercel-project.vercel.app
  ```
- [ ] Click "Save Changes"
- [ ] Wait for redeployment

### Update Vercel Frontend
- [ ] Go to Vercel dashboard
- [ ] Click on manox-frontend project
- [ ] Go to "Settings" → "Environment Variables"
- [ ] Update `VITE_API_URL` to your Render URL + `/api`:
  ```
  https://your-render-service.onrender.com/api
  ```
- [ ] Redeploy project

## Final Testing

### Website Functionality
- [ ] Visit Vercel URL
- [ ] Test homepage
- [ ] Browse products
- [ ] Test shopping cart
- [ ] Submit contact form
- [ ] Test chat support
- [ ] Test multi-language toggle

### Admin Panel
- [ ] Go to `/admin/login`
- [ ] Test admin login
- [ ] Test dashboard
- [ ] Test product management
- [ ] Test order management
- [ ] Test user management
- [ ] Test settings

## Post-Deployment Tasks

### Domain Configuration (Optional)
- [ ] Configure custom domain for frontend (Vercel)
- [ ] Configure custom domain for backend (Render - optional)

### Security
- [ ] Update MongoDB network access to specific IPs (instead of 0.0.0.0/0)
- [ ] Rotate JWT secret if using default
- [ ] Verify HTTPS is working

### Monitoring
- [ ] Set up uptime monitoring
- [ ] Configure error tracking
- [ ] Set up performance monitoring

## Deployment Complete

- [ ] All checklist items completed
- [ ] Website is accessible and functional
- [ ] Admin panel is accessible and functional
- [ ] All environment variables are correctly set
- [ ] Database is properly connected
- [ ] API endpoints are working

🎉 **Congratulations! Your MANOX e-commerce platform is now deployed and ready for production use.**