import mongoose from 'mongoose';

const watchlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
      },
    ],
    series: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Series',
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Watchlist', watchlistSchema);
