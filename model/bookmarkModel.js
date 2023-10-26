const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },

  movie: {
    type: mongoose.Schema.ObjectId,
    ref: "Movie"
  },

  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

module.exports = Bookmark;
