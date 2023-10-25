const fs = require("fs");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Movie = require("../model/movieModel");

// const User = require('../models/userModel');

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connection successful"));

const movies = JSON.parse(fs.readFileSync(`${__dirname}/movies.json`, "utf-8"));
// const users = JSON.parse(fs.readFileSync(`${__dirname}/user.json`, "utf-8"));

const importData = async () => {
  try {
    await Movie.create(movies);
    // await User.create(users, { validateBeforeSave: false });

    console.log("Data successfully loaded");
  } catch (error) {
    console.log(error);
  }

  process.exit();
};

const deleteData = async () => {
  try {
    await Movie.deleteMany();

    // await User.deleteMany();
    console.log("Data successfully deleted");
  } catch (error) {
    console.log(error);
  }

  process.exit();
};

if (process.argv.at(2) === "--import") {
  importData();
} else if (process.argv.at(2) === "--delete") {
  deleteData();
}
