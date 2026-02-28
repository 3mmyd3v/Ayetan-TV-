import express from 'express';
import {
  getWatchlist,
  addMovieToWatchlist,
  removeMovieFromWatchlist,
  addSeriesToWatchlist,
  removeSeriesFromWatchlist,
} from '../controllers/watchlistController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, getWatchlist);
router.post('/movie', authMiddleware, addMovieToWatchlist);
router.delete('/movie', authMiddleware, removeMovieFromWatchlist);
router.post('/series', authMiddleware, addSeriesToWatchlist);
router.delete('/series', authMiddleware, removeSeriesFromWatchlist);

export default router;
