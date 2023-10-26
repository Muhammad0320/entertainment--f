const express = require("express");
const {
  getMovies,
  createMovie,
  getMovie,
  updateMovie,
  deleteMovie
} = require("../controllers/movieController");
const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router();

router.route("/:id").get(getMovie);

router
  .route("/")
  .post(protect, restrictTo("admin"), createMovie)
  .get(getMovies);

router.use(protect, restrictTo("admin"));

router
  .route("/:id")
  .patch(updateMovie)
  .delete(deleteMovie);

module.exports = router;
