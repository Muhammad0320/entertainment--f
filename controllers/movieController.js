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

exports.testHandler = catchAsync(async (req, res) => {
  const features = new ApiFeatures(Movie.find(), req.query)
    .filter()
    .sort()
    .limitField()
    .paginate();

  const doc = await features.query;

  res.status(200).json({
    status: "success",
    result: doc.length,
    data: {
      document: doc,
    },
  });
});
