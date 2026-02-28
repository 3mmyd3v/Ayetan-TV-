import Series from '../models/Series.js';

export const createSeries = async (req, res, next) => {
  try {
    const { title, description, genre, releaseDate, director, cast, posterImage, bannerImage } = req.body;

    const series = new Series({
      title,
      description,
      genre,
      releaseDate,
      director,
      cast,
      posterImage,
      bannerImage,
      uploadedBy: req.user.id,
      episodes: [],
    });

    await series.save();
    res.status(201).json({ message: 'Series created successfully', series });
  } catch (error) {
    next(error);
  }
};

export const getSeries = async (req, res, next) => {
  try {
    const series = await Series.find().populate('uploadedBy', 'fullName email');
    res.json(series);
  } catch (error) {
    next(error);
  }
};

export const getSeriesById = async (req, res, next) => {
  try {
    const series = await Series.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('uploadedBy', 'fullName email');

    if (!series) {
      return res.status(404).json({ message: 'Series not found' });
    }

    res.json(series);
  } catch (error) {
    next(error);
  }
};

export const addEpisode = async (req, res, next) => {
  try {
    const { episodeNumber, seasonNumber, title, description, videoUrl, duration } = req.body;

    const series = await Series.findById(req.params.id);

    if (!series) {
      return res.status(404).json({ message: 'Series not found' });
    }

    if (series.uploadedBy.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to add episodes' });
    }

    series.episodes.push({
      episodeNumber,
      seasonNumber,
      title,
      description,
      videoUrl,
      duration,
      uploadDate: new Date(),
    });

    await series.save();
    res.status(201).json({ message: 'Episode added successfully', series });
  } catch (error) {
    next(error);
  }
};

export const updateSeries = async (req, res, next) => {
  try {
    const series = await Series.findById(req.params.id);

    if (!series) {
      return res.status(404).json({ message: 'Series not found' });
    }

    if (series.uploadedBy.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update this series' });
    }

    Object.assign(series, req.body);
    await series.save();

    res.json({ message: 'Series updated successfully', series });
  } catch (error) {
    next(error);
  }
};

export const deleteSeries = async (req, res, next) => {
  try {
    const series = await Series.findById(req.params.id);

    if (!series) {
      return res.status(404).json({ message: 'Series not found' });
    }

    if (series.uploadedBy.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this series' });
    }

    await Series.findByIdAndDelete(req.params.id);
    res.json({ message: 'Series deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const likeSeries = async (req, res, next) => {
  try {
    const series = await Series.findById(req.params.id);

    if (!series) {
      return res.status(404).json({ message: 'Series not found' });
    }

    const hasLiked = series.likes.includes(req.user.id);

    if (hasLiked) {
      series.likes = series.likes.filter(id => id.toString() !== req.user.id);
    } else {
      series.likes.push(req.user.id);
    }

    await series.save();
    res.json({ message: hasLiked ? 'Unliked' : 'Liked', series });
  } catch (error) {
    next(error);
  }
};
