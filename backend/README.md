# Ayetan TV Backend

Express.js REST API backend for the Ayetan TV streaming platform.

## Quick Start

### Installation
```bash
npm install
```

### Environment Setup
Create `.env` file with:
```env
MONGODB_URI=mongodb+srv://emmaayetan_db_user:mf9yJpHkIppwd9Wq@ayetan-tv.onkvhl2.mongodb.net/?appName=Ayetan-tv
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
TMDB_API_KEY=your_tmdb_api_key_here
```

### Start Server
```bash
npm start          # Production
npm run dev        # Development (with nodemon)
```

Server runs on `http://localhost:5000`

## Project Structure

```
backend/
├── models/              # MongoDB schemas
│   ├── User.js         # User model with auth
│   ├── Movie.js        # Movie model
│   ├── Series.js       # Series model
│   └── Watchlist.js    # Watchlist model
├── controllers/        # Business logic
│   ├── authController.js
│   ├── movieController.js
│   ├── seriesController.js
│   └── watchlistController.js
├── routes/            # API route files
│   ├── authRoutes.js
│   ├── movieRoutes.js
│   ├── seriesRoutes.js
│   └── watchlistRoutes.js
├── middleware/        # Custom middleware
│   ├── auth.js       # JWT verification
│   └── errorHandler.js
├── config/           # Configuration
│   └── db.js         # MongoDB connection
├── server.js         # Main server file
├── package.json
├── .env             # Environment variables
└── .gitignore
```

## API Endpoints

### Authentication (`/api/auth`)

**POST /signup**
- Create new user account
- Body: `{ fullName, email, password }`
- Returns: User object + JWT token

**POST /login**
- Login existing user
- Body: `{ email, password }`
- Returns: User object + JWT token

**GET /profile** (Auth required)
- Get current user profile
- Headers: `Authorization: Bearer <token>`
- Returns: User object

**PUT /profile** (Auth required)
- Update user profile
- Body: `{ fullName, bio, profileImage }`
- Returns: Updated user object

### Movies (`/api/movies`)

**GET /**
- Get all movies
- Returns: Array of movie objects

**GET /:id**
- Get movie details + increment views
- Returns: Movie object

**POST /** (Auth required)
- Create new movie
- Body: Movie data (title, description, genre, etc.)
- Returns: Created movie object

**PUT /:id** (Auth required)
- Update movie (only by uploader or admin)
- Body: Fields to update
- Returns: Updated movie object

**DELETE /:id** (Auth required)
- Delete movie (only by uploader or admin)
- Returns: Success message

**POST /:id/like** (Auth required)
- Like/unlike movie
- Returns: Updated movie with like status

### Series (`/api/series`)

**GET /**
- Get all series
- Returns: Array of series objects

**GET /:id**
- Get series details + increment views
- Returns: Series object

**POST /** (Auth required)
- Create new series
- Body: Series data (title, description, genre, etc.)
- Returns: Created series object

**POST /:id/episode** (Auth required)
- Add episode to series
- Body: Episode data (seasonNumber, episodeNumber, title, videoUrl, etc.)
- Returns: Updated series with new episode

**PUT /:id** (Auth required)
- Update series (only by uploader or admin)
- Body: Fields to update
- Returns: Updated series object

**DELETE /:id** (Auth required)
- Delete series (only by uploader or admin)
- Returns: Success message

**POST /:id/like** (Auth required)
- Like/unlike series
- Returns: Updated series with like status

### Watchlist (`/api/watchlist`)

**GET /** (Auth required)
- Get user's watchlist
- Returns: Watchlist object with movies and series

**POST /movie** (Auth required)
- Add movie to watchlist
- Body: `{ movieId }`
- Returns: Updated watchlist

**DELETE /movie** (Auth required)
- Remove movie from watchlist
- Body: `{ movieId }`
- Returns: Updated watchlist

**POST /series** (Auth required)
- Add series to watchlist
- Body: `{ seriesId }`
- Returns: Updated watchlist

**DELETE /series** (Auth required)
- Remove series from watchlist
- Body: `{ seriesId }`
- Returns: Updated watchlist

## Models

### User
- `fullName` (String, required)
- `email` (String, unique, required)
- `password` (String, hashed, required)
- `profileImage` (String, optional)
- `bio` (String, optional)
- `isAdmin` (Boolean, default: false)
- `timestamps` (createdAt, updatedAt)

### Movie
- `title`, `description`, `genre` (Array), `releaseDate`
- `duration` (minutes), `rating` (0-10)
- `posterImage`, `bannerImage`, `videoUrl` (required)
- `director`, `cast` (Array)
- `uploadedBy` (User reference)
- `views`, `likes` (Array of User IDs)
- `timestamps`

### Series
- `title`, `description`, `genre` (Array), `releaseDate`
- `rating` (0-10)
- `posterImage`, `bannerImage`
- `director`, `cast` (Array)
- `episodes` (Array with episodeNumber, seasonNumber, title, description, videoUrl, duration)
- `uploadedBy` (User reference)
- `views`, `likes` (Array of User IDs)
- `timestamps`

### Watchlist
- `user` (User reference)
- `movies` (Array of Movie IDs)
- `series` (Array of Series IDs)
- `timestamps`

## Authentication

Uses JWT (JSON Web Tokens) for authentication.

**How it works:**
1. User signs up/logs in
2. Server returns JWT token
3. Client stores token in localStorage
4. Client includes token in Authorization header: `Bearer <token>`
5. Server validates token on protected routes

**Token expires in 7 days**

## Error Handling

All errors return JSON with:
```json
{
  "message": "Error description"
}
```

Common error codes:
- `400` - Bad request (missing fields, validation errors)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not found
- `500` - Server error

## Database

**MongoDB Atlas**
- Connection: Provided in .env
- Collections: users, movies, series, watchlists

## Testing

Use Postman or ThunderClient:
1. POST to `/api/auth/signup` to create account
2. Receive token in response
3. Copy token to `Authorization: Bearer <token>` header
4. Test other endpoints

## Dependencies

- `express` - Web framework
- `mongoose` - MongoDB ORM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation
- `cors` - Cross-origin support
- `dotenv` - Environment variables
- `axios` - HTTP client (for external APIs)
- `nodemon` (dev) - Auto-restart server

## Performance Tips

1. Add pagination to list endpoints
2. Use indexes on frequently queried fields
3. Implement caching for popular movies/series
4. Optimize video delivery with CDN

## Future Enhancements

- [ ] Rate limiting
- [ ] Advanced search and filtering
- [ ] User ratings and reviews
- [ ] Social features (follow users, comments)
- [ ] Admin dashboard
- [ ] Email verification
- [ ] Two-factor authentication
