const validator = require("validator");

const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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

  role: {
    type: String,
    default: "user",
    enum: {
      values: ["user", "admin"],

      message: "role should either be a user or an admin"
    }
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
    required: [true, "Please provide a password"],
    select: false
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

userSchema.set("toJSON", { getters: true, virtuals: true });
userSchema.set("toObject", { getters: true, virtuals: true });

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.checkCorrectPassword = async function(
  password,
  hashedPassword
) {
  return await bcrypt.compare(password, hashedPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
