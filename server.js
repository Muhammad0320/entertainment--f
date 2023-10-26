const dotenv = require("dotenv");

const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const app = require("./app");

process.on("uncaughtException", err => {
  console.log("ERROR 🔥🔥💩, UNCAUGHT EXCEPTION");
  console.log(err.name, err.message);

  process.exit(1);
});

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connection succesful"));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port} `);
});

process.on("unhandledRejection", err => {
  console.log("ERROR 🔥🔥💩", "UNHANDLED REJECTION");

  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
