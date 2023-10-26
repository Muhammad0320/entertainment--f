const express = require("express");
const {
  getBookmarks,
  getBookmark
} = require("../controllers/bookmarkController");

const router = express.Router();

router.route("/").get(getBookmarks);

router.route("/:id").get(getBookmark);

module.exports = router;
