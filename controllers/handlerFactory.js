const catchAsync = require("../utils/catchAsync");

exports.getAll = async (Modal) => {
  catchAsync(async (req, res) => {
    const doc = await Modal.find();

    res.status(200).json({
      status: "success",
      result: doc.length,
      data: {
        document: doc,
      },
    });
  });
};
