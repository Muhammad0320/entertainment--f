const mongoose = require("mongoose");

const moviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A movie must have a title"]
  },

  year: {
    type: Number,
    max: [2023, "Movie's year should not be over 2023 numbers"],
    required: [true, "A movie must have a year of production"]
  },

  isTrending: {
    type: Boolean,

    default: false
  },

  category: {
    type: String,
    required: [true, "A movie must belong to a category"],
    enum: {
      values: ["Movie", "TV Series"],

      message: "Movie's category should either be a movie or a tv series"
    }
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },

  rating: {
    type: String,
    required: [true, "A movie must have a rating"],

    enum: {
      values: ["PG", "E", "18+"],

      message: "A movie's rating should either be PG, E or 18+ "
    }
  },

  thumbnail: {
    trending: {
      type: String
    },

    regular: {
      type: String,
      required: [true, "A movie must have a regular thumbnail"]
    }
  }
});

const Movie = mongoose.model("Movie", moviewSchema);

module.exports = Movie;
