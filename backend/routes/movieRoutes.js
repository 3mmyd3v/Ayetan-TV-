import express from 'express';
import {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  likeMovie,
} from '../controllers/movieController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, createMovie);
router.get('/', getMovies);
router.get('/:id', getMovieById);
router.put('/:id', authMiddleware, updateMovie);
router.delete('/:id', authMiddleware, deleteMovie);
router.post('/:id/like', authMiddleware, likeMovie);

export default router;
