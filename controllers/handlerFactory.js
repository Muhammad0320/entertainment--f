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
    const doc = Model.findById(req.params.id);

    if (!doc) return next();

    res.status(200).json({
      status: "success",
      data: {
        document: doc,
      },
    });
  });
};
