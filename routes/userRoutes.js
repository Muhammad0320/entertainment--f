const express = require("express");
const {
  getUsers,
  createUser,
  getUSer,
  updateUser,
  deleteUser
} = require("../controllers/userController");
const { signup, login, protect } = require("../controllers/authController");

const router = express.Router();

router.route("/login").post(login);
router.route("/signup").post(signup);

router
  .route("/")
  .get(protect, getUsers)
  .post(createUser);

router
  .route("/:id")
  .get(getUSer)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
