const express = require("express");

const morgan = require("morgan");

const app = express();

if (process.env.NODE_ENV === "development") {
  morgan("dev");
}

app.use(express.json());

module.exports = app;
