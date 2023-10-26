const User = require("../model/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne
} = require("./handlerFactory");

exports.createUser = createOne(User);

exports.getUsers = getAll(User);

exports.getUSer = getOne(User);

exports.updateUser = updateOne(User);

exports.deleteUser = deleteOne(User);

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) return next(new AppError(" There is no user with such id", 404));

  res.status(200).json({
    status: "success",
    user
  });
});
