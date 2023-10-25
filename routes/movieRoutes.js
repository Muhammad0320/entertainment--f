const express = require("express");
const {
  getMovies,
  createMovie,
  getMovie,
  updateMovie,
  deleteMovie,
  testHandler,
} = require("../controllers/movieController");

const router = express.Router();

// router.route("/").post(createMovie).get(getMovies);
router.route("/").get(getMovies);

// router.route("/:id").get(getMovie).patch(updateMovie).delete(deleteMovie);

router.route("/").get(testHandler);

module.exports = router;
