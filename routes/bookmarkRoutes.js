const express = require("express");
const {
  getBookmarks,
  getBookmark,
  createBookmark,

  deleteBookmark,
  addUserMovieId,
  getMyBookmarks
} = require("../controllers/bookmarkController");
const { protect, verifyToken } = require("../controllers/authController");

const router = express.Router({ mergeParams: true });

router.route("/").get(getBookmarks);

router.route("/:id").get(getBookmark);

router.use(verifyToken, protect);

router.route("/my-bookmarks").get(getMyBookmarks);

router.route("/").post(addUserMovieId, createBookmark);

router.route("/:id").delete(deleteBookmark);

module.exports = router;
