const User = require("../model/userModel");
const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./handlerFactory");

exports.createUser = createOne(User);

exports.getUsers = getAll(User);

exports.getUSer = getOne(User);

exports.updateUser = updateOne(User);

exports.deleteUser = deleteOne(User);
