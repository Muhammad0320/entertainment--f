const Movie = require("../model/movieModel");

const { createOne } = require("./handlerFactory");

exports.createMovie = createOne(Movie);
