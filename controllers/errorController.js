const AppError = require("../utils/AppError");

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      stats: err.status,
      message: err.message
    });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: "Something went very wrong"
    });
    console.log("Error 🔥", err);
  }
};

const handleCastError = err => {
  const message = `Invalid  id: ${err.value}`;

  return new AppError(message, 404);
};

const handleValidationError = err => {
  const values = Object.values(err.errors).map(el => el.message);

  const message = values.join(". ");

  return new AppError(message, 400);
};

const handleDuplicateError = err => {
  const message = `Duplicate value: ${err.keyValue.email}, Please try another value`;

  return new AppError(message, 403);
};

const handleJsonWebTokenError = () =>
  new AppError("Invalid token, Please login again", 403);

const handleJsonWebTokenExpires = () =>
  new AppError("Expired token, please login again, 403");

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = JSON.parse(JSON.stringify(err));

    error.message = err.message;

    if (error.name === "CastError") error = handleCastError(error);
    if (error.name === "ValidationError") error = handleValidationError(error);

    if (error.code === 11000) error = handleDuplicateError(error);

    if (error.message === "JsonWebTokenError")
      error = handleJsonWebTokenError(error);

    if (error.message === "TokenExpiredError")
      error = handleJsonWebTokenExpires();

    sendErrorProd(error, res);
  }
};

module.exports = globalErrorHandler;
