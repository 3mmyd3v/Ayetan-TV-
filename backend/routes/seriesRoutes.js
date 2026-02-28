import express from 'express';
import {
  createSeries,
  getSeries,
  getSeriesById,
  addEpisode,
  updateSeries,
  deleteSeries,
  likeSeries,
} from '../controllers/seriesController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, createSeries);
router.get('/', getSeries);
router.get('/:id', getSeriesById);
router.post('/:id/episode', authMiddleware, addEpisode);
router.put('/:id', authMiddleware, updateSeries);
router.delete('/:id', authMiddleware, deleteSeries);
router.post('/:id/like', authMiddleware, likeSeries);

export default router;
