const express = require("express");
const {
  getUsers,
  createUser,
  getUSer,
  updateUser,
  deleteUser
} = require("../controllers/userController");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.route("/signup").post(signup);

router.route("/login").post(login);

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
