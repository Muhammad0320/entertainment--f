const express = require("express");
const {
  getMovies,
  createMovie,
  getMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");

const router = express.Router();

router.route("/").get(getMovies).post(createMovie);

router.route("/:id").get(getMovie).patch(updateMovie).delete(deleteMovie);

module.exports = router;
