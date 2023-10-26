const validator = require("validator");

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: [2, "Name should consist at least 2 characters"],
    maxlength: [40, "Name should at most consist 40 characters"],
    required: [true, "Please tell us yout name"]
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },

  email: {
    type: String,
    unique: true,
    required: [true, "This email already exists, please try another email"],
    validate: [validator.isEmail, "Please provide a valid email"]
  },

  password: {
    type: String,
    minLength: [8, "password should be at least 8 charaters long"],
    required: [true, "Please provide a password"]
  },

  passwordConfirm: {
    type: String,

    required: ["please confirm your password"],

    validate: {
      validator: function(val) {
        return val === this.password;
      },

      message: "Passwords are not the same"
    }
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
