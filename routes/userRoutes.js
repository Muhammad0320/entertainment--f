const express = require("express");
const {
  getUsers,
  createUser,
  getUSer,
  updateUser,
  deleteUser,
  getMe
} = require("../controllers/userController");
const {
  signup,
  login,
  protect,
  restrictTo,
  verifyToken,
  logout
} = require("../controllers/authController");

const router = express.Router();

router.route("/login").post(login);
router.route("/signup").post(signup);

router.use(verifyToken, protect);

router.route("/logout").post(logout);

router.route("/me").get(getMe);

router.use(restrictTo("admin"));

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
