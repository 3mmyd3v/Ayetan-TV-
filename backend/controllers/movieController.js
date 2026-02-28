import Movie from '../models/Movie.js';

export const createMovie = async (req, res, next) => {
  try {
    const { title, description, genre, releaseDate, duration, director, cast, posterImage, bannerImage, videoUrl } = req.body;

    const movie = new Movie({
      title,
      description,
      genre,
      releaseDate,
      duration,
      director,
      cast,
      posterImage,
      bannerImage,
      videoUrl,
      uploadedBy: req.user.id,
    });

    await movie.save();
    res.status(201).json({ message: 'Movie created successfully', movie });
  } catch (error) {
    next(error);
  }
};

export const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find().populate('uploadedBy', 'fullName email');
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

export const getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('uploadedBy', 'fullName email');

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json(movie);
  } catch (error) {
    next(error);
  }
};

export const updateMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    if (movie.uploadedBy.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update this movie' });
    }

    Object.assign(movie, req.body);
    await movie.save();

    res.json({ message: 'Movie updated successfully', movie });
  } catch (error) {
    next(error);
  }
};

export const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    if (movie.uploadedBy.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this movie' });
    }

    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const likeMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const hasLiked = movie.likes.includes(req.user.id);

    if (hasLiked) {
      movie.likes = movie.likes.filter(id => id.toString() !== req.user.id);
    } else {
      movie.likes.push(req.user.id);
    }

    await movie.save();
    res.json({ message: hasLiked ? 'Unliked' : 'Liked', movie });
  } catch (error) {
    next(error);
  }
};
