# MANOX Deployment Checklist

This checklist ensures all necessary steps are completed for deploying the MANOX e-commerce platform to Netlify (frontend) and Render (backend).

## Pre-Deployment Checklist

### Code Preparation
- [ ] All code pushed to GitHub repository
- [ ] Frontend builds successfully (`npm run build` in frontend directory)
- [ ] Backend dependencies installed (`npm install` in backend directory)
- [ ] All environment configuration files created:
  - [ ] `frontend/.env.production`
  - [ ] `backend/.env.production`
- [ ] Netlify configuration file exists (`frontend/netlify.toml`)
- [ ] Render configuration file exists (`backend/render.yaml`)

### Environment Variables Preparation
**Frontend (.env.production):**
- [ ] `VITE_API_URL` set to Render backend URL
- [ ] `VITE_GOOGLE_MAPS_API_KEY` (optional)

**Backend (.env.production):**
- [ ] `MONGO_URI` - MongoDB connection string
- [ ] `JWT_SECRET` - Secure JWT secret key
- [ ] `FRONTEND_URL` - Netlify frontend URL
- [ ] `PORT` - Set to 10000

## Deployment Steps

### 1. MongoDB Atlas Setup
- [ ] MongoDB cluster created
- [ ] Network access configured (0.0.0.0/0 or specific IPs)
- [ ] Database user created
- [ ] Connection string obtained

### 2. Render Backend Deployment
- [ ] Go to Render dashboard
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Configure service:
  - Name: manox-backend
  - Environment: Node
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Instance Type: Free
- [ ] Add environment variables:
  - `MONGO_URI`: [Your MongoDB connection string]
  - `JWT_SECRET`: [Your secure secret key]
  - `FRONTEND_URL`: https://your-netlify-frontend.netlify.app (placeholder)
  - `PORT`: 10000
- [ ] Deploy service
- [ ] Note Render URL (e.g., https://manox-backend.onrender.com)

### 3. Netlify Frontend Deployment
- [ ] Go to Netlify dashboard
- [ ] Create new site
- [ ] Import GitHub repository
- [ ] Configure site:
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Base directory: `frontend`
- [ ] Add environment variables:
  - `VITE_API_URL`: [Your Render backend URL + /api]
- [ ] Deploy site
- [ ] Note Netlify URL (e.g., https://manox-frontend.netlify.app)

### 4. Update Environment Variables
#### Render Backend Update
- [ ] Go to Render service dashboard
- [ ] Update `FRONTEND_URL` to actual Netlify frontend URL
- [ ] Save changes and wait for redeployment

#### Netlify Frontend Update (if needed)
- [ ] Go to Netlify site settings
- [ ] Verify `VITE_API_URL` is correct
- [ ] Trigger redeploy if changes were made

### 5. Domain Configuration (Optional)
#### Frontend Domain
- [ ] Add custom domain to Netlify site
- [ ] Configure DNS records with domain registrar:
  - CNAME record for `www` pointing to `your-site.netlify.app`
  - A records for apex domain pointing to Netlify IP addresses

#### Backend Domain (Optional)
- [ ] Add custom domain to Render service
- [ ] Configure DNS CNAME record for subdomain (e.g., `api.yourdomain.com`)

## Post-Deployment Testing

### Website Functionality
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Product pages display properly
- [ ] Shopping cart functions (add/remove items)
- [ ] Contact form submits
- [ ] Chat support widget appears
- [ ] Multi-language toggle works
- [ ] Responsive design on mobile devices

### Admin Panel Functionality
- [ ] Admin login works
- [ ] Dashboard loads with statistics
- [ ] Product management (create/edit/delete)
- [ ] Order management
- [ ] User management
- [ ] Settings configuration
- [ ] Notifications system
- [ ] Messages system

### API Integration
- [ ] Frontend communicates with backend
- [ ] All API endpoints respond correctly
- [ ] Database operations work (CRUD)
- [ ] Authentication functions properly

### Security
- [ ] HTTPS is enabled
- [ ] CORS is properly configured
- [ ] JWT authentication works
- [ ] Passwords are properly hashed

## Optional Features Setup

### Google Maps Integration
- [ ] Google Cloud project created
- [ ] Maps JavaScript API enabled
- [ ] API key generated and restricted
- [ ] `VITE_GOOGLE_MAPS_API_KEY` added to Netlify environment variables
- [ ] Frontend redeployed

### Email Notifications (Future Enhancement)
- [ ] Email service configured (SendGrid, etc.)
- [ ] Backend email functionality implemented
- [ ] Environment variables added

## Monitoring and Maintenance

### Performance
- [ ] Website performance tested (Lighthouse)
- [ ] Images optimized
- [ ] Caching configured
- [ ] CDN enabled if needed

### Analytics (Optional)
- [ ] Google Analytics or similar service configured
- [ ] Tracking code implemented

### Backup
- [ ] MongoDB backup strategy established
- [ ] Code backup (GitHub)
- [ ] Environment variables documented

## Support and Documentation

- [ ] Deployment documentation updated
- [ ] Support contact information visible
- [ ] User guides created (if needed)

## Final Verification

- [ ] All checklist items completed
- [ ] Website fully functional
- [ ] Admin panel fully functional
- [ ] Performance acceptable
- [ ] Security measures in place
- [ ] Documentation complete

Congratulations! Your MANOX e-commerce platform is now ready for production use.