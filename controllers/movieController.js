const Movie = require("../model/movieModel");
const catchAsync = require("../utils/catchAsync");

const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./handlerFactory");

exports.textRoute = catchAsync(async (req, res, next) => {
  const allMovies = await Movie.find();

  console.log(allMovies);
});

exports.createMovie = createOne(Movie);

exports.getMovies = getAll(Movie);

exports.getMovie = getOne(Movie);

exports.updateMovie = updateOne(Movie);

exports.deleteMovie = deleteOne(Movie);
