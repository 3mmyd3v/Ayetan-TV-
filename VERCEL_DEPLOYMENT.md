# Vercel Deployment Guide for Ayetan TV

## Setup Complete ✓

I've configured your project for Vercel deployment. Here's what was set up:

### Files Created/Modified:

1. **vercel.json** - Build configuration and routing rules
2. **api/index.js** - Serverless Express backend handler
3. **package.json** (root) - Monorepo build scripts

## Deployment Steps

### 1. Push to GitHub

```bash
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
npm i -g vercel
vercel
```

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "Add New..." → "Project"
4. Select your "Ayetan-TV" repository
5. Vercel will auto-detect the configuration

### 3. Set Environment Variables in Vercel Dashboard

Add these in **Settings → Environment Variables**:

#### Frontend Variables:

```
VITE_API_BASE_URL=https://your-deployment.vercel.app/api
VITE_TMDB_API_KEY=your_tmdb_api_key
```

#### Backend Variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CORS_ORIGIN=https://your-deployment.vercel.app
NODE_ENV=production
```

**Important:** Replace `your-deployment` with your actual Vercel deployment URL.

### 4. Update Frontend API Calls

Update your [ayetan-tv/src/services/authApi.js](../../ayetan-tv/src/services/authApi.js) and [ayetan-tv/src/services/tmdbApi.js](../../ayetan-tv/src/services/tmdbApi.js):

```javascript
// Use environment variable for API URL
const API_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
```

### 5. Database Connection

Make sure your MongoDB is accessible from Vercel:

- Add Vercel's IP address to your MongoDB Atlas whitelist (allow 0.0.0.0/0 or specific IPs)
- Or use a MongoDB service that allows public access

## Architecture

Your deployment structure:

```
Frontend: React/Vite → Deployed to Vercel
Backend: Express → Serverless Functions (/api routes)
Database: MongoDB Atlas → Remote
```

## API Routes

Your backend routes are available at:

- `/api/auth` - Authentication endpoints
- `/api/movies` - Movie endpoints
- `/api/series` - Series endpoints
- `/api/watchlist` - Watchlist endpoints

## Troubleshooting

### Build Fails

- Check that all dependencies are in [backend/package.json](../../backend/package.json)
- Verify MongoDB connection string is correct

### API Not Responding

- Check Vercel logs: `vercel logs`
- Ensure environment variables are set in Vercel dashboard
- Verify MongoDB whitelist includes Vercel IPs

### CORS Issues

- Make sure `CORS_ORIGIN` matches your deployment URL
- Check browser console for detailed errors

### 404 on Frontend Routes

- The vercel.json rewrites should handle this automatically
- If issues persist, check build output directory is correct

## Next Steps

1. Push this configuration to GitHub
2. Connect your repo to Vercel
3. Set environment variables
4. Deploy!

Your app will be live at: `https://your-project-name.vercel.app`

## Local Development

To test locally before deploying:

1. Create `.env.local` in `ayetan-tv/` folder:

```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_TMDB_API_KEY=your_tmdb_api_key
```

2. Create `.env` in `backend/` folder:

```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

3. Start both servers:

```bash
# Terminal 1: Frontend
cd ayetan-tv
npm install
npm run dev

# Terminal 2: Backend
cd backend
npm install
npm run dev
```
