# Ayetan TV - Streaming Platform

A full-stack streaming application built with React, Node.js, Express, and MongoDB.

## Project Structure

```
Ayetan-TV-/
├── frontend/           # React frontend application
│   ├── src/
│   ├── package.json
│   ├── .env
│   └── vite.config.js
├── backend/            # Node.js/Express backend API
│   ├── models/         # MongoDB schemas
│   ├── controllers/    # Business logic
│   ├── routes/         # API endpoints
│   ├── middleware/     # Custom middleware
│   ├── config/         # Configuration files
│   ├── server.js       # Main server file
│   ├── package.json
│   └── .env
└── README.md
```

## Features

- **User Authentication** - Sign up, login, and profile management
- **Movie Management** - Upload, view, like, and manage movies
- **Series Management** - Create series with multiple episodes
- **Watchlist** - Save favorite movies and series
- **Responsive UI** - Works on desktop and mobile devices
- **JWT Authentication** - Secure API endpoints

## Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- MongoDB account (already configured)

## Installation

### 1. Clone the repository
```bash
cd Ayetan-TV-
```

### 2. Setup Backend

```bash
cd backend
npm install
```

The `.env` file is already configured with MongoDB credentials.

### 3. Setup Frontend

```bash
cd frontend
npm install
```

The `.env` file is already configured with the API URL.

## Running the Application

### Terminal 1 - Start Backend
```bash
cd backend
npm start
```
Backend will run on `http://localhost:5000`

### Terminal 2 - Start Frontend
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie details
- `POST /api/movies` - Create movie (requires auth)
- `PUT /api/movies/:id` - Update movie (requires auth)
- `DELETE /api/movies/:id` - Delete movie (requires auth)
- `POST /api/movies/:id/like` - Like/unlike movie (requires auth)

### Series
- `GET /api/series` - Get all series
- `GET /api/series/:id` - Get series details
- `POST /api/series` - Create series (requires auth)
- `POST /api/series/:id/episode` - Add episode (requires auth)
- `PUT /api/series/:id` - Update series (requires auth)
- `DELETE /api/series/:id` - Delete series (requires auth)
- `POST /api/series/:id/like` - Like/unlike series (requires auth)

### Watchlist
- `GET /api/watchlist` - Get user's watchlist (requires auth)
- `POST /api/watchlist/movie` - Add movie to watchlist (requires auth)
- `DELETE /api/watchlist/movie` - Remove movie from watchlist (requires auth)
- `POST /api/watchlist/series` - Add series to watchlist (requires auth)
- `DELETE /api/watchlist/series` - Remove series from watchlist (requires auth)

## Database Models

### User
```javascript
{
  fullName: String,
  email: String (unique),
  password: String (hashed),
  profileImage: String,
  bio: String,
  isAdmin: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Movie
```javascript
{
  title: String,
  description: String,
  genre: [String],
  releaseDate: Date,
  duration: Number (minutes),
  rating: Number,
  posterImage: String,
  bannerImage: String,
  videoUrl: String,
  director: String,
  cast: [String],
  uploadedBy: ObjectId (User),
  views: Number,
  likes: [ObjectId] (Users),
  createdAt: Date,
  updatedAt: Date
}
```

### Series
```javascript
{
  title: String,
  description: String,
  genre: [String],
  releaseDate: Date,
  rating: Number,
  posterImage: String,
  bannerImage: String,
  director: String,
  cast: [String],
  uploadedBy: ObjectId (User),
  episodes: [
    {
      episodeNumber: Number,
      seasonNumber: Number,
      title: String,
      description: String,
      videoUrl: String,
      duration: Number,
      uploadDate: Date
    }
  ],
  views: Number,
  likes: [ObjectId] (Users),
  createdAt: Date,
  updatedAt: Date
}
```

### Watchlist
```javascript
{
  user: ObjectId (User),
  movies: [ObjectId] (Movies),
  series: [ObjectId] (Series),
  createdAt: Date,
  updatedAt: Date
}
```

## Technology Stack

### Frontend
- React 19
- React Router v7
- Axios
- Tailwind CSS
- Vite

### Backend
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- CORS for cross-origin requests

## Development Tips

1. **Frontend Testing**: Use the mock-server for testing without full backend
   ```bash
   cd frontend
   npm run mock-server
   ```

2. **API Testing**: Use Postman or ThunderClient to test endpoints

3. **Debugging**: Open DevTools (F12) and check Console tab for errors

## License

MIT
