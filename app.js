const express = require("express");

const movieRoutes = require("./routes/movieRoutes");

const morgan = require("morgan");

const app = express();

if (process.env.NODE_ENV === "development") {
  morgan("dev");
}

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/movies", movieRoutes);

module.exports = app;
