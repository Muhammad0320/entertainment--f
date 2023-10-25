const express = require("express");
const { getMovies, createMovie } = require("../controllers/movieController");

const router = express.Router();

router.route("/").get(getMovies).post(createMovie);

module.exports = router;
