class AppError {
  constructor(message, statusCode) {
    this.message = message;

    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    this.isOperational = true;

    this.statusCode = statusCode;
  }
}

module.exports = AppError;
