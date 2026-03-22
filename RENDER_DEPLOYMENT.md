# Render Deployment Guide for Ayetan TV Backend

## Architecture

```
Frontend (React/Vite) → Deployed to Vercel
  ↓
Backend (Express) → Deployed to Render
  ↓
Database (MongoDB Atlas)
```

## Prerequisites

1. A Render account ([render.com](https://render.com))
2. MongoDB Atlas account with connection string
3. TMDB API key (moved to backend)
4. JWT secret key
5. GitHub repository with your code

## Step-by-Step Deployment

### 1. Prepare Your Backend Environment Variables

Create a `.env` file in the `backend/` folder with these values:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key_here
TMDB_API_KEY=your_tmdb_api_key_here
CORS_ORIGIN=https://your-frontend-url.vercel.app
NODE_ENV=production
PORT=5000
```

### 2. Push to GitHub

```bash
git add .
git commit -m "Add Render backend deployment and TMDB proxy endpoints"
git push origin main
```

### 3. Deploy Backend to Render

#### Option A: Using Render Dashboard (Easiest)

1. Go to [render.com](https://render.com) and sign in
2. Click **New** → **Web Service**
3. Connect your GitHub repository
4. Fill in the details:
   - **Name**: `ayetan-tv-backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Root Directory**: `backend` ⚠️ **Important!**

5. Click **Create Web Service**
6. Go to **Environment** tab and add these variables:
   ```
   MONGODB_URI = your_connection_string
   JWT_SECRET = your_secret
   TMDB_API_KEY = your_tmdb_key
   CORS_ORIGIN = https://your-vercel-url.vercel.app
   NODE_ENV = production
   ```

7. Deploy will start automatically. Copy your Render URL (e.g., `https://ayetan-tv-backend.onrender.com`)

#### Option B: Using render.yaml

If you prefer IaC (Infrastructure as Code):

1. Edit `render.yaml` with your settings
2. Push to GitHub
3. Render will auto-detect the configuration file

### 4. Configure Frontend for Render Backend

Update your frontend `.env.local` in `ayetan-tv/`:

```env
VITE_API_BASE_URL=https://your-backend.onrender.com
```

The frontend will now call:
- `https://your-backend.onrender.com/api/auth` → For authentication
- `https://your-backend.onrender.com/api/content/trending/movies` → For trending movies
- `https://your-backend.onrender.com/api/content/search/movies` → For movie search
- etc.

### 5. Update Backend `.env` 

The backend `.env` should have:

```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
CORS_ORIGIN=https://your-frontend-url.vercel.app
NODE_ENV=production
```

## New API Endpoints (TMDB Proxy)

Your backend now exposes these new endpoints (TMDB API key is handled server-side):

```
GET  /api/content/trending/movies        → Trending movies
GET  /api/content/trending/series        → Trending series
GET  /api/content/search/movies?query=   → Search movies
GET  /api/content/search/series?query=   → Search series
GET  /api/content/movies/:id             → Movie details
GET  /api/content/series/:id             → Series details
```

### Example Frontend Usage

**Before (TMDB key exposed in frontend):**
```javascript
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
```

**After (Secure backend proxy):**
```javascript
const API_URL = import.meta.env.VITE_API_BASE_URL;
const response = await fetch(`${API_URL}/content/trending/movies`);
```

## Monitoring & Troubleshooting

### Check Render Logs
1. Go to your Render service
2. Click **Logs** tab
3. Check for any errors

### Common Issues

#### "Cannot GET /api"
- Ensure Root Directory is set to `backend` in Render settings
- Check that all routes are properly mounted in `server.js`

#### CORS Errors
- Verify `CORS_ORIGIN` environment variable matches your frontend URL exactly
- Check that CORS middleware is configured correctly

#### MongoDB Connection Failed
- Test connection string locally first
- Add Render's IP to MongoDB Atlas whitelist (0.0.0.0/0 or specific IPs)
- Verify credentials in connection string

#### TMDB API Errors
- Verify `TMDB_API_KEY` is correct
- Check TMDB API status
- Ensure API key has required permissions

### Health Check

Test your backend:
```bash
curl https://your-backend.onrender.com/health
# Should return: {"message":"Server is running"}
```

Test TMDB proxy:
```bash
curl https://your-backend.onrender.com/api/content/trending/movies
```

## Local Development

### Setup Local Environment

1. Backend `.env` (backend/.env):
```env
MONGODB_URI=mongodb://localhost:27017/ayetan-tv
JWT_SECRET=your_local_secret
TMDB_API_KEY=your_tmdb_api_key
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

2. Frontend `.env.local` (ayetan-tv/.env.local):
```env
VITE_API_BASE_URL=http://localhost:5000
```

3. Start both services:
```bash
# Terminal 1: Backend
cd backend
npm install
npm run dev

# Terminal 2: Frontend
cd ayetan-tv
npm install
npm run dev
```

## Security Notes

✅ **Advantages of backend proxy:**
- TMDB API key never exposed to frontend
- Requests are rate-limited at backend level
- Better control over data transformation
- Centralized API management

## Summary

| Component | Service | URL |
|-----------|---------|-----|
| Frontend | Vercel | https://your-app.vercel.app |
| Backend | Render | https://your-backend.onrender.com |
| Database | MongoDB Atlas | mongodb+srv://... |
| TMDB API | Proxied through backend | /api/content/* |

Your API keys and sensitive data are now securely stored on your backend servers!
