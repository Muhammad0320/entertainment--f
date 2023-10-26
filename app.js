const express = require("express");

const morgan = require("morgan");

const hpp = require("hpp");

const helmet = require("helmet");

const sanitize = require("express-mongo-sanitize");

const rateLimit = require("express-rate-limit");

const xss = require("xss-clean");

const cors = require("cors");

const cookieParser = require("cookie-parser");

const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const bookmarkRoutes = require("./routes/bookmarkRoutes");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(sanitize());

app.use(xss());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000/");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(
  cors({
    origin: ["http://127.0.0.1:3000/"],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "PATCH", "DELETE"],
    credentials: true
  })
);

app.use(
  "/api",
  rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP"
  })
);

app.use(helmet());

app.use(hpp({ whitelist: ["category", "year", "rating"] }));

app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/bookmarks", bookmarkRoutes);

app.all("*", (req, res, next) => {
  return next(
    new AppError(
      `There is no route with this URL ${req.originalUrl} on this server`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;
