# Complete Deployment Guide - Ayetan TV

Deploy your full-stack application with:

- **Frontend**: React/Vite on Vercel
- **Backend**: Express on Render
- **Database**: MongoDB Atlas

## Quick Setup

### 1. Backend First (Render)

Follow [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) to deploy backend to Render.

**Copy your Render URL after deployment** (e.g., `https://ayetan-tv-backend.onrender.com`)

### 2. Frontend (Vercel)

1. Create `.env.production` in `ayetan-tv/` folder:

   ```env
   VITE_API_BASE_URL=https://your-backend.onrender.com
   ```

2. In `ayetan-tv/` folder, run:

   ```bash
   npm run build
   ```

3. Deploy to Vercel:

   ```bash
   npm i -g vercel
   vercel --prod
   ```

   Or via Vercel Dashboard:
   - Go to [vercel.com](https://vercel.com)
   - Import the GitHub repo
   - Set Environment Variable: `VITE_API_BASE_URL=https://your-backend.onrender.com`
   - Deploy

### 3. Verify Everything Works

Test the full flow:

1. Visit your Vercel frontend URL
2. Try to log in or browse movies (this calls your Render backend)
3. Check browser console for any errors

## File Structure

```
backend/
├── server.js                 ← Main backend server
├── routes/
│   ├── authRoutes.js
│   ├── contentRoutes.js      ← NEW: TMDB proxy endpoints
│   ├── movieRoutes.js
│   ├── seriesRoutes.js
│   └── watchlistRoutes.js
└── package.json              ← Includes node 18.x engine

ayetan-tv/
├── src/
│   ├── services/
│   │   ├── authApi.js        ← Calls backend /api/auth
│   │   └── tmdbApi.js        ← Now calls backend /api/content
│   └── ...
└── package.json

render.yaml                    ← Render configuration
RENDER_DEPLOYMENT.md          ← Detailed backend setup
```

## Environment Variables Summary

### Backend (Render Dashboard)

```
MONGODB_URI          = your_mongodb_uri
JWT_SECRET           = your_secret
TMDB_API_KEY         = your_tmdb_key (☝️ NO LONGER IN FRONTEND!)
CORS_ORIGIN          = https://your-vercel-url
NODE_ENV             = production
```

### Frontend (Vercel Dashboard)

```
VITE_API_BASE_URL    = https://your-render-backend.onrender.com
```

## Key Changes Made

1. **Backend changes:**
   - Added `contentRoutes.js` - TMDB proxy endpoints
   - Added `TMDB_API_KEY` to backend environment
   - Updated `server.js` to import contentRoutes
   - Added Node 18.x engine requirement

2. **Frontend changes:**
   - Remove `VITE_TMDB_API_KEY` from .env
   - Update API calls to use `/api/content/*` endpoints via backend

3. **Deployment files:**
   - `render.yaml` - Infrastructure as Code for Render
   - `RENDER_DEPLOYMENT.md` - Complete Render setup guide

## Testing Locally First

Before deploying, test locally:

**Backend (.env):**

```env
MONGODB_URI=mongodb://localhost:27017/ayetan-tv
JWT_SECRET=test_secret
TMDB_API_KEY=your_tmdb_key
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

**Frontend (.env.local):**

```env
VITE_API_BASE_URL=http://localhost:5000
```

**Start both:**

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd ayetan-tv && npm run dev
```

## Support

- **Render Issues**: See [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) troubleshooting
- **Frontend Issues**: Check browser console and network tab
- **CORS Issues**: Verify `CORS_ORIGIN` environment variable

## Your Deployed URLs

Once deployed:

- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com`
- API Health: `https://your-backend.onrender.com/health`

Enjoy your deployed Ayetan TV! 🚀
