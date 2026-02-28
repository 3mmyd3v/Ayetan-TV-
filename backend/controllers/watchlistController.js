import Watchlist from '../models/Watchlist.js';

export const getWatchlist = async (req, res, next) => {
  try {
    let watchlist = await Watchlist.findOne({ user: req.user.id })
      .populate('movies')
      .populate('series');

    if (!watchlist) {
      watchlist = new Watchlist({ user: req.user.id, movies: [], series: [] });
      await watchlist.save();
    }

    res.json(watchlist);
  } catch (error) {
    next(error);
  }
};

export const addMovieToWatchlist = async (req, res, next) => {
  try {
    const { movieId } = req.body;

    let watchlist = await Watchlist.findOne({ user: req.user.id });

    if (!watchlist) {
      watchlist = new Watchlist({ user: req.user.id, movies: [movieId], series: [] });
    } else {
      if (!watchlist.movies.includes(movieId)) {
        watchlist.movies.push(movieId);
      }
    }

    await watchlist.save();
    await watchlist.populate('movies');
    await watchlist.populate('series');

    res.json({ message: 'Movie added to watchlist', watchlist });
  } catch (error) {
    next(error);
  }
};

export const removeMovieFromWatchlist = async (req, res, next) => {
  try {
    const { movieId } = req.body;

    const watchlist = await Watchlist.findOne({ user: req.user.id });

    if (!watchlist) {
      return res.status(404).json({ message: 'Watchlist not found' });
    }

    watchlist.movies = watchlist.movies.filter(id => id.toString() !== movieId);
    await watchlist.save();
    await watchlist.populate('movies');
    await watchlist.populate('series');

    res.json({ message: 'Movie removed from watchlist', watchlist });
  } catch (error) {
    next(error);
  }
};

export const addSeriesToWatchlist = async (req, res, next) => {
  try {
    const { seriesId } = req.body;

    let watchlist = await Watchlist.findOne({ user: req.user.id });

    if (!watchlist) {
      watchlist = new Watchlist({ user: req.user.id, movies: [], series: [seriesId] });
    } else {
      if (!watchlist.series.includes(seriesId)) {
        watchlist.series.push(seriesId);
      }
    }

    await watchlist.save();
    await watchlist.populate('movies');
    await watchlist.populate('series');

    res.json({ message: 'Series added to watchlist', watchlist });
  } catch (error) {
    next(error);
  }
};

export const removeSeriesFromWatchlist = async (req, res, next) => {
  try {
    const { seriesId } = req.body;

    const watchlist = await Watchlist.findOne({ user: req.user.id });

    if (!watchlist) {
      return res.status(404).json({ message: 'Watchlist not found' });
    }

    watchlist.series = watchlist.series.filter(id => id.toString() !== seriesId);
    await watchlist.save();
    await watchlist.populate('movies');
    await watchlist.populate('series');

    res.json({ message: 'Series removed from watchlist', watchlist });
  } catch (error) {
    next(error);
  }
};
