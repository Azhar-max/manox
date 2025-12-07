# Deployment Instructions

This document provides step-by-step instructions for deploying the MANOX application to Netlify (frontend) and Render (backend).

## Prerequisites

1. GitHub account
2. Netlify account
3. Render account
4. MongoDB Atlas account (or any MongoDB hosting service)

## Frontend Deployment (Netlify)

### 1. Prepare the Frontend Code

1. Ensure all code is committed and pushed to your GitHub repository
2. The `netlify.toml` file is already included in the frontend directory

### 2. Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click "New site from Git"
3. Connect your GitHub repository
4. Configure the site:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: `frontend`

### 3. Set Environment Variables in Netlify

After deployment, go to your site settings and add these environment variables:
- `VITE_API_URL` - Set this to your backend URL (e.g., `https://your-backend-url.onrender.com/api`)

## Backend Deployment (Render)

### 1. Prepare the Backend Code

1. Ensure all code is committed and pushed to your GitHub repository
2. The `render.yaml` file is already included in the backend directory

### 2. Deploy to Render

1. Go to [render.com](https://render.com) and sign in
2. Click "New" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - Name: manox-backend
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free (or choose a paid plan for production)

### 3. Set Environment Variables in Render

After deployment, go to your service settings and add these environment variables:
- `MONGO_URI` - Your MongoDB connection string
- `JWT_SECRET` - A secure random string for JWT token signing
- `FRONTEND_URL` - Your frontend URL (e.g., `https://your-frontend.netlify.app`)
- `PORT` - 10000 (already set in render.yaml)

## MongoDB Setup

### 1. Create MongoDB Atlas Account

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Create a database user
5. Add your IP address to the whitelist (or allow access from anywhere for development)
6. Get the connection string

### 2. Configure Connection String

The connection string format should be:
```
mongodb+srv://<username>:<password>@<cluster-url>/manox?retryWrites=true&w=majority
```

## Post-Deployment Steps

### 1. Update Frontend Environment Variables

After your backend is deployed and you have the URL:
1. Go to your Netlify site settings
2. Update the `VITE_API_URL` environment variable to point to your Render backend
3. Trigger a redeploy of the frontend

### 2. Seed the Database

After your backend is running:
1. Connect to your MongoDB database
2. Run the seed script to populate products:
   ```bash
   cd backend
   node seed.js
   ```

### 3. Create Admin User

1. Register a new user through the frontend
2. Update the user's role to "admin" in the database:
   ```javascript
   db.users.updateOne(
     { email: "your-admin-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `FRONTEND_URL` is correctly set in your backend environment variables
2. **Database Connection Issues**: Verify your MongoDB connection string and IP whitelist
3. **Environment Variables Not Loading**: Check that all environment variables are correctly set in both Netlify and Render

### Logs and Monitoring

- Check Netlify logs in the Netlify dashboard
- Check Render logs in the Render dashboard
- Monitor MongoDB Atlas for connection issues

## Updating the Application

To update your deployed application:

1. Push changes to your GitHub repository
2. Netlify will automatically redeploy the frontend
3. Render will automatically redeploy the backend
4. For environment variable changes, you'll need to manually trigger a redeploy

## Cost Considerations

- Netlify: Free tier available with some limitations
- Render: Free tier available with some limitations
- MongoDB Atlas: Free tier available with 512MB storage

For production use, consider upgrading to paid plans for better performance and reliability.