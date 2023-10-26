const express = require("express");
const {
  getMovies,
  createMovie,
  getMovie,
  updateMovie,
  deleteMovie
} = require("../controllers/movieController");
const {
  protect,
  restrictTo,
  verifyToken
} = require("../controllers/authController");

const bookmarkRoutes = require("../routes/bookmarkRoutes");

const router = express.Router();

router.route("/:id").get(getMovie);

router.route("/id").get(getMovies);

router.use(verifyToken, protect);

router.use("/:movieId/bookmarks", bookmarkRoutes);

router.route("/").post(restrictTo("admin"), createMovie);

router.use(restrictTo("admin"));

router
  .route("/:id")
  .patch(updateMovie)
  .delete(deleteMovie);

module.exports = router;
