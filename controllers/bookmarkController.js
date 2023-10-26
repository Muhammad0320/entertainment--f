const Bookmark = require("../model/bookmarkModel");
const catchAsync = require("../utils/catchAsync");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne
} = require("./handlerFactory");

exports.addUserMovieId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;

  if (!req.body.movie) req.body.movie = req.params.movieId;

  next();
};

exports.createBookmarkOnMovie = catchAsync(async (req, res, next) => {
  const bookmark = await Bookmark.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      bookmark
    }
  });
});

exports.createBookmark = createOne(Bookmark);

exports.getBookmarks = getAll(Bookmark);

exports.getBookmark = getOne(Bookmark);

exports.updateBookmark = updateOne(Bookmark);

exports.deleteBookmark = deleteOne(Bookmark);
