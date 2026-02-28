# Ayetan TV - Backend Setup Guide

## Environment Setup Complete ✓

Your frontend is now configured to connect to a backend API. Here's what was set up:

### Files Created/Updated:
1. **`.env`** - Environment variables with API connection
2. **`src/services/authApi.js`** - API service for authentication
3. **`src/context/AuthContext.jsx`** - User auth state management
4. **`src/pages/Signup.jsx`** - Updated to connect to backend
5. **`src/pages/Login.jsx`** - Updated to connect to backend
6. **`src/components/Navbar.jsx`** - Shows user profile image when logged in

## Backend Requirements

You need to create a Node.js backend with these endpoints:

### POST `/api/auth/signup`
**Request Body:**
```json
{
  "fullName": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "user": {
    "id": "string",
    "fullName": "string",
    "email": "string",
    "profileImage": "string (optional)"
  },
  "token": "JWT token string"
}
```

### POST `/api/auth/login`
**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:** Same as signup

### GET `/api/auth/profile`
**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": "string",
    "fullName": "string",
    "email": "string",
    "profileImage": "string (optional)"
  }
}
```

## MongoDB Connection

Your MongoDB credentials are stored in `.env`:
```
mongodb+srv://emmaayetan_db_user:mf9yJpHkIppwd9Wq@ayetan-tv.onkvhl2.mongodb.net/?appName=Ayetan-tv
```

## Quick Backend Example (Node.js + Express)

```bash
npm init -y
npm install express mongoose bcryptjs jsonwebtoken cors dotenv
```

Create `server.js`:
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI);

// Example Auth Routes
app.post('/api/auth/signup', async (req, res) => {
  // Hash password, create user, return token
});

app.post('/api/auth/login', async (req, res) => {
  // Verify credentials, return token
});

app.get('/api/auth/profile', (req, res) => {
  // Verify token, return user
});

app.listen(5000, () => console.log('Server running on port 5000'));
```

## Frontend Configuration

- **API Base URL:** `http://localhost:5000/api`
- Edit `.env` to change `VITE_API_BASE_URL` if needed
- Tokens are stored in `localStorage` and auto-added to requests

## Testing the Flow

1. Start your backend on `localhost:5000`
2. Run `npm run dev` in the frontend
3. Go to `/signup` and create an account
4. User profile image will appear in navbar upon successful signup
5. Logout will clear user data and show SignUp button again

---

**Next Steps:**
- Set up your backend API with the endpoints above
- Use MongoDB connection string provided
- Test signup/login flow
