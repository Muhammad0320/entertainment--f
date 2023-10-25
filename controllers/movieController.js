const Movie = require("../model/movieModel");
const ApiFeatures = require("../utils/ApiFeatues");
const catchAsync = require("../utils/catchAsync");

const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./handlerFactory");

exports.createMovie = createOne(Movie);

exports.getMovies = getAll(Movie);

exports.getMovie = getOne(Movie);

exports.updateMovie = updateOne(Movie);

exports.deleteMovie = deleteOne(Movie);
