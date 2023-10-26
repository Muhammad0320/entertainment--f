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
      status: err.status,
      message: err.message
    });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: "Something went very wrong, Please try again"
    });

    console.log(`Error 🔥💩`, err);
  }
};

const handleCastError = err => {
  const message = `Invalid Id: ${err.value}`;

  return new AppError(message, 404);
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = JSON.parse(JSON.stringify(err));

    error.message = err.message;

    if (error.name === "CastError") error = handleCastError(error);

    sendErrorProd(error, res);
  }
};

module.exports = globalErrorHandler;
