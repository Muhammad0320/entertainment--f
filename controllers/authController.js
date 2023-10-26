const jwt = require("jsonwebtoken");

const sendJwt = (res, user, status) => {
  const token = jwt.sign(user._id, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(status).json({
    status: "success",

    token,

    user
  });
};
