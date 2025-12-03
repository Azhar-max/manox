# Netlify Deployment Guide for MANOX

This guide will help you deploy the MANOX e-commerce platform frontend to Netlify while keeping the backend on Render.

## Prerequisites

1. A Netlify account (free tier available)
2. A GitHub account with the MANOX repository
3. The backend already deployed to Render (see DEPLOYMENT_VERCEL_RENDER.md for backend deployment)

## Deployment Steps

### 1. Connect Netlify to Your GitHub Repository

1. Go to https://app.netlify.com/
2. Sign in or create an account
3. Click "Add new site" → "Import an existing project"
4. Click "GitHub" to connect your GitHub account
5. Select your MANOX repository

### 2. Configure Build Settings

Netlify should automatically detect the settings, but verify the following:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Base directory**: Leave empty or set to `frontend`

If automatic detection fails, manually configure these settings.

### 3. Set Environment Variables

Go to Site settings → Build & deploy → Environment and add these variables:

```
VITE_API_URL=https://YOUR_RENDER_BACKEND_URL.onrender.com/api
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here
```

Replace `YOUR_RENDER_BACKEND_URL` with your actual Render backend URL.

### 4. Deploy

Click "Deploy site". Netlify will:

1. Clone your repository
2. Run `npm install`
3. Run `npm run build`
4. Deploy the contents of the `dist` folder

### 5. Update Backend CORS Settings

After deployment, update your Render backend environment variables:

1. Go to your Render dashboard
2. Click on your MANOX backend service
3. Go to "Environment" in the sidebar
4. Update `FRONTEND_URL` to your Netlify site URL:
   - `FRONTEND_URL = https://your-site-name.netlify.app`

### 6. Redeploy Backend

1. In your Render dashboard, click "Manual Deploy" → "Deploy latest commit"
2. Wait for deployment to complete

## Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the instructions to configure DNS records with your domain provider

## Troubleshooting

### Common Issues

1. **Build failures**: Check the build logs in Netlify for specific error messages
2. **API calls failing**: Ensure `VITE_API_URL` is correctly set in Netlify environment variables
3. **CORS errors**: Verify `FRONTEND_URL` is correctly set in Render environment variables
4. **Missing assets**: Check that the publish directory is set to `dist`

### Checking Build Logs

1. Go to your Netlify site dashboard
2. Click "Deploys" in the top navigation
3. Click on the deploy you want to investigate
4. Click "Show log" to see detailed build output

### Testing Locally

Before deploying, you can test the build locally:

```bash
cd frontend
npm install
npm run build
npm run preview
```

## Redirects and Rewrites

The `netlify.toml` file in your frontend directory handles redirects:

1. All `/api/*` requests are proxied to your Render backend
2. All other requests are redirected to `index.html` for client-side routing

## Performance Optimization

Netlify automatically:
- Serves assets with proper caching headers
- Compresses assets with gzip
- Distributes content through a CDN

For additional optimization:
1. Minimize bundle sizes by removing unused dependencies
2. Optimize images
3. Use lazy loading for components

## Monitoring and Analytics

Netlify provides:
- Automatic SSL certificates
- Performance analytics
- Form handling (if you use Netlify Forms)
- Split testing capabilities

Enable these features in your site settings as needed.

## Updating Your Site

To update your deployed site:

1. Push changes to your GitHub repository
2. Netlify will automatically trigger a new build
3. Or manually trigger a deploy from the Netlify dashboard

## Rollbacks

If something goes wrong:
1. Go to Deploys in your Netlify dashboard
2. Find a previous working deploy
3. Click "Publish deploy" to rollback

## Support

For issues with Netlify deployment:
1. Check Netlify's official documentation: https://docs.netlify.com/
2. Review build logs for error messages
3. Consult the Netlify community forums