const Bookmark = require("../model/bookmarkModel");
const catchAsync = require("../utils/catchAsync");
const {
  createOne,
  getAll,

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

exports.getMyBookmarks = catchAsync(async (req, res, next) => {
  const myBookmarks = await Bookmark.find({ user: req.user._id });

  res.status(200).json({
    status: "success",
    data: {
      bookmarks: myBookmarks
    }
  });
});

exports.createBookmark = createOne(Bookmark);

exports.getBookmarks = getAll(Bookmark);

exports.deleteBookmark = deleteOne(Bookmark);
