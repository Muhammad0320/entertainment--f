const express = require("express");

const morgan = require("morgan");

const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/users", userRoutes);

module.exports = app;
