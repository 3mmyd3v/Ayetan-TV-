import mongoose from 'mongoose';

const seriesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a series title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    genre: [{
      type: String,
      enum: ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Animation'],
    }],
    releaseDate: {
      type: Date,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },
    posterImage: {
      type: String,
      required: true,
    },
    bannerImage: {
      type: String,
    },
    director: {
      type: String,
      required: true,
    },
    cast: [String],
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    episodes: [
      {
        episodeNumber: Number,
        seasonNumber: Number,
        title: String,
        description: String,
        videoUrl: String,
        duration: Number, // in minutes
        uploadDate: Date,
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Series', seriesSchema);
