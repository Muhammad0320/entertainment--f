const express = require("express");
const {
  getUsers,
  createUser,
  getUSer,
  updateUser,
  deleteUser
} = require("../controllers/userController");

const router = express.Router();

router
  .route("/")
  .get(getUsers)
  .post(createUser);

router
  .route("/:id")
  .get(getUSer)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
