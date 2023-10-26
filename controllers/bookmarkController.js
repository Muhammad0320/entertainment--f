exports.addUserMovieId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;

  if (!req.body.movie) req.body.movie = req.params.movieId;

  next();
};
