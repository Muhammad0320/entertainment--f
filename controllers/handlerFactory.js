const ApiFeatures = require("../utils/ApiFeatues");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getAll = Model =>
  catchAsync(async (req, res) => {
    const features = new ApiFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitField()
      .paginate();

    const doc = await features.query;

    res.status(200).json({
      status: "success",
      result: doc.length,
      data: {
        document: doc
      }
    });
  });

exports.getOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) return next(new AppError("There is document with such id", 404));

    res.status(200).json({
      status: "success",
      data: {
        document: doc
      }
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        documement: newDoc
      }
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedDoc)
      return next(new AppError("There is document with such id", 404));

    res.status(200).json({
      status: "success",
      data: {
        updatedDocument: updatedDoc
      }
    });
  });

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const deletedDoc = await Model.findByIdAndDelete(req.params.id);

    if (!deletedDoc)
      return next(new AppError("There is document with such id", 404));

    res.status(204).json({
      status: "success"
    });
  });
