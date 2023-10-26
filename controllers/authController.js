const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("../model/userModel");
const { promisify } = require("util");
const AppError = require("../utils/AppError");

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

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),

    httpOnly: true
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

  sendJwt(res, newUser, 201);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide an email and password"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.checkCorrectPassword(password, user.password)))
    return next(
      new AppError(
        "Invalid login credentials, please check your email or password",
        400
      )
    );

  sendJwt(res, user, 200);
});

exports.protect = catchAsync(async (req, res, next) => {
  // Get token
  const token = getToken(req);

  if (!token)
    return new AppError("You are not logged it! Login in to gain access");

  // Verify token and decode

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  if (!decoded)
    return next(new AppError("Invalid Token, please login again", 403));

  const currentUser = await User.findById(decoded.id);

  if (!currentUser)
    return next(
      new AppError("The user belonging this this token no longer exists", 400)
    );

  req.user = currentUser;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You are not authorized to perform this action", 401)
      );
    }

    next();
  };
};
