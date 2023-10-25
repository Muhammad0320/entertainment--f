const Movie = require("../model/movieModel");

const { createOne, getAll } = require("./handlerFactory");

exports.createMovie = createOne(Movie);

exports.getMovies = getAll(Movie);
