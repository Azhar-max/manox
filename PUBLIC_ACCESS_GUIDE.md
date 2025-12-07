# Getting a Public URL for Your MANOX Website

This guide explains how to make your MANOX website accessible to anyone on the internet using the deployment files we've prepared.

## Overview

To make your website publicly accessible, you need to deploy it to hosting services that provide public URLs. We've prepared your project for deployment to:

1. **Frontend**: Netlify (https://netlify.com)
2. **Backend**: Render (https://render.com)
3. **Database**: MongoDB Atlas (https://cloud.mongodb.com)

Once deployed, you'll get a public URL like:
- Frontend: `https://your-project.netlify.app`
- Backend: `https://your-backend.onrender.com`

## Step-by-Step Process

### 1. Prepare Your Code Repository

1. Ensure all files are committed:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   ```

2. Push to GitHub:
   ```bash
   git push origin main
   ```

### 2. Deploy to Netlify (Frontend)

1. Go to [netlify.com](https://netlify.com) and sign up/sign in
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Use these settings:
   - Base directory: frontend
   - Build command: `npm run build`
   - Publish directory: dist

5. Deploy and note the URL provided by Netlify

### 3. Deploy to Render (Backend)

1. Go to [render.com](https://render.com) and sign up/sign in
2. Click "New" → "Web Service"
3. Connect to your GitHub repository
4. Use these settings:
   - Name: manox-backend
   - Runtime: Node
   - Root Directory: backend
   - Build Command: `npm install`
   - Start Command: `npm start`

5. Add environment variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A random secure string
   - `FRONTEND_URL`: Your Netlify URL (from step 2)
   - `PORT`: 10000

6. Deploy and note the URL provided by Render

### 4. Update Environment Variables

1. In Netlify, update `VITE_API_URL` to your Render backend URL
2. In Render, ensure `FRONTEND_URL` matches your Netlify URL
3. Redeploy both services

### 5. Seed Your Database

Run the seed script to populate products:
```bash
cd backend
node seed.js
```

### 6. Create Admin User

1. Register through your frontend
2. Update the user's role to "admin" in MongoDB

## Alternative Solutions (For Quick Testing)

If you need a quick public URL for testing without full deployment:

### Option 1: Use Vite's Network URL
While your development server is running, it shows a network URL:
```
➜  Network: http://192.168.1.100:5173/
```
Anyone on the same network can access this URL.

### Option 2: Port Forwarding
1. Configure your router to forward port 5173 to your computer
2. Find your public IP address
3. Share: `http://YOUR_PUBLIC_IP:5173`

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `FRONTEND_URL` in Render matches your Netlify URL exactly
2. **API Not Working**: Check that `VITE_API_URL` in Netlify points to your Render backend
3. **No Products Showing**: Verify database was seeded correctly
4. **Admin Login Failed**: Ensure admin user was created with correct role

### Checking Deployment Status

1. **Netlify**: Check logs in Netlify dashboard
2. **Render**: Check logs in Render dashboard
3. **MongoDB**: Check connection in MongoDB Atlas dashboard

## Final Result

After successful deployment, you'll have:
- A public URL anyone can visit (e.g., `https://manox-yourname.netlify.app`)
- A fully functional e-commerce site
- Admin panel accessible at `/admin`
- All products displayed with images
- Working shopping cart and checkout

## Next Steps

1. Test all functionality thoroughly
2. Share the URL with friends/family for feedback
3. Monitor usage and performance
4. Consider upgrading to paid plans for production use

## Support

For detailed deployment instructions, refer to:
- `DEPLOYMENT_INSTRUCTIONS.md` - Step-by-step deployment guide
- `FINAL_DEPLOYMENT_GUIDE.md` - Complete deployment documentation

Your website will be accessible to anyone in the world once deployed using this guide!