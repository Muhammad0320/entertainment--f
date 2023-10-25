const User = require("../model/userModel");
const { createOne, getAll, getOne } = require("./handlerFactory");

exports.createUser = createOne(User);

exports.getUsers = getAll(User);

exports.getUSer = getOne(User);
