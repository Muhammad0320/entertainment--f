const ApiFeatures = require("../utils/ApiFeatues");
const catchAsync = require("../utils/catchAsync");

exports.getAll = (Model) => {
  catchAsync(async (req, res) => {
    const features = new ApiFeatures(req.find(), req.query)
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
};

exports.getOne = (Model) => {
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) return next();

    res.status(200).json({
      status: "success",
      data: {
        document: doc,
      },
    });
  });
};

exports.createOne = (Model) => {
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    if (!newDoc) return next();

    res.status(201).json({
      status: "success",
      data: {
        documement: newDoc,
      },
    });
  });
};

exports.updateOne = (Model) => {
  catchAsync(async (req, res, next) => {
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDoc) return next();

    res.status(200).json({
      status: "success",
      data: {
        updatedDocument: updatedDoc,
      },
    });
  });
};

exports.deleteOne = (Model) => {
  catchAsync(async (req, res, next) => {
    const deletedDoc = await Model.findByIdAndDelete(req.params.id);

    if (!deletedDoc) return next();

    res.status(204).json({
      status: "success",
    });
  });
};
