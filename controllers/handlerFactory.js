const catchAsync = require("../utils/catchAsync");

exports.getAll = (Model) => {
  catchAsync(async (req, res) => {
    const doc = await Model.find();

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

    res.status(200).json({
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
