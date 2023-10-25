const User = require("../model/userModel");
const { createOne } = require("./handlerFactory");

exports.createUser = createOne(User);
