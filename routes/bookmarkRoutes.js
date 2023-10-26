const express = require("express");
const {
  getBookmarks,
  getBookmark,
  createBookmark,

  deleteBookmark,
  addUserMovieId
} = require("../controllers/bookmarkController");
const { protect } = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.route("/").get(getBookmarks);

router.route("/:id").get(getBookmark);

router.use(protect);

router.route("/").post(addUserMovieId, createBookmark);

router.route("/:id").delete(deleteBookmark);

module.exports = router;
