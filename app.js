const express = require("express");

const morgan = require("morgan");

const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const AppError = require("./utils/AppError");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/users", userRoutes);

app.all("*", (req, res, next) => {
  return next(
    new AppError(
      `There is no route with this URL ${req.originalUrl} on this server`,
      404
    )
  );
});

module.exports = app;
