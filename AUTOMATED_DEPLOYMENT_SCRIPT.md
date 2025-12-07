# Automated Deployment Script for MANOX

This guide provides a step-by-step process to deploy your MANOX e-commerce platform to Netlify (frontend) and Render (backend).

## Prerequisites

Before starting, ensure you have:

1. **GitHub Account** - Repository with your MANOX code
2. **Netlify Account** - Free account at [netlify.com](https://netlify.com)
3. **Render Account** - Free account at [render.com](https://render.com)
4. **MongoDB Atlas Account** - Free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

## Step 1: Prepare Your Repository

### 1.1 Push Code to GitHub

If you haven't already, push your code to a GitHub repository:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit for MANOX deployment"

# Create GitHub repository and push
# Replace 'your-username' and 'your-repo-name' with your actual values
git remote add origin https://github.com/your-username/your-repo-name.git
git branch -M main
git push -u origin main
```

## Step 2: MongoDB Atlas Setup

### 2.1 Create Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign in or create an account
3. Create a new project named "MANOX"
4. Build a Database:
   - Select "Shared" tier (Free)
   - Choose AWS provider and region closest to your users
   - Cluster name: "manox-cluster"
   - Click "Create Cluster"

### 2.2 Configure Database Access
1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Authentication Method: "Password"
4. Username: "manox_user"
5. Password: Create a strong password
6. Permissions: "Read and write to any database"
7. Click "Add User"

### 2.3 Configure Network Access
1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 2.4 Get Connection String
1. Click "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password

## Step 3: Render Backend Deployment

### 3.1 Create Web Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure settings:
   - **Name**: manox-backend
   - **Region**: Choose the region closest to your users
   - **Branch**: main
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### 3.2 Add Environment Variables
In the "Environment Variables" section, add:

```
MONGO_URI=your-mongodb-connection-string-here
JWT_SECRET=your-super-secret-jwt-key-here-change-this
FRONTEND_URL=https://manox-frontend.netlify.app
PORT=10000
```

### 3.3 Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete (5-10 minutes)
3. Note your Render URL (e.g., https://manox-backend.onrender.com)

## Step 4: Netlify Frontend Deployment

### 4.1 Create Site
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Configure site:
   - **Site Name**: manox-frontend
   - **Base Directory**: frontend

### 4.2 Configure Build Settings
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### 4.3 Add Environment Variables
In the "Environment Variables" section, add:

```
VITE_API_URL=https://your-render-backend-url.onrender.com/api
```

(Replace with your actual Render backend URL)

### 4.4 Deploy
1. Click "Deploy site"
2. Wait for deployment to complete (2-5 minutes)
3. Note your Netlify URL (e.g., https://manox-frontend.netlify.app)

## Step 5: Update Environment Variables

### 5.1 Update Render Backend
1. Go back to your Render service
2. Click "Environment" tab
3. Edit `FRONTEND_URL` to your actual Netlify URL
4. Click "Save Changes"
5. Wait for redeployment

### 5.2 Update Netlify Frontend (if needed)
1. Go back to your Netlify site
2. Go to "Site settings" → "Environment variables"
3. Verify `VITE_API_URL` is correct
4. If you made changes, trigger a redeploy

## Step 6: Domain Configuration (Optional)

### 6.1 Custom Domain for Frontend
1. In Netlify dashboard, go to your site
2. Click "Site settings" → "Domain management"
3. Add your domain
4. Follow DNS configuration instructions

### 6.2 Custom Domain for Backend (Optional)
1. In Render dashboard, go to your service
2. Click "Settings" → "Custom Domains"
3. Add your subdomain (e.g., api.yourdomain.com)
4. Follow DNS configuration instructions

## Step 7: Final Testing

### 7.1 Website Testing
1. Visit your Netlify frontend URL
2. Test all pages and functionality:
   - Homepage
   - Product browsing
   - Shopping cart
   - Contact form
   - Chat support
   - Multi-language toggle

### 7.2 Admin Panel Testing
1. Go to `/admin/login`
2. Test all admin functionalities:
   - Dashboard statistics
   - Product management
   - Order processing
   - User management
   - Settings

### 7.3 API Testing
1. Verify frontend-backend communication
2. Test all API endpoints
3. Check database operations

## Troubleshooting Common Issues

### Issue 1: CORS Errors
**Solution**: 
- Ensure `FRONTEND_URL` in Render backend matches your Netlify URL
- Check that your frontend URL is correctly configured

### Issue 2: Database Connection Failed
**Solution**:
- Verify `MONGO_URI` is correct
- Ensure MongoDB Atlas network access allows connections from Render
- Check database user credentials

### Issue 3: API Endpoints Not Working
**Solution**:
- Check that `VITE_API_URL` points to the correct backend URL
- Verify backend is running and accessible
- Check Render logs for errors

### Issue 4: Build Failures
**Solution**:
- Check build logs in Netlify/Render dashboards
- Ensure all dependencies are correctly specified in package.json
- Verify Node.js version compatibility

## Support Resources

- **Netlify Documentation**: https://docs.netlify.com
- **Render Documentation**: https://render.com/docs
- **MongoDB Atlas Documentation**: https://docs.atlas.mongodb.com
- **MANOX Documentation**: Check project README files

## Post-Deployment Checklist

- [ ] Website accessible via URL
- [ ] Admin panel functional
- [ ] All forms submitting correctly
- [ ] Mobile responsiveness verified
- [ ] Performance optimization applied
- [ ] SSL certificates active
- [ ] Custom domain configured (if applicable)
- [ ] Backup strategy established

## Congratulations!

Your MANOX e-commerce platform is now deployed and ready for production use. The platform is running on:

- **Frontend**: Netlify (https://your-project.netlify.app)
- **Backend**: Render (https://your-service.onrender.com)
- **Database**: MongoDB Atlas

Enjoy your new e-commerce platform!