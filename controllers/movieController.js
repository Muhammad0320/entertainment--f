const Movie = require("../model/movieModel");

const { createOne, getAll, getOne } = require("./handlerFactory");

exports.createMovie = createOne(Movie);

exports.getMovies = getAll(Movie);

exports.getOne = getOne(Movie);
