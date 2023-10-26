const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("../model/userModel");

const sendJwt = (res, user, status) => {
  const token = jwt.sign(user._id, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(status).json({
    status: "success",

    token,

    user
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm, role } = req.body;

  const userdata = {
    name,
    email,
    password,
    passwordConfirm,
    role
  };

  const newUser = await User.create(userdata);

  if (!newUser) return next();

  sendJwt(res, newUser, 201);
});

exports.login = catchAsync(async (req, res, next) => {});
