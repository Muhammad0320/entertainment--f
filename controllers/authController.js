const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("../model/userModel");
const { promisify } = require("util");

const getToken = req => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies) {
    token = req.cookies.jwt;
  }

  return token;
};

const sendJwt = (res, user, status) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
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

exports.login = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (
    !user ||
    !(await user.checkCorrectPassword(req.body.password, user.password))
  )
    return next();

  sendJwt(res, user, 200);
});

exports.protect = catchAsync(async (req, res, next) => {
  // Get token
  const token = getToken(req);

  // Verify token and decode

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  if (!decoded) return next();

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) return next();

  req.user = currentUser;

  next();
});
